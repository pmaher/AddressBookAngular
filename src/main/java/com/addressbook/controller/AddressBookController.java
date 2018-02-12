package com.addressbook.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.addressbook.Address;
import com.addressbook.dao.AddressBookRepository;

@Controller
public class AddressBookController {
	
	@Autowired
	AddressBookRepository addressBookRepository;

	@GetMapping("/")
	public String getIndex() {
		return "index";
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/api/address/view", produces = {
			MediaType.APPLICATION_JSON_VALUE })
	@ResponseBody
	public Address getAddressById(@RequestParam("id") String id) {
		return (Address) addressBookRepository.findOne(Long.parseLong(id));
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/api/address/list", produces = {
			MediaType.APPLICATION_JSON_VALUE })
	@ResponseBody
	public List<Address> listAllAddresses() {
		return (List<Address>) addressBookRepository.findAll();
	}
	
	@RequestMapping(method = RequestMethod.POST, value = "/api/address/new", produces = {
			MediaType.APPLICATION_JSON_VALUE })
	@ResponseBody
	public Address newAddress(@RequestBody Address newAddress) {

		if(newAddress != null) {
			addressBookRepository.save(newAddress);
		}
		return newAddress;
	}
	
	@RequestMapping(method = RequestMethod.POST, value = "/api/address/delete/{addressId}", produces = {
			MediaType.APPLICATION_JSON_VALUE }) 
	@ResponseBody
	public String deleteAddress(@PathVariable("addressId") long addressId) {
		addressBookRepository.delete(addressId);
		return "{ \"message\":\"success\"\n }";
	}
	
	@RequestMapping(method = RequestMethod.POST, value = "/api/address/update", produces = {
			MediaType.APPLICATION_JSON_VALUE })
	@ResponseBody
	public Address updateAddress(@RequestBody Address updatedAddress) {
		//return newAddress(firstName, lastName, email, phone, address, address2, city, state, zipcode);
		return newAddress(updatedAddress);
	}
}
