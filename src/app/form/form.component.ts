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
  allUsers: any = [];
  showValidations: Boolean = true;
  showModal: Boolean = false;
  currentPost: any;
  currentIndex: number;
  edited=false;

  user: User = {
    firstName: '',
    lastName: '',
    number: null,
    email: '',
    profileImage: null,
   
  };

  date = new Date();

  clickHandle(form) {
    debugger;
    if (form.valid) {
      form.value.id = this.date.getMilliseconds() + Math.random();
      if (this.edited) {
        this.showValidations = false;
        form.value.edited = false;
        this.allUsers.splice(this.currentIndex, 1, form.value);
        this.setDataToLocalStorage(this.allUsers);
        this.clearFormValues();
        this.edited = false
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

  fileChange(e){
    debugger
    console.log(e)
    let that = this.user
    let reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])
    reader.onloadend = function(){
      debugger
      that.profileImage = reader.result
    }
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
    this.edited = true;
  }
}
