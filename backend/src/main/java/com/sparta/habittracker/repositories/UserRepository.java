package com.sparta.habittracker.repositories;

import com.sparta.habittracker.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
}