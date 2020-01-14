package com.user.usermanagement.repository;

import com.user.usermanagement.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository  extends JpaRepository<User,Integer> {

    @Query("select u from User u where u.user_id=:user_id ")
    public User findUserById(@Param("user_id") String user_id);
}
