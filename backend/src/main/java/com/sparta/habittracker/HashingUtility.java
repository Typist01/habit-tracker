package com.sparta.habittracker;

import org.springframework.security.crypto.bcrypt.BCrypt;

public class HashingUtility {

    public static String hashPassword(String password){
        return BCrypt.hashpw(password, BCrypt.gensalt(11));
    }

    public static boolean checkPassword(String password, String hash){
        return BCrypt.checkpw(password, hash);

    }


    //    private static final UpdatableBCrypt bcrypt = new UpdatableBCrypt(11);
//
//    public static String hash(String password) {
//        return bcrypt.hash(password);
//    }
//
//    public static boolean verifyAndUpdateHash(String password, String hash, Function<String, Boolean> updateFunc) {
//        return bcrypt.verifyAndUpdateHash(password, hash, updateFunc);
//    }
}
