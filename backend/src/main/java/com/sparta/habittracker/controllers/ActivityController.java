package com.sparta.habittracker.controllers;

import com.sparta.habittracker.entities.Activity;
import com.sparta.habittracker.repositories.ActivityRepository;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;

import java.util.List;

@RestController
public class ActivityController {
    @Autowired
    ActivityRepository activityRepository;

    @GetMapping("/activities")
    public List<Activity> getAllActivities(){
        return activityRepository.findAll();
    }

    @GetMapping("/activities/{id}")
    public Activity getActivityById(@PathVariable String id){
        return activityRepository.findById(id).get();
    }
    @PostMapping ("/activities/new")
    public ResponseEntity makeNewActivity(@RequestBody Activity activity){
        if (activity == null || activity.getId()==null){
//            throw new HttpClientErrorException(HttpStatus.BAD_REQUEST);
            return ResponseEntity.badRequest().header("message", "").body("Check activity or id, cannot be null");
        }
        if (activityRepository.findById(activity.getId()) != null){
//            throw new HttpClientErrorException(HttpStatus.CONFLICT);
            return ResponseEntity.status(409).header("message", "The id already exists").body("fail");
        }
        else activityRepository.save(activity);

        return ResponseEntity.status(201).header("message", "successfully added new activity").body("success");
    }
    @DeleteMapping("/activities/delete/{id}")
    public void deleteActivityById(@PathVariable String id){
        Activity activity = activityRepository.findById(id).get();
        if (activity == null ){
            throw new HttpClientErrorException(HttpStatus.BAD_REQUEST);
        }
        activityRepository.delete(activity);
        return;
    }
}
