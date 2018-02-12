package com.addressbook;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Address {

	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private String firstName;
	private String lastName;
	private String email;
	private String phone;
	private String address;
	private String address2;
	private String city;
	private String state;
	private String zipcode;

	public Address(String firstName, String lastName, String email, String phone, String address, String address2,
			String city, String state, String zipcode) {
		this.setFirstName(firstName);
		this.setLastName(lastName);
		this.setEmail(email);
		this.setPhone(phone);
		this.setAddress(address);
		this.setAddress2(address2);
		this.setCity(city);
		this.setState(state);
		this.setZipcode(zipcode);
	}

	public Address() {}
	
	public boolean equals(Address address) {
		return this.firstName.equals(address.getFirstName()) && this.lastName.equals(address.getLastName()) && this.email.equals(address.getEmail()) &&
				this.phone.equals(address.getPhone()) && this.address.equals(address.getAddress()) && this.address2.equals(address.getAddress2()) &&
				this.city.equals(address.getCity()) && this.state.equals(address.getState()) && this.zipcode.equals(this.getZipcode());
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getAddress2() {
		return address2;
	}

	public void setAddress2(String address2) {
		this.address2 = address2;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getZipcode() {
		return zipcode;
	}

	public void setZipcode(String zipcode) {
		this.zipcode = zipcode;
	}

	public Long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

}
