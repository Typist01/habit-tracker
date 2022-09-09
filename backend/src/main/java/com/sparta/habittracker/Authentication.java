package com.sparta.habittracker;

public class Authentication {

    public static boolean successful(String apiKey){
        if (apiKey.equals( "pqw8efj231908hjr12unr10721j2f908h124f")) {
            return true;
        } else {
            return false;
        }
    }
}
