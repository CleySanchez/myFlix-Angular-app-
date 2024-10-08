// fetch-api-data.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  
  // API Base URL (with trailing slash to avoid path issues)
  private apiUrl = 'https://my-movie-flix-777-b5447997dd22.herokuapp.com/';
  
  constructor(private http: HttpClient) {}

  // 1. User Registration
  public userRegistration(userDetails: any): Observable<any> {
    return this.http.post(`${this.apiUrl}users`, userDetails);
  }

  // 2. User Login
  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(`${this.apiUrl}login`, userDetails);
  }

  // 3. Get All Movies
  public getAllMovies(): Observable<any> {
    return this.http.get(`${this.apiUrl}movies`);
  }

  // 4. Get One Movie by Title
  public getMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${this.apiUrl}movies/${encodeURIComponent(title)}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`  // Attach the token for authentication
      })
    });
  }

  // 5. Get Director Information by Name
  public getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${this.apiUrl}directors/${encodeURIComponent(directorName)}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    });
  }

  // 6. Get Genre Information by Name
  public getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${this.apiUrl}genres/${encodeURIComponent(genreName)}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    });
  }

 // 7. Get User Info by Username instead of User ID
public getUser(username: string): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(`${this.apiUrl}users/${username}`, {
    headers: new HttpHeaders({
      Authorization: `Bearer ${token}`  // Include token for authentication
    })
  });
}


  // 8. Get Favorite Movies for a User (Not used due to missing backend endpoint)
  // public getFavoriteMovies(username: string): Observable<any> {
  //   const token = localStorage.getItem('token');
  //   return this.http.get(`${this.apiUrl}users/${username}/favorites`, {
  //     headers: new HttpHeaders({
  //       Authorization: `Bearer ${token}`  // Assuming token is stored in localStorage
  //     })
  //   });
  // }

  // 9. Add a Movie to Favorite Movies for a User
  public addFavoriteMovie(userId: string, movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(`${this.apiUrl}users/${userId}/favorites/${movieId}`, {}, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`  // Attach the token for authentication
      })
    });
  }

  // 10. Edit User Info
  public editUser(userId: string, userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(`${this.apiUrl}users/${userId}`, userDetails, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    });
  }

  // 11. Delete a User by User ID
  public deleteUser(userId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(`${this.apiUrl}users/${userId}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    });
  }

  // 12. Delete a Movie from a User's Favorite Movies
  public removeFavoriteMovie(userId: string, movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(`${this.apiUrl}users/${userId}/favorites/${movieId}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    });
  }
}