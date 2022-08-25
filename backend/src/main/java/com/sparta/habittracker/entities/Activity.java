package com.sparta.habittracker.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "activities")
public class Activity {

    public Activity(String id){
        this.id=id;
    }
    @Id
    @Column(name = "activity_name", nullable = false)
    private String id;

    public Activity() {

    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    //TODO [JPA Buddy] generate columns from DB
}