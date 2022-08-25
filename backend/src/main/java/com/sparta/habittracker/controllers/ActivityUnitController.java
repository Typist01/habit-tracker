package com.sparta.habittracker.controllers;

import com.sparta.habittracker.entities.ActivityUnit;
import com.sparta.habittracker.repositories.ActivityUnitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class ActivityUnitController {

    @Autowired
    ActivityUnitRepository repo;



//    @GetMapping("/unit")
//
//    @PostMapping("/unit")
//    public ResponseEntity addUnit(@RequestParam("key") String apiKey, @RequestBody ActivityUnit unit){
//        if (repo.existsById(unit.getId())){
//
//        }
//
//
//    }


}
