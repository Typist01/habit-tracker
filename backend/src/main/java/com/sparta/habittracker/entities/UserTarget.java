package com.sparta.habittracker.entities;

import javax.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "user_targets")
public class UserTarget {
    @Id
    @Column(name = "target_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_habit_id", nullable = false)
    private UserHabit userHabit;

    @Column(name = "target_name", nullable = false)
    private String targetName;

    @Column(name = "target_goal", nullable = false)
    private Integer targetGoal;

    @Column(name = "target_deadline", nullable = false)
    private Instant targetDeadline;

    @Column(name = "target_repeats")
    private Boolean targetRepeats;

    @Column(name = "repeat_interval_in_days")
    private Integer repeatIntervalInDays;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public UserHabit getUserHabit() {
        return userHabit;
    }

    public void setUserHabit(UserHabit userHabit) {
        this.userHabit = userHabit;
    }

    public String getTargetName() {
        return targetName;
    }

    public void setTargetName(String targetName) {
        this.targetName = targetName;
    }

    public Integer getTargetGoal() {
        return targetGoal;
    }

    public void setTargetGoal(Integer targetGoal) {
        this.targetGoal = targetGoal;
    }

    public Instant getTargetDeadline() {
        return targetDeadline;
    }

    public void setTargetDeadline(Instant targetDeadline) {
        this.targetDeadline = targetDeadline;
    }

    public Boolean getTargetRepeats() {
        return targetRepeats;
    }

    public void setTargetRepeats(Boolean targetRepeats) {
        this.targetRepeats = targetRepeats;
    }

    public Integer getRepeatIntervalInDays() {
        return repeatIntervalInDays;
    }

    public void setRepeatIntervalInDays(Integer repeatIntervalInDays) {
        this.repeatIntervalInDays = repeatIntervalInDays;
    }

}