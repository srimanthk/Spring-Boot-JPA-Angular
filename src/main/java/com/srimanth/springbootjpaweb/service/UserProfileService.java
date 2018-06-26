package com.srimanth.springbootjpaweb.service;

import java.util.List;

import com.srimanth.springbootjpaweb.model.UserProfile;


public interface UserProfileService {

	UserProfile findById(int id);

	UserProfile findByType(String type);
	
	List<UserProfile> findAll();
	
}
