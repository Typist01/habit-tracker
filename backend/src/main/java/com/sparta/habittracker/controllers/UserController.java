package com.sparta.habittracker.controllers;

import com.sparta.habittracker.HashingUtility;
import com.sparta.habittracker.entities.User;
import com.sparta.habittracker.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
//import javax.json.*;

@RestController
public class UserController {

    @Autowired
    UserRepository repo;

    @GetMapping("/users")
    public ResponseEntity<List<User>> getUsers(){
        List<User> users = repo.findAll();
//        JsonObj
        //        users.stream().filter(e -> new JSONPObject());
        return ResponseEntity.ok().header("response", "success")
                .body(repo.findAll());
    }

    @GetMapping("/user")



    @PostMapping("/users")
    ResponseEntity<String> addUser(@RequestBody User user){
        if(repo.existsByUsername(user.getUsername()) || repo.existsByEmail(user.getEmail())){
            return ResponseEntity.badRequest().header("response", "fail")
                    .body("User could not be added, user already exists (check username or email)");
        }
        user.setId(("" + user.getUsername() + System.nanoTime()).hashCode());
        user.setPasswordToken(HashingUtility.hashPassword(user.getPasswordToken()));
        repo.save(user);
        return ResponseEntity.ok().header("response", "success")
                .body("User add successful");
    }


}
