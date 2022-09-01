package com.sparta.habittracker.controllers;

import com.sparta.habittracker.Authentication;
import com.sparta.habittracker.entities.Activity;
import com.sparta.habittracker.repositories.ActivityRepository;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
public class ActivityController {
    @Autowired
    ActivityRepository activityRepository;

    @GetMapping("/activities")
    public ResponseEntity getAllActivities( @RequestParam("key") Optional<String> apiKey){
        if (apiKey.isPresent() && Authentication.successful(apiKey.get())){
            return ResponseEntity.ok().body(activityRepository.findAll());
        } else{
            return ResponseEntity.badRequest().body("Invalid key or not found");
        }
    }

    @GetMapping("/activities/{id}")
    public ResponseEntity getActivityById(@RequestParam("key") Optional<String> apiKey, @PathVariable String id){
        if(apiKey.isPresent() && Authentication.successful(apiKey.get())){
            return ResponseEntity.ok().body(activityRepository.findById(id).get());
        } else{
            return ResponseEntity.badRequest().body("invalid api key or not found");
        }
    }
    @PostMapping ("/activities/new")
    public ResponseEntity makeNewActivity( @RequestParam("key") Optional<String> apiKey, @RequestBody Activity activity){
        if (apiKey.isPresent() && Authentication.successful(apiKey.get())){
            if (activity == null || activity.getId()==null){
//            throw new HttpClientErrorException(HttpStatus.BAD_REQUEST);
                return ResponseEntity.badRequest().header("message", "").body("Check activity or id, cannot be null");
            }
            if (activityRepository.findById(activity.getId()).isPresent()){
//            throw new HttpClientErrorException(HttpStatus.CONFLICT);
                return ResponseEntity.status(409).header("message", "The id already exists").body("fail");
            }
            else activityRepository.save(activity);

            return ResponseEntity.status(201).header("message", "successfully added new activity").body("success");
        } else{
            return ResponseEntity.badRequest().body("api key invalid or not found");
        }
    }
    @DeleteMapping("/activities/delete/{id}")
    public ResponseEntity deleteActivityById(@RequestParam("key") Optional<String>apiKey, @PathVariable String id){
        if (apiKey.isPresent() && Authentication.successful(apiKey.get())){
            Activity activity = activityRepository.findById(id).get();
            if (activity == null ){
//                throw new HttpClientErrorException(HttpStatus.BAD_REQUEST);
                return ResponseEntity.badRequest().body("activity not found");
            }
            activityRepository.delete(activity);
            return ResponseEntity.ok().body("Successfully deleted");
        } else{
            return ResponseEntity.ok().body("Api key invalid or not found");
        }
    }
}
