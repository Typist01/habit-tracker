package com.sparta.habittracker.entities;

import com.sparta.habittracker.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "users")
public class User {
    @Id
    @Column(name = "user_id", nullable = false)
    private Integer id;

    @Column(name = "email")
    private String email;

    @Column(name = "username", nullable = false)
    private String username;

    @Column(name = "password_token", nullable = false)
    private String passwordToken;

    public User(Integer id, String email, String username, String passwordToken) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.passwordToken = passwordToken;
    }
    public User(){

    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPasswordToken() {
        return passwordToken;
    }

    public void setPasswordToken(String passwordToken) {
        this.passwordToken = passwordToken;
    }

}