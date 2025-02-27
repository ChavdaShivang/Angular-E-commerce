import { NgClass, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, NgClass],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ){}
  ngOnInit(): void{
    this.form = this.formBuilder.group({
      username:"",
      password:""
    })
  }


  submit(): void{
    let user = this.form.getRawValue()
    if(user.username === "" || user.password === ""){
      Swal.fire("Error", "Please enter all the fields", "error")
    }else if(user.password.length < 6 ){
      Swal.fire("Error", "Password must be at least 6 characters long", "error")
    }else{
      this.http.post("http://localhost:5000/api/auth/login", user, {
        withCredentials: true
      }).subscribe((res: any) => {
        localStorage.setItem("accessToken", res.accessToken);
        this.router.navigate(['/'])
        
      }, (err) => {
        Swal.fire("Error", err.error.message, "error")
      })
    }
  }
}
