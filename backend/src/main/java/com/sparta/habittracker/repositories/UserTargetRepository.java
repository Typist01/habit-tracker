package com.sparta.habittracker.repositories;

import com.sparta.habittracker.entities.UserTarget;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserTargetRepository extends JpaRepository<UserTarget, Integer> {
}