package com.sparta.habittracker.controllers;

import com.sparta.habittracker.Authentication;
import com.sparta.habittracker.HashingUtility;
import com.sparta.habittracker.entities.User;
import com.sparta.habittracker.repositories.UserRepository;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;
//import javax.json.*;

@RestController
public class UserController {

    @Autowired
    UserRepository repo;

//    @GetMapping("/users")
//    public ResponseEntity<List<User>> getUsers(){
//        List<User> users = repo.findAll();
////        JsonObj
//        //        users.stream().filter(e -> new JSONPObject());
//        return ResponseEntity.ok().header("response", "success")
//                .body(repo.findAll());
//    }

//    returns all users
    @RequestMapping(value="/users", method = RequestMethod.GET)
    public @ResponseBody ResponseEntity getItem(@RequestParam("key") Optional<String> apiKey) {
        if( apiKey.isPresent() && Authentication.successful(apiKey.get())) {
            List<User> users = repo.findAll();
            return ResponseEntity.ok().header("response", "success")
                    .body(repo.findAll());
        }
        else{
            return ResponseEntity.badRequest().body("api key invalid or not found");
        }
    }

//    returns user with id={id} in the url
    @GetMapping("/user")
    public ResponseEntity getUser(@RequestParam("key") Optional<String> apiKey,
                                  @RequestParam("id") int id){
        if (apiKey.isPresent() && Authentication.successful(apiKey.get())){
            Optional<User> user = repo.findById(id);
            if (user.isPresent()){
                return ResponseEntity.ok()
                        .header("response", "success")
                        .body(user.get());
            } else {
                return ResponseEntity.badRequest().header("response","fail")
                        .body("Could not find user by id " + id);
            }
        } else{
            return ResponseEntity.badRequest().body("api key invalid or not found");
        }

    }

//"?id=1902834719&key=10983475aslkfjqi"

    @PostMapping("/users")
    ResponseEntity<String> addUser(@RequestParam("key") Optional<String> apiKey,
            @RequestBody User user){
        if(apiKey.isPresent() && Authentication.successful(apiKey.get())) {
            if (repo.existsByUsername(user.getUsername()) || repo.existsByEmail(user.getEmail())) {
                return ResponseEntity.badRequest().header("response", "fail")
                        .body("User could not be added, user already exists (check username or email)");
            }
            user.setId(("" + user.getUsername() + System.nanoTime()).hashCode());
            user.setPasswordToken(HashingUtility.hashPassword(user.getPasswordToken()));
            repo.save(user);
            return ResponseEntity.ok().header("response", "success")
                    .body("User add successful");
        } else {
            return ResponseEntity.badRequest().body("api key invalid or not found");
        }
    }

    @GetMapping("/users/authorise")
    ResponseEntity<String> authoriseUser(@RequestParam("key") Optional<String> apiKey, @RequestParam("username") String username, @RequestParam("password") String password) {
        if(apiKey.isPresent() && Authentication.successful(apiKey.get())) {

            if (repo.existsByUsername(username)) {
                User user = repo.findUserByUsername(username);
                if (HashingUtility.checkPassword(password, user.getPasswordToken())) {
                    return ResponseEntity.accepted().body("success");
                } else {
                    return ResponseEntity.status(403).body("fail");
                }
            } else {
                return ResponseEntity.badRequest().body("user does not exist");

            }
        } else {
            return ResponseEntity.badRequest().body("api key invalid or not present");
        }
    }
//            json.put("")
//            User user = new User(null, email, username, password);
//        } catch (ParseException e) {
//        }
//        System.out.println(json.toString());
//
//
////        repo.findUserByUsername(user.getUsername());
//
//
//        repo.findUserByEmail(user.getEmail());
//        repo.



}
