package com.sparta.habittracker.controllers;

import com.sparta.habittracker.Authentication;
import com.sparta.habittracker.entities.Activity;
import com.sparta.habittracker.entities.ActivityDatum;
import com.sparta.habittracker.entities.UserHabit;
import com.sparta.habittracker.repositories.ActivityDatumRepository;
import com.sparta.habittracker.repositories.UserHabitRepository;
import org.apache.coyote.Response;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@CrossOrigin
@RestController
public class ActivityDatumController {
    @Autowired
    ActivityDatumRepository dataRepo;

    @Autowired
    UserHabitRepository habitRepo;

    public Integer randomIdMaker(){
        Random random = new Random();
        Integer tempID = random.nextInt();
        if (dataRepo.findById(tempID).isPresent()){
            tempID=randomIdMaker();
        }
        return tempID;
    }

    @GetMapping ("activityData")
    public ResponseEntity findAllActivityData(@RequestParam("key") Optional<String> apiKey){
        if(apiKey.isPresent() && Authentication.successful(apiKey.get())){
            return ResponseEntity.ok().body(dataRepo.findAll());
        } else{
            return ResponseEntity.status(403).body("api key invalid or not found");
        }
    }

    @GetMapping ("activityDataByHabit")
    public ResponseEntity findAllActivityDataByHabit(@RequestParam("key") Optional<String> apiKey, @RequestParam("habitID") Optional<String> userHabitId){
        if(apiKey.isPresent() && Authentication.successful(apiKey.get())){
            if(userHabitId != null){
                UserHabit userHabit = habitRepo.findById(Integer.parseInt(userHabitId.get())).get();
                if (userHabit != null){
                    return ResponseEntity.ok().body(dataRepo.findAllByHabit(userHabit));
                }
                else return ResponseEntity.badRequest().body("habit contained an invalid or empty ID");
            }
            else return ResponseEntity.badRequest().body("no habit was received");
        }
        else{
            return ResponseEntity.status(403).body("api key invalid or not found");
        }
    }

    @GetMapping ("activityData/{id}")
    public ResponseEntity findActivityDataById(
            @RequestParam("key") Optional<String> apiKey,
            @PathVariable Integer id){
        if(apiKey.isPresent() && Authentication.successful(apiKey.get())){
            if (dataRepo.findById(id)== null){
                return ResponseEntity.status(404)
                        .header("message", "This data does not exist")
                        .body("fail");
            }
            else
            return ResponseEntity.ok().body(dataRepo.findById(id).get());
        } else{
            return ResponseEntity.status(403).body("api key invalid or not found");
        }
    }

    @DeleteMapping ("activityData/delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity deleteActivityDataById(
            @RequestParam("key") Optional<String> apiKey,
            @PathVariable Integer id){
        if(apiKey.isPresent() && Authentication.successful(apiKey.get())){
            ActivityDatum data = dataRepo.findById(id).get();
            if (data == null){
                return ResponseEntity.badRequest()
                        .header("message", "")
                        .body("That entry does not exist");
            }
            dataRepo.delete(data);
            return ResponseEntity.status(200)
                    .header("message", "successfully deleted activity data")
                    .body("success");
        } else{
            return ResponseEntity.status(403).body("api key invalid or not found");
        }
    }
    @PatchMapping("activityData/update")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity updateActivityData(@RequestParam("key") Optional<String> apiKey, @RequestBody String data) {
        if(apiKey.isPresent() && Authentication.successful(apiKey.get())){
        if (data == null) {
            return ResponseEntity.badRequest()
                    .header("message", "")
                    .body("Empty String received");
        }
        try{
            ActivityDatum updatedRecord = patchData(data);
            dataRepo.save(updatedRecord);
            return ResponseEntity.ok().body("successfully updated");
        } catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.unprocessableEntity().body("Exception thrown when parsing data");
        }
    } else{
            return ResponseEntity.status(403).body("api key invalid or not found");
        }
    }
    @PostMapping ("activityData/new")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity newActivityData(
            @RequestParam("key") Optional<String> apiKey,
            @RequestBody String data){
        if(apiKey.isPresent() && Authentication.successful(apiKey.get())){
            try{
                return saveNewActivityFromJsonString(data);
            } catch(Exception e){
                System.out.println(e);
                return ResponseEntity.internalServerError().body("error, you can try again later");
            }
        } else{
            return ResponseEntity.status(403).body("api key invalid or not found");
        }
    }

    private ResponseEntity saveNewActivityFromJsonString(String req) throws Exception{
        JSONParser parser = new JSONParser();
//        System.out.println((req));
        ActivityDatum newActivity = new ActivityDatum();
        System.out.println((req));
        try{
            JSONObject json = (JSONObject) parser.parse(req);
            if (json.get("id")!=null){
                int id = (Integer.parseInt(String.valueOf(json.get("id"))));
                if (dataRepo.existsById(id)){
                    return ResponseEntity.badRequest().body("data already exists");
                } else{
                    newActivity.setId(id);
                }
            } else{
                newActivity.setId(randomIdMaker());
            }
            int habitId = (Integer.parseInt(String.valueOf(json.get("habit_id"))));
            if(habitRepo.existsById(habitId)){
                newActivity.setHabit(habitRepo.getReferenceById(habitId));
            } else{
                return ResponseEntity.badRequest().body("habit id not found");
            }
            if(json.get("date") == null){
                newActivity.setDateRecorded(Instant.now());
            }
            if(json.get("amount_done") == null){
                return ResponseEntity.badRequest().body("amount_done cannot be null");
            } else {
                System.out.println(Integer.parseInt(String.valueOf(json.get("amount_done"))));
                newActivity.setAmountDone(Integer.parseInt(String.valueOf(json.get("amount_done"))));
            }
            if(json.get("feeling_score") != null){
                newActivity.setFeelingScore(Integer.parseInt(String.valueOf(json.get("feeling_score"))));
            }
            if(json.get("feeling_comment") != null){
                newActivity.setFeelingComment(String.valueOf(json.get("feeling_comment")));
            }

            System.out.println(newActivity.getId() + ", " + newActivity.getHabit().getId()+ ", " + newActivity.getAmountDone() + ", " +  newActivity.getDateRecorded());
            dataRepo.save(newActivity);
            return ResponseEntity.ok().body("successfully saved");

        } catch (ParseException e) {
            e.printStackTrace();
            throw new Exception("Exception thrown when parsing");
        } catch (Exception e){
            e.printStackTrace();
            throw new Exception("issue with adding new data data");
        }
    }





    private ActivityDatum patchData(String req) throws Exception{
        JSONParser parser = new JSONParser();
        try{
            JSONObject json = (JSONObject) parser.parse(req);
            int id = (Integer.parseInt(String.valueOf(json.get("id"))));
            if (dataRepo.existsById(id)){
                ActivityDatum oldData = dataRepo.findById(id)
                        .orElseThrow( ()-> new HttpClientErrorException(HttpStatus.NOT_FOUND));
                if(json.get("date") != null){
                    oldData.setDateRecorded(Instant.parse(String.valueOf(json.get("date"))));
                }
                if(json.get("amount_done") != null){
                    oldData.setAmountDone(Integer.parseInt(String.valueOf(json.get("amount_done"))));
                }
                if(json.get("feeling_score") != null){
                    oldData.setFeelingScore((Integer)(json.get("feeling_score")));
                }
                if(json.get("feeling_comment") != null){
                    oldData.setFeelingComment(String.valueOf(json.get("feeling_comment")));
                }
                return oldData;
            }

        } catch (ParseException e) {
            throw new Exception("Exception thrown when parsing");
        } catch (Exception e){
            e.printStackTrace();
            throw new Exception("issue with patching data");
        }
        throw new Exception("Exception thrown when parsing");

    }


}

