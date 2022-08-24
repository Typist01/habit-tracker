package com.sparta.habittracker.controllers;

import com.sparta.habittracker.Authentication;
import com.sparta.habittracker.entities.Activity;
import com.sparta.habittracker.entities.UserHabit;
import com.sparta.habittracker.repositories.ActivityRepository;
import com.sparta.habittracker.repositories.UserHabitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;

import java.util.Optional;

@RestController
public class UserHabitController {

    @Autowired
    UserHabitRepository repo;

    @GetMapping("/habits/{id}")
    public ResponseEntity getHabitById(@RequestParam("key") Optional<String> apiKey, @PathVariable Integer id){
        if (apiKey.isPresent() && Authentication.successful(apiKey.get())){
            return ResponseEntity.ok(repo.findById(id)
                    .orElseThrow(()-> new HttpClientErrorException(HttpStatus.BAD_REQUEST)));
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

    @PostMapping("/habits/new")
    public ResponseEntity<String> makeNewActivity(
            @RequestParam("key") Optional<String> apiKey,
            @RequestBody UserHabit habit){
        if (apiKey.isPresent() && Authentication.successful(apiKey.get())) {
            if (habit == null || habit.getId() == null) {
                return ResponseEntity.badRequest()
                        .header("message", "")
                        .body("Check habit or id, cannot be null");
            }
            if (repo.findById(habit.getId()).isPresent()) {
                return ResponseEntity.status(409)
                        .header("message", "The id already exists")
                        .body("fail");
            } else if (validHabit()) {
                repo.save(habit);
            }
            return ResponseEntity.status(201)
                    .header("message", "successfully added new habit")
                    .body("success");
        } else {
            return ResponseEntity.badRequest().body("Invalid key or not found");
        }
    }

    private boolean validHabit() {
        // TODO: check if activity exists, if not create it
        // TODO: check if units exist, if not create it
        // TODO: check if user_ID exists, else fail
        return false;
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

    @PutMapping("habits/{id}")
    public ResponseEntity<String> updateUserHabitById(
            @RequestParam("key") Optional<String> apiKey,
            @RequestBody UserHabit habit) {
        if (apiKey.isPresent() && Authentication.successful(apiKey.get())) {
            if (validHabit()) repo.save(habit);
            return ResponseEntity.ok().body("Successfully updated habit");
        } else {
            return ResponseEntity.badRequest().body("Invalid key or not found");
        }
    }
}
