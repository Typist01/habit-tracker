package com.sparta.habittracker.repositories;

import com.sparta.habittracker.entities.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserHabitRepository extends JpaRepository<UserHabit, Integer> {
    public List<UserHabit> findByUser (User user);
    public List<UserHabit> findAllByActivityName(Activity activityName);
    public List<UserHabit> findAllByUnitType(ActivityUnit unitType);
}