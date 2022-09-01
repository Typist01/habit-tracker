package com.sparta.habittracker.controllers;

import com.sparta.habittracker.Authentication;
import com.sparta.habittracker.entities.*;
import com.sparta.habittracker.repositories.ActivityRepository;
import com.sparta.habittracker.repositories.ActivityUnitRepository;
import com.sparta.habittracker.repositories.UserHabitRepository;
import com.sparta.habittracker.repositories.UserRepository;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;

import javax.swing.text.html.Option;
import java.math.BigInteger;
import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@CrossOrigin
@RestController
public class UserHabitController {

    @Autowired
    UserHabitRepository repo;
    @Autowired
    ActivityRepository activityRepo;
    @Autowired
    ActivityUnitRepository unitRepo;
    @Autowired
    UserRepository userRepo;

    @GetMapping("/habits/{id}")
    public ResponseEntity getHabitById(@RequestParam("key") Optional<String> apiKey, @PathVariable Integer id){
        if (apiKey.isPresent() && Authentication.successful(apiKey.get())){
            return ResponseEntity.ok(repo.findById(id)
                    .orElseThrow(()-> new HttpClientErrorException(HttpStatus.BAD_REQUEST)));
        } else{
            return ResponseEntity.badRequest().body("api key invalid or not found");

        }
    }
    @GetMapping("/habits/user")
    public ResponseEntity getHabitsByUser(@RequestParam("key") Optional<String> apiKey, @RequestParam("username") String username){
        if (apiKey.isPresent() && Authentication.successful(apiKey.get())){
            if (!userRepo.existsByUsername(username)){
                return ResponseEntity.badRequest().body("could not find user");
            }
            User user = userRepo.findUserByUsername(username);
            return ResponseEntity.ok(repo.findByUser(user));
        } else{
            return ResponseEntity.badRequest().body("api key invalid or not found");

        }

    }

    @GetMapping("/habits")
    public ResponseEntity getAllHabits(
            @RequestParam("key") Optional<String> apiKey){
        if (apiKey.isPresent() && Authentication.successful(apiKey.get())){
            return ResponseEntity.ok().body(repo.findAll());
        } else{
            return ResponseEntity.badRequest().body("Invalid key or not found");
        }
    }

    public Integer randomIdMaker(){
        Random random = new Random();
        Integer tempID = random.nextInt();
        if (repo.findById(tempID).isPresent()){
            tempID=randomIdMaker();
        }
        return tempID;
    }

    @PostMapping("/habits/new")
    public ResponseEntity<String> makeNewActivity(
            @RequestParam("key") Optional<String> apiKey, @RequestParam(name="username", required=false) String username, @RequestBody String request) {
        JSONParser parser = new JSONParser();
        System.out.println( "post request from user: " + username);
//        System.out.println("api key: " + apiKey.get());
//        System.out.println(apiKey.isPresent() && Authentication.successful(apiKey.get()));
        if (apiKey.isPresent() && Authentication.successful(apiKey.get())) {
            try {

                JSONObject json = (JSONObject) parser.parse(request);
                if (json.get("id") == null){
                    json.put("id",(System.nanoTime() + String.valueOf(Math.abs((Integer.parseInt((String.valueOf(json.get("user")))))))).hashCode());
                }
                System.out.println("started assigning json data to variables");
                Integer userId;
                if (username != null){
                    userId = userRepo.findUserByUsername(username).getId();
                } else{
                    userId = Integer.parseInt(String.valueOf(json.get("user")));
                }
                String activityName = String.valueOf(json.get("activityName"));
                String unitType = String.valueOf(json.get("unitType"));
                Integer habitId = Integer.parseInt(String.valueOf(json.get("id"))) ;
                String name;
                if(json.get("name") != null){
                     name = String.valueOf(json.get("name"));
                } else {  name = activityName;};
                Integer defaultIncrement;
                if(json.get("defaultIncrement") != null){
                    defaultIncrement = Integer.parseInt(String.valueOf(json.get("defaultIncrement")));
                } else{
                    defaultIncrement = null;
                }

                System.out.println("default increment: " + defaultIncrement);

                if (repo.findById(habitId).isPresent()) {
                    return ResponseEntity.status(409)
                            .header("message", "The id already exists")
                            .body("fail");
                }
                System.out.println(validHabit(userId, activityName, unitType));
                if (validHabit(userId, activityName, unitType)) {
                    UserHabit habit = new UserHabit(habitId, name,
                            userRepo.findById(userId).get(),
                            activityRepo.findById(activityName).get(),
                            unitRepo.findById(unitType).get(), defaultIncrement
                    );
                    repo.save(habit);
                    return ResponseEntity.ok().body("habit saved successfully");
                } else{
                    return ResponseEntity.badRequest().body("user does not exist");
                }
            } catch(ParseException e){
                e.printStackTrace();
//                throw new RuntimeException(e);
                return ResponseEntity.badRequest().body("could not create habit");
            } catch(NumberFormatException e){
                return ResponseEntity.badRequest().body("User id could not be processed because it is not an integer (java)");
            } catch (Exception e){
                e.printStackTrace();
                return ResponseEntity.badRequest().body("error");

            }
        } else{
            return ResponseEntity.badRequest().body("Invalid key or not found");
        }

    }

    private boolean validHabit(Integer userId, String activityName, String unitType) {
        if (!activityRepo.existsById(activityName)) {
            // check if activity exists, if not create it
            activityRepo.save(new Activity(activityName));
        }
        if(!unitRepo.existsById(unitType)) {
            // check if units exist, if not create it
            unitRepo.save(new ActivityUnit(unitType));
        }
        // check if user_ID exists, else fail
        return userRepo.existsById(userId);
    }



    //@DeleteMapping("/users/{userid}/habits/delete/{id}")
    @DeleteMapping("habits/delete/{id}")
    public ResponseEntity<String> deleteUserHabitById(
            @RequestParam("key") Optional<String> apiKey,
            @PathVariable Integer id) {
        if (apiKey.isPresent() && Authentication.successful(apiKey.get())) {
            UserHabit habit = repo.findById(id)
                    .orElseThrow(()-> new HttpClientErrorException(HttpStatus.BAD_REQUEST));
            repo.delete(habit);
            return ResponseEntity.ok().body("Deleted habit successfully");
        }
        else {
            return ResponseEntity.badRequest().body("Invalid key or not found");
        }
    }

    @PutMapping("habits/update")
    public ResponseEntity<String> updateUserHabitById(
            @RequestParam("key") Optional<String> apiKey,
            @RequestBody UserHabit habit) {
        if (apiKey.isPresent() && Authentication.successful(apiKey.get())) {
            if (validHabit(habit.getUser().getId(), habit.getActivityName().getId(), habit.getUnitType().getId())) repo.save(habit);
            return ResponseEntity.ok().body("Successfully updated habit");
        } else {
            return ResponseEntity.badRequest().body("Invalid key or not found");
        }
    }
//    @PatchMapping("habits/update")
//    @ResponseStatus(HttpStatus.NO_CONTENT)
//    public ResponseEntity updateActivityData(@RequestParam("key") Optional<String> apiKey, @RequestBody String data) {
//        if(apiKey.isPresent() && Authentication.successful(apiKey.get())){
//            if (data == null) {
//                return ResponseEntity.badRequest()
//                        .header("message", "")
//                        .body("Empty String received");
//            }
//            try{
//                UserHabit updatedRecord = patchData(data);
//                repo.save(updatedRecord);
//                return ResponseEntity.ok().body("successfully updated");
//            } catch(Exception e){
//                e.printStackTrace();
//                return ResponseEntity.unprocessableEntity().body("Exception thrown when parsing data");
//            }
//        } else{
//            return ResponseEntity.status(403).body("api key invalid or not found");
//        }
//    }
//
//    private UserHabit patchData(String req) throws Exception{
//        JSONParser parser = new JSONParser();
//        try{
//            JSONObject json = (JSONObject) parser.parse(req);
//            int id = (Integer.parseInt(String.valueOf(json.get("id"))));
//            if (repo.existsById(id)){
//                UserHabit oldData = repo.findById(id)
//                        .orElseThrow( ()-> new HttpClientErrorException(HttpStatus.NOT_FOUND));
//                if(json.get("target_name") != null){
//                    oldData.setTargetName(String.valueOf(json.get("target_name")));
//                }
//                if(json.get("target_goal") != null){
//                    oldData.setTargetGoal(Integer.parseInt(String.valueOf(json.get("target_goal"))));
//                }
//                if(json.get("target_deadline") != null){
//                    oldData.setTargetDeadline(Instant.parse(String.valueOf(json.get("target_deadline"))));
//                }
//                if(json.get("target_repeats") != null){
//                    oldData.setTargetRepeats(Boolean.valueOf(String.valueOf(json.get("target_repeats"))));
//                }
//                if(json.get("repeat_interval_in_days") != null){
//                    oldData.setRepeatIntervalInDays(Integer.valueOf(String.valueOf(json.get("repeat_interval_in_days"))));
//                }
//                return oldData;
//            }
//
//        } catch (ParseException e) {
//            throw new Exception("Exception thrown when parsing");
//        } catch (Exception e){
//            throw new Exception("issue with patching data");
//        }
//        throw new Exception("Exception thrown when parsing");
//    }
}
