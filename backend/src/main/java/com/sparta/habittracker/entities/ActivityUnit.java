package com.sparta.habittracker.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "activity_units")
public class ActivityUnit {
    @Id
    @Column(name = "unit_type", nullable = false)
    private String id;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    //TODO [JPA Buddy] generate columns from DB
}