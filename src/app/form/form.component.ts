import { Component, OnInit } from '@angular/core';

interface User {
  firstName: string;
  lastName: string;
  number: string;
  email: string;
  profileImage: any;
}
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  constructor() {}
  date = new Date();
  allUsers: any = [];
  showValidations: Boolean = true;
  showModal: Boolean = false;
  currentPost: any;
  currentIndex: number;
  edited = false;
  currentImage: any;

  user: User = {
    firstName: '',
    lastName: '',
    number: null,
    email: '',
    profileImage: null,
  };

  clickHandle(form) {
    if (form.valid) {
      form.value.profileImage = this.currentImage;
      form.value.id = this.date.getMilliseconds() + Math.random();
      if (this.edited) {
        this.showValidations = false;
        this.allUsers.splice(this.currentIndex, 1, form.value);
        this.setDataToLocalStorage(this.allUsers);
        this.clearFormValues();
        this.edited = false;
        return;
      }
      this.allUsers.push(form.value);
      this.clearFormValues();
      this.setDataToLocalStorage(this.allUsers);
      this.showValidations = false;
    } else {
      this.showValidations = true;
    }
  }

  setInitialLocalStorageData() {
    const response = localStorage.getItem('allUsersArray');
    if (response === null) {
      this.setDataToLocalStorage(this.allUsers);
    }
  }

  setDataToLocalStorage(users) {
    localStorage.setItem('allUsersArray', JSON.stringify(users));
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
    this.setDataToLocalStorage(this.allUsers);
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

  fileChangeEvent(e) {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.addEventListener('loadend', this.setCurrentImage.bind(this, reader));
  }

  setCurrentImage(reader) {
    this.currentImage = reader.result;
  }

  deleteHandle(id) {
    this.showModal = true;
    this.currentPost = id;
  }

  editHandle(id) {
    const editedUser = this.allUsers.find((obj, index) => {
      this.currentIndex = index;
      return obj.id === id;
    });
    this.user.firstName = editedUser.firstName;
    this.user.lastName = editedUser.lastName;
    this.user.number = editedUser.number;
    this.user.email = editedUser.email;
    this.edited = true;
  }
}
