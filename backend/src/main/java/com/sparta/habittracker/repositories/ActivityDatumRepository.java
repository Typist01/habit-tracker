package com.sparta.habittracker.repositories;

import com.sparta.habittracker.entities.ActivityDatum;
import com.sparta.habittracker.entities.UserHabit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ActivityDatumRepository extends JpaRepository<ActivityDatum, Integer> {
    public List<ActivityDatum> findAllByHabit(UserHabit habit);
}