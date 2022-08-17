package com.sparta.habittracker.repositories;

import com.sparta.habittracker.entities.Activity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActivityRepository extends JpaRepository<Activity, String> {
}