package com.sparta.habittracker.controllers;

import com.sparta.habittracker.Authentication;
import com.sparta.habittracker.entities.ActivityDatum;
import com.sparta.habittracker.entities.UserTarget;
import com.sparta.habittracker.repositories.UserTargetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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


}
