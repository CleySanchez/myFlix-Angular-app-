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
    return this.http.get(`${this.apiUrl}movies/${title}`);
  }

  // 5. Get Director Information by Name
  public getDirector(directorName: string): Observable<any> {
    return this.http.get(`${this.apiUrl}directors/${directorName}`);
  }

  // 6. Get Genre Information by Name
  public getGenre(genreName: string): Observable<any> {
    return this.http.get(`${this.apiUrl}genres/${genreName}`);
  }

  // 7. Get User Info by Username
  public getUser(username: string): Observable<any> {
    return this.http.get(`${this.apiUrl}users/${username}`);
  }

  // 8. Get Favorite Movies for a User (with auth token)
  public getFavoriteMovies(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${this.apiUrl}users/${username}/favorites`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`  // Assuming token is stored in localStorage
      })
    });
  }

  // 9. Add a Movie to Favorite Movies for a User (with auth token)
  public addFavoriteMovie(username: string, movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(`${this.apiUrl}users/${username}/favorites/${movieId}`, {}, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    });
  }

  // 10. Edit User Info (with auth token)
  public editUser(username: string, userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(`${this.apiUrl}users/${username}`, userDetails, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    });
  }

  // 11. Delete a User by Username (with auth token)
  public deleteUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(`${this.apiUrl}users/${username}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    });
  }

  // 12. Delete a Movie from a User's Favorite Movies (with auth token)
  public removeFavoriteMovie(username: string, movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(`${this.apiUrl}users/${username}/favorites/${movieId}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    });
  }
}
