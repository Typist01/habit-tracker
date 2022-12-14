package com.sparta.habittracker.entities;

import javax.persistence.*;

@Entity
@Table(name = "user_habits")
public class UserHabit {

    public UserHabit(Integer id, String name, User user, Activity activityName, ActivityUnit unitType, Integer defaultIncrement) {
        this.id = id;
        this.name = name;
        this.user = user;
        this.activityName = activityName;
        this.unitType = unitType;
        this.defaultIncrement=defaultIncrement;
    }


    @Id
    @Column(name = "user_habit_id", nullable = false)
    private Integer id;

    @Column(name = "name")
    private String name;


    @Column(name = "default_increment")
    private Integer defaultIncrement;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "activity_name", nullable = false)
    private Activity activityName;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "unit_type", nullable = false)
    private ActivityUnit unitType;

    public UserHabit() {

    }
    public Integer getDefaultIncrement() {
        return defaultIncrement;
    }

    public void setDefaultIncrement(Integer defaultIncrement) {
        this.defaultIncrement = defaultIncrement;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Activity getActivityName() {
        return activityName;
    }

    public void setActivityName(Activity activityName) {
        this.activityName = activityName;
    }

    public ActivityUnit getUnitType() {
        return unitType;
    }

    public void setUnitType(ActivityUnit unitType) {
        this.unitType = unitType;
    }

}