package com.sparta.habittracker.repositories;

import com.sparta.habittracker.entities.UserHabit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserHabitRepository extends JpaRepository<UserHabit, Integer> {

}