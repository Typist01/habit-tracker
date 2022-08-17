package com.sparta.habittracker.repositories;

import com.sparta.habittracker.entities.ActivityDatum;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActivityDatumRepository extends JpaRepository<ActivityDatum, Integer> {
}