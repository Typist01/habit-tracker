package com.sparta.habittracker.controllers;

import com.sparta.habittracker.Authentication;
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

@RestController
public class ActivityDatumController {
    @Autowired
    ActivityDatumRepository dataRepo;

    @Autowired
    UserHabitRepository habitRepo;

    @GetMapping ("activityData")
    public ResponseEntity findAllActivityData(@RequestParam("key") Optional<String> apiKey){
        if(apiKey.isPresent() && Authentication.successful(apiKey.get())){
            return ResponseEntity.ok().body(dataRepo.findAll());
        } else{
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
    @PostMapping ("activityData/new")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity newActivityData(
            @RequestParam("key") Optional<String> apiKey,
            @RequestBody ActivityDatum activityDatum){
        if(apiKey.isPresent() && Authentication.successful(apiKey.get())){
        if (activityDatum == null || activityDatum.getId()== 0){
            return ResponseEntity.badRequest()
                    .header("message", "")
                    .body("Check activityData or id, neither can be null");
        }
        if (dataRepo.findById(activityDatum.getId()).isPresent()){
            return ResponseEntity.status(409)
                    .header("message", "The id already exists")
                    .body("fail");
        }
        else dataRepo.save(activityDatum);

        return ResponseEntity.status(201)
                .header("message", "successfully added new activityData")
                .body("success");
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
    public ResponseEntity updateActivityData(@RequestParam("key") Optional<String> apiKey, @RequestBody ActivityDatum data) {
        if(apiKey.isPresent() && Authentication.successful(apiKey.get())){
        if (data == null || data.getId() == 0) {
            return ResponseEntity.badRequest()
                    .header("message", "")
                    .body("Check activityData or id, neither can be null");
        }
        ActivityDatum databaseVersion = dataRepo.findById(data.getId()).get();
        if (databaseVersion == null) {
            return ResponseEntity.badRequest()
                    .header("message", "")
                    .body("Requested id not in database");
        }
        dataRepo.save(data);
        return ResponseEntity.ok().body("successfully updated");
    } else{
            return ResponseEntity.status(403).body("api key invalid or not found");
        }
    }

    private void patchData(String req){
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
            }

        } catch (ParseException e) {
            throw new RuntimeException(e);
        }

    }

}
