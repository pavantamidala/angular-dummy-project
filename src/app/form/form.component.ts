import { Component, OnInit } from '@angular/core';

interface User {
  firstName: string;
  lastName: string;
  number: string;
  email: string;
  profileImage: any;
  edited: Boolean;
}
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  constructor() {}
  allUsers: any = [];
  showValidations: Boolean = true;
  showModal: Boolean = false;
  currentPost: any;
  currentIndex: number;

  user: User = {
    firstName: '',
    lastName: '',
    number: null,
    email: '',
    profileImage: null,
    edited: false,
  };

  date = new Date();

  clickHandle(form) {
    debugger;
    if (form.valid) {
      form.value.id = this.date.getMilliseconds() + Math.random();
      if (form.value.edited) {
        this.showValidations = false;
        form.value.edited = false;
        this.allUsers.splice(this.currentIndex, 1, form.value);
        localStorage.setItem('allUsersArray', JSON.stringify(this.allUsers));
        this.clearFormValues();
        this.user.edited = false;
        return;
      }
      this.allUsers.push(form.value);
      this.clearFormValues();
      localStorage.setItem('allUsersArray', JSON.stringify(this.allUsers));
      this.showValidations = false;
    } else {
      this.showValidations = true;
    }
  }

  setInitialLocalStorageData() {
    const response = localStorage.getItem('allUsersArray');
    if (response === null) {
      localStorage.setItem('allUsersArray', JSON.stringify(this.allUsers));
    }
  }

  getLocalStorageData() {
    const response = localStorage.getItem('allUsersArray');
    this.allUsers = JSON.parse(response);
  }

  ngOnInit() {
    this.setInitialLocalStorageData();
    this.getLocalStorageData();
  }
  
  confirmDelete() {
    this.allUsers = this.allUsers.filter((obj) => {
      return obj.id !== this.currentPost;
    });
    localStorage.setItem('allUsersArray', JSON.stringify(this.allUsers));
    this.showModal = false;
  }

  cancelDelete() {
    this.showModal = false;
  }

  clearFormValues() {
    this.user.firstName = '';
    this.user.lastName = '';
    this.user.number = null;
    this.user.email = '';
    this.user.profileImage = null;
  }

  deleteHandle(id) {
    debugger;
    this.showModal = true;
    this.currentPost = id;
  }

  editHandle(id) {
    debugger;
    const editedUser = this.allUsers.find((obj, index) => {
      this.currentIndex = index;
      return obj.id === id;
    });
    this.user.firstName = editedUser.firstName;
    this.user.lastName = editedUser.lastName;
    this.user.number = editedUser.number;
    this.user.email = editedUser.email;
    this.user.edited = true;
  }
}
