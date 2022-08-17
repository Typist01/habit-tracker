package com.sparta.habittracker.repositories;

import com.sparta.habittracker.entities.ActivityUnit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActivityUnitRepository extends JpaRepository<ActivityUnit, String> {
}