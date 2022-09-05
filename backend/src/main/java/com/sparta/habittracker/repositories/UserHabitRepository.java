package com.sparta.habittracker.repositories;

import com.sparta.habittracker.entities.ActivityDatum;
import com.sparta.habittracker.entities.User;
import com.sparta.habittracker.entities.UserHabit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserHabitRepository extends JpaRepository<UserHabit, Integer> {
    public List<UserHabit> findByUser (User user);
}