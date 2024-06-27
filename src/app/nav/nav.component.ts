import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Emiiters } from '../emitters/emiters';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterModule, NgIf],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent implements OnInit {
  authenticated = false;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get('http://localhost:5000/api/users/find/', {
        withCredentials: true,
        headers: {
          token: `Bearer ${localStorage.getItem('accessToken') ?? ''}`,
        },
      })
      .subscribe((res: any) => {
        this.authenticated = true;
      });
  }

  logout(): void {
    this.http
      .post(
        'http://localhost:5000/api/auth/logout',
        {},
        { withCredentials: true }
      )
      .subscribe((res: any) => {
        this.authenticated = false;
        localStorage.removeItem('accessToken');
      });
  }
}
