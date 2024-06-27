import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Cart} from './cart.model'

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'http://localhost:5000/api/carts';

  constructor(private http: HttpClient) {}

  getCart(userId: string): Observable<Cart> {
    return this.http.get<Cart>(`${this.apiUrl}/find/${userId}`,{
      withCredentials: true,
      headers: {
        token: `Bearer ${localStorage.getItem('accessToken') ?? ''}`,
      },
    });
  }

  addToCart(
    productId: string,
    quantity: number = 1,
    userId: string
  ): Observable<any> {
    const token = localStorage.getItem('accessToken');
    return this.http.post(
      this.apiUrl,
      { userId, products: [{ productId, quantity }] },
      {
        headers: { token: `Bearer ${token}` },
      }
    );
  }

  removeFromCart(cartId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(`${this.apiUrl}/${cartId}`, {
      headers: { token: `Bearer ${token}` }
    });
  }

}
