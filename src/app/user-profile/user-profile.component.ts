import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userData: any = {};
  favoriteMovies: any[] = [];

  constructor(
    private fetchApiData: FetchApiDataService, 
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getUserProfile();
    this.getFavoriteMovies();
  }

  // Get current user profile data
  getUserProfile(): void {
    const username: string = localStorage.getItem('user') || '';  // Fallback to empty string if null
    if (username) {
      this.fetchApiData.getUser(username).subscribe((resp: any) => {
        this.userData = resp;
      });
    } else {
      this.snackBar.open('User not found. Please log in again.', 'OK', {
        duration: 2000
      });
    }
  }

  // Get favorite movies for the user
  getFavoriteMovies(): void {
    const username: string = localStorage.getItem('user') || '';  // Get username from localStorage
    if (username) {
      this.fetchApiData.getFavoriteMovies(username).subscribe((resp: any) => {
        this.favoriteMovies = resp;  // Assume the response contains the favorite movies array
      });
    }
  }

  // Update user profile
  updateProfile(): void {
    this.fetchApiData.editUser(this.userData.Username, this.userData).subscribe(() => {
      this.snackBar.open('Profile updated successfully', 'OK', { duration: 2000 });
    });
  }

  // Delete user profile
  deleteProfile(): void {
    this.fetchApiData.deleteUser(this.userData.Username).subscribe(() => {
      this.snackBar.open('Account deleted', 'OK', { duration: 2000 });
      localStorage.clear();
      window.location.href = '/welcome';  // Redirect to welcome page
    });
  }

  // Remove a movie from user's favorite list
  removeFavoriteMovie(movieId: string): void {
    const username: string = localStorage.getItem('user') || '';  // Get username from localStorage
    this.fetchApiData.removeFavoriteMovie(username, movieId).subscribe(() => {
      this.snackBar.open('Movie removed from favorites', 'OK', { duration: 2000 });
      this.favoriteMovies = this.favoriteMovies.filter(movie => movie._id !== movieId);  // Update the list in the UI
    });
  }
}
