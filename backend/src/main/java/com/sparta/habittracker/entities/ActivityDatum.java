package com.sparta.habittracker.entities;

import javax.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "activity_data")
public class ActivityDatum {
    @Id
    @Column(name = "activity_data_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "habit_id", nullable = false)
    private UserHabit habit;

    @Column(name = "date_recorded")
    private Instant dateRecorded;

    @Column(name = "amount_done", nullable = false)
    private Integer amountDone;

    @Column(name = "feeling_score", nullable = true)
    private Integer feelingScore;

    @Column (name="feeling_comment", nullable=true)
    private String feelingComment;

    public Integer getFeelingScore() {
        return feelingScore;
    }

    public void setFeelingScore(Integer feelingScore) {
        this.feelingScore = feelingScore;
    }

    public String getFeelingComment() {
        return feelingComment;
    }

    public void setFeelingComment(String feelingComment) {
        this.feelingComment = feelingComment;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public UserHabit getHabit() {
        return habit;
    }

    public void setHabit(UserHabit habit) {
        this.habit = habit;
    }

    public Instant getDateRecorded() {
        return dateRecorded;
    }

    public void setDateRecorded(Instant dateRecorded) {
        this.dateRecorded = dateRecorded;
    }

    public Integer getAmountDone() {
        return amountDone;
    }

    public void setAmountDone(Integer amountDone) {
        this.amountDone = amountDone;
    }

}