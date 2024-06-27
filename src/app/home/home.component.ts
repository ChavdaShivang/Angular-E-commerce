import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Emiiters } from '../emitters/emiters';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  message = ""
  constructor(private http:HttpClient){}

  ngOnInit(): void{
    this.http.get("http://localhost:5000/api/users/find/", {
      withCredentials: true,
      headers: {
        token: `Bearer ${localStorage.getItem("accessToken")??""}`
      }
    }).subscribe((res: any) => {
      this.message = `Hi ${res.username}`;
      Emiiters.authEmitter.emit(true)
    }, 
      (err) => {
        this.message = "You are not logged in!!"
        Emiiters.authEmitter.emit(false)
      } 
    )
  }
}
