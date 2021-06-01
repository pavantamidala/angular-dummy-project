import { Component, OnInit } from '@angular/core';

interface User {
  firstName: string;
  lastName: string;
  number: number;
  email: string;
  // profileImage:any;
}
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  constructor() {}
  public allUsers: any = [];
  firstNameFieldValidator:Boolean = false
   lastNameFieldValidator:Boolean = false
   numberFieldValidator:Boolean = false
  user: User = {
    firstName: '',
    lastName: '',
    number: null,
    email: '',
    // profileImage:null,
  };

  date = new Date();
  clickHandle(e) {
    console.log(e)
    debugger
    this.firstNameValidator(e.firstName)
    this.lastNameValidator(e.lastName)
    this.numberValidator(e.number)
    if(!this.firstNameFieldValidator && !this.lastNameFieldValidator && !this.numberFieldValidator){
      e.id=this.date.getMilliseconds()+Math.random()
      this.allUsers.push(e);
      this.user.firstName = '';
      this.user.lastName = '';
      this.user.number = null;
      this.user.email = '';
      // this.user.profileImage = null
    }
    
  }
  deleteHandle(id) {
    debugger
    console.log(id);
     let response =  confirm("Do you want to delete the post?")
     if(response){
       this.allUsers = this.allUsers.filter((obj) => {
         return obj.id !== id;
       })
     }
  }
  editHandle(id) {
    
    console.log(id);
    let temp = this.allUsers.find((obj) => {
      return obj.id === id;
    });
    this.user.firstName = temp.firstName;
    this.user.lastName = temp.lastName;
    this.user.number = temp.number;
    this.user.email = temp.email;
    this.allUsers = this.allUsers.filter((obj) => {
      return obj.id !== id;
    });
  }
  firstNameValidator(str){
    
  if(str.length===0){
    this.firstNameFieldValidator = true;
    return;
  }else{
    this.firstNameFieldValidator = false;
   return;
  }
}
lastNameValidator(str){
  if(str.length===0){
    this.lastNameFieldValidator = true;
    return;
  }else{
    this.lastNameFieldValidator = false;
   return;
  }
}

numberValidator(num){
  if(String(num).length !== 10 ){
    this.numberFieldValidator = true
    return;
  }else{
    this.numberFieldValidator = false;
 return;
  }
}

}

