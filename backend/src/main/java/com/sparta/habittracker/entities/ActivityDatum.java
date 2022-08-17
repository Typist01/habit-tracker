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