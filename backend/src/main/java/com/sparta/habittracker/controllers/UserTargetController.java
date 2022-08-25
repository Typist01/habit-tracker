package com.sparta.habittracker.controllers;

import com.sparta.habittracker.Authentication;
import com.sparta.habittracker.entities.ActivityDatum;
import com.sparta.habittracker.entities.UserTarget;
import com.sparta.habittracker.repositories.UserTargetRepository;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;

import java.time.Instant;
import java.util.Optional;

@RestController
public class UserTargetController {


    @Autowired
    UserTargetRepository repo;

    @GetMapping ("targets")
    public ResponseEntity findAllActivityData(@RequestParam("key") Optional<String> apiKey){
        if(apiKey.isPresent() && Authentication.successful(apiKey.get())){
            return ResponseEntity.ok().body(repo.findAll());
        } else{
            return ResponseEntity.status(403).body("api key invalid or not found");
        }
    }
    @GetMapping ("targets/{id}")
    public ResponseEntity findActivityDataById(@RequestParam("key") Optional<String> apiKey, @PathVariable Integer id){
        if(apiKey.isPresent() && Authentication.successful(apiKey.get())){
            if (repo.findById(id)== null){
                return ResponseEntity.status(404).header("message", "This data does not exist").body("fail");
            }
            return ResponseEntity.ok().body(repo.findById(id).get());
        } else{
            return ResponseEntity.status(403).body("api key invalid or not found");
        }
    }
    @PostMapping("targets/new")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity newTarget(
            @RequestParam("key") Optional<String> apiKey,
            @RequestBody UserTarget target){
        if(apiKey.isPresent() && Authentication.successful(apiKey.get())){
            if (target == null || target.getId()== 0){
                return ResponseEntity.badRequest()
                        .header("message", "")
                        .body("Check target or id, neither can be null");
            }
            if (repo.findById(target.getId()).isPresent()){
                return ResponseEntity.status(409)
                        .header("message", "The id already exists")
                        .body("fail");
            }
            else repo.save(target);

            return ResponseEntity.status(201)
                    .header("message", "successfully added new target")
                    .body("success");
        } else{
            return ResponseEntity.status(403).body("api key invalid or not found");
        }
    }
    @DeleteMapping ("targets/delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity deleteActivityDataById(
            @RequestParam("key") Optional<String> apiKey,
            @PathVariable Integer id){
        if(apiKey.isPresent() && Authentication.successful(apiKey.get())){
            UserTarget target = repo.findById(id).get();
            if (target == null){
                return ResponseEntity.badRequest()
                        .header("message", "")
                        .body("That entry does not exist");
            }
            repo.delete(target);
            return ResponseEntity.status(200)
                    .header("message", "successfully deleted target")
                    .body("success");
        } else{
            return ResponseEntity.status(403).body("api key invalid or not found");
        }
    }

    @PatchMapping("targets/update")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity updateActivityData(@RequestParam("key") Optional<String> apiKey, @RequestBody String data) {
        if(apiKey.isPresent() && Authentication.successful(apiKey.get())){
            if (data == null) {
                return ResponseEntity.badRequest()
                        .header("message", "")
                        .body("Empty String received");
            }
            try{
                UserTarget updatedRecord = patchData(data);
                repo.save(updatedRecord);
                return ResponseEntity.ok().body("successfully updated");
            } catch(Exception e){
                e.printStackTrace();
                return ResponseEntity.unprocessableEntity().body("Exception thrown when parsing data");
            }
        } else{
            return ResponseEntity.status(403).body("api key invalid or not found");
        }
    }

    private UserTarget patchData(String req) throws Exception{
        JSONParser parser = new JSONParser();
        try{
            JSONObject json = (JSONObject) parser.parse(req);
            int id = (Integer.parseInt(String.valueOf(json.get("id"))));
            if (repo.existsById(id)){
                UserTarget oldData = repo.findById(id)
                        .orElseThrow( ()-> new HttpClientErrorException(HttpStatus.NOT_FOUND));
                if(json.get("target_name") != null){
                    oldData.setTargetName(String.valueOf(json.get("target_name")));
                }
                if(json.get("target_goal") != null){
                    oldData.setTargetGoal(Integer.parseInt(String.valueOf(json.get("target_goal"))));
                }
                if(json.get("target_deadline") != null){
                    oldData.setTargetDeadline(Instant.parse(String.valueOf(json.get("target_deadline"))));
                }
                if(json.get("target_repeats") != null){
                    oldData.setTargetRepeats(Boolean.valueOf(String.valueOf(json.get("target_repeats"))));
                }
                if(json.get("repeat_interval_in_days") != null){
                    oldData.setRepeatIntervalInDays(Integer.valueOf(String.valueOf(json.get("repeat_interval_in_days"))));
                }
                return oldData;
            }

        } catch (ParseException e) {
            throw new Exception("Exception thrown when parsing");
        } catch (Exception e){
            throw new Exception("issue with patching data");
        }
        throw new Exception("Exception thrown when parsing");
    }

}
