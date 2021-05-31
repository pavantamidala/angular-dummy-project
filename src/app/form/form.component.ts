import { Component, OnInit } from '@angular/core';

interface User {
  firstname: string;
  lastname: string;
  number: number;
  email: string;
}
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  constructor() { }
  public allUsers: any = []
  user: User = {
    firstname: "",
    lastname: "",
    number: null,
    email: ""
  }
 
   date = new Date()
  clickHandle(e) {
    
    this.allUsers.push({ firstname: this.user.firstname, lastname: this.user.lastname, number: this.user.number, email: this.user.email,id:this.date.getMilliseconds()+Math.random()})
    
    console.log(this.allUsers)
    this.user.firstname = ""
    this.user.lastname = ""
    this.user.number = null
    this.user.email = ""
  }
  deleteHandle(e,id){
    console.log(id)
     this.allUsers = this.allUsers.filter((obj)=>{
      return obj.id !== id
    })
  }
  editHandle(e,id){
    debugger
  console.log(id)
    let temp = this.allUsers.find((obj) => {
      return obj.id === id
    })
    this.user.firstname = temp.firstname
    this.user.lastname = temp.lastname
    this.user.number = temp.number
    this.user.email = temp.email
    this.allUsers = this.allUsers.filter((obj) => {
      return obj.id !== id
    })
  }
  ngOnInit(): void {
  }

}
