import { Component, OnInit } from '@angular/core';

interface User {
  firstName: string;
  lastName: string;
  number: string;
  email: string;
  
}
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  constructor() {}
  allUsers: any = [];
  firstNameFieldValidator: Boolean = false;
  lastNameFieldValidator: Boolean = false;
  numberFieldValidator: Boolean = false;
  showValidations: Boolean = true;
  user: User = {
    firstName: '',
    lastName: '',
    number: null,
    email: '',
  };

  date = new Date();
  clickHandle(form) {
    console.log(form);
    debugger;
    if (form.valid) {
      form.value.id = this.date.getMilliseconds() + Math.random();
      this.allUsers.push(form.value);
      this.clearingFormValues();
      localStorage.setItem('allUsersArray', JSON.stringify(this.allUsers));
      this.storingInLocalStorage();
      this.showValidations = false;
    } else {
      this.showValidations = true;
    }
  }
  storingInLocalStorage() {
    const response = localStorage.getItem('allUsersArray');
    if (response === null) {
      localStorage.setItem('allUsersArray', JSON.stringify(this.allUsers));
    } else {
      const response = localStorage.getItem('allUsersArray');
      this.allUsers = JSON.parse(response);
    }
  }
  ngOnInit() {
    this.storingInLocalStorage();
  }
  clearingFormValues() {
    this.user.firstName = '';
    this.user.lastName = '';
    this.user.number = null;
    this.user.email = '';
  }
  deleteHandle(id) {
    console.log(id);
    const response = confirm('Do you want to delete the post?');
    if (response) {
      this.allUsers = this.allUsers.filter((obj) => {
        return obj.id !== id;
      });
      localStorage.setItem('allUsersArray', JSON.stringify(this.allUsers));
    }
  }
  editHandle(id) {
    console.log(id);
    const editedUsers = this.allUsers.find((obj) => {
      return obj.id === id;
    });
    this.user.firstName = editedUsers.firstName;
    this.user.lastName = editedUsers.lastName;
    this.user.number = editedUsers.number;
    this.user.email = editedUsers.email;
    this.allUsers = this.allUsers.filter((obj) => {
      return obj.id !== id;
    });
  }
}
