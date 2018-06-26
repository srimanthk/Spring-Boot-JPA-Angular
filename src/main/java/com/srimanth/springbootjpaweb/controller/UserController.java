package com.srimanth.springbootjpaweb.controller;

import com.srimanth.springbootjpaweb.model.User;
import com.srimanth.springbootjpaweb.model.UserProfile;
import com.srimanth.springbootjpaweb.service.UserProfileService;
import com.srimanth.springbootjpaweb.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;



@Controller
@RequestMapping("/api/users")
@CrossOrigin(origins = {"http://localhost:4200"})
public class UserController {

	@Autowired
	UserService userService;
	
	@Autowired
	UserProfileService userProfileService;
	
	
	@Autowired
	MessageSource messageSource;

	/**
	 * This method will list all existing users.
	 */
	@RequestMapping(value = { "/list" }, method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> listUsers() {

		List<User> users = userService.findAllUsers();
		return new ResponseEntity<List<User>>(users, HttpStatus.OK);
	}

	@RequestMapping(value = { "/get-user/{ssoId}" }, method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> getUser(@PathVariable String ssoId) {
		User user = userService.findBySSO(ssoId);
		return new ResponseEntity<User>(user, HttpStatus.OK);
	}

	/**
	 * This method will be called on form submission, handling POST request for
	 * saving user in database. It also validates the user input
	 */
	@RequestMapping(value = { "/add-user" }, method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> saveUser(@RequestBody User user) {
		if(!userService.isUserSSOUnique(user.getId(), user.getSsoId())){
			return new ResponseEntity<String>("User already exists", HttpStatus.BAD_REQUEST);
		}
		userService.saveUser(user);
		return ResponseEntity.ok().build();
	}

	/**
	 * This method will be called on form submission, handling POST request for
	 * updating user in database. It also validates the user input
	 */
	@RequestMapping(value = { "/edit-user" }, method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> updateUser(@RequestBody User user) {
		userService.updateUser(user);
		return ResponseEntity.ok().build();
	}

	
	/**
	 * This method will delete an user by it's SSOID value.
	 */
	@RequestMapping(value = { "/delete-user/{ssoId}" }, method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> deleteUser(@PathVariable String ssoId) {
		userService.deleteUserBySSO(ssoId);
		List<User> users = userService.findAllUsers();
		return new ResponseEntity<List<User>>(users, HttpStatus.OK);
	}

	@RequestMapping(value = { "/roles" }, method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> getRoles() {
		List<UserProfile> roles = userProfileService.findAll();
		return new ResponseEntity<List<UserProfile>>(roles, HttpStatus.OK);
	}

}
