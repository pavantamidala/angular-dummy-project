import { Component, OnInit } from '@angular/core';

interface User {
  firstName: string;
  lastName: string;
  number: string;
  email: string;
  profileImage: any;
  profileImageName: string;
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
  imageDetails = {
    image: '',
    name: '',
  };
  showValidations: Boolean = true;
  showModal: Boolean = false;
  currentPost: any;
  currentIndex: number;
  edited = false;
  currentImage: any;
  currentProfileImageName: string;
  showCurrentFile: Boolean;
  user: User = {
    firstName: '',
    lastName: '',
    number: null,
    email: '',
    profileImage: null,
    profileImageName: '',
  };

  clickHandle(form) {
    debugger;
    if (form.valid) {
      form.value.id = this.date.getMilliseconds() + Math.random();
      if (this.edited) {
        if (!this.currentImage) {
          this.setPreviousImageToForm(form);
          this.saveEditedImage(form);
          return;
        } else {
          this.setImageToForm(form);
          this.saveEditedImage(form);
          return;
        }
      }
      this.setImageToForm(form);
      this.saveImage(form);
    } else {
      this.showValidations = true;
    }
  }

  setPreviousImageToForm(form) {
    form.value.profileImage = this.imageDetails.image;
    form.value.profileImageName = this.imageDetails.name;
  }

  setImageToForm(form) {
    form.value.profileImage = this.currentImage;
    form.value.profileImageName = this.currentProfileImageName;
  }

  saveEditedImage(form) {
    this.showValidations = false;
    this.allUsers.splice(this.currentIndex, 1, form.value);
    this.setDataToLocalStorage(this.allUsers);
    this.clearFormValues();
    this.edited = false;
    this.currentImage = '';
    this.imageDetails.image = '';
    this.imageDetails.name = '';
    this.showCurrentFile = false;
  }

  saveImage(form) {
    this.allUsers.push(form.value);
    this.clearFormValues();
    this.setDataToLocalStorage(this.allUsers);
    this.showValidations = false;
    this.currentImage = '';
    this.imageDetails.image = '';
    this.imageDetails.name = '';
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
    debugger;
    this.currentProfileImageName = e.target.files[0].name;
    this.showCurrentFile = false;
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
    debugger;
    const editedUser = this.allUsers.find((obj, index) => {
      this.currentIndex = index;
      return obj.id === id;
    });
    this.user.firstName = editedUser.firstName;
    this.user.lastName = editedUser.lastName;
    this.user.number = editedUser.number;
    this.user.email = editedUser.email;
    this.imageDetails.image = editedUser.profileImage;
    this.imageDetails.name = editedUser.profileImageName;
    this.showCurrentFile = true;
    this.edited = true;
  }
}
