import { NgClass, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  form: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ){}
  ngOnInit(): void{
    this.form = this.formBuilder.group({
      username:"",
      email:"",
      password:""
    })
  }


  submit(): void{
    let user = this.form.getRawValue()
    console.log(user)
    if(user.username === "" || user.email === "" || user.password === ""){
      Swal.fire("Error", "Please enter all the fields", "error")
    }else if(user.password.length < 6 ){
      Swal.fire("Error", "Password must be at least 6 characters long", "error")
    }else{
      this.http.post("http://localhost:5000/api/auth/register", user, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }
      }).subscribe(() => this.router.navigate(['/']), (err) => {
        Swal.fire("Error", err.error.message, "error")
      })
    }
  }
}
