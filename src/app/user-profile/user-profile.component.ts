import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userData: any = {};  // Store the user data
  favoriteMovies: any[] = [];  // Store the list of favorite movies

  constructor(
    private fetchApiData: FetchApiDataService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserProfile();  // Fetch user profile data
  }

  // Get current user profile data
  getUserProfile(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (user && user.Username) {
      this.userData = user;  // Use local user data
      this.getFavoriteMovies();  // Fetch favorite movies using localStorage data
    } else {
      this.snackBar.open('User not found. Please log in again.', 'OK', { duration: 2000 });
    }
  }
  

  // Get favorite movies for the user
  // Fetch all movies and filter based on user's favorite movies
  getFavoriteMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((movies: any[]) => {
      // Reference FavoriteMovies with an uppercase F
      this.favoriteMovies = movies.filter(movie => {
        return this.userData.FavoriteMovies.includes(movie._id);  // Filter by favorite movie IDs
      });
    }, (error: any) => {
      this.snackBar.open('Error fetching favorite movies', 'OK', { duration: 2000 });
      console.error('Error fetching favorite movies:', error);
    });
  }
  

  // Update user profile
  updateProfile(): void {
    this.fetchApiData.editUser(this.userData._id, this.userData).subscribe(() => {
      this.snackBar.open('Profile updated successfully', 'OK', { duration: 2000 });
    }, (error: any) => {
      this.snackBar.open('Error updating profile', 'OK', { duration: 2000 });
      console.error('Error updating profile:', error);
    });
  }

  // Delete user profile
  deleteProfile(): void {
    this.fetchApiData.deleteUser(this.userData._id).subscribe(() => {
      this.snackBar.open('Account deleted', 'OK', { duration: 2000 });
      localStorage.clear();
      this.router.navigate(['/welcome']);  // Redirect to welcome page after deletion
    }, (error: any) => {
      this.snackBar.open('Error deleting account', 'OK', { duration: 2000 });
      console.error('Error deleting account:', error);
    });
  }

  // Remove a movie from user's favorite list
  removeFavoriteMovie(movieId: string): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = user._id;

    if (userId) {
      this.fetchApiData.removeFavoriteMovie(userId, movieId).subscribe(() => {
        this.snackBar.open('Movie removed from favorites', 'OK', { duration: 2000 });
        this.favoriteMovies = this.favoriteMovies.filter(movie => movie._id !== movieId);  // Update UI

        // Update localStorage after removing the movie
        user.FavoriteMovies = user.FavoriteMovies.filter((id: string) => id !== movieId);
        localStorage.setItem('user', JSON.stringify(user));
      }, (error: any) => {
        this.snackBar.open('Failed to remove movie from favorites', 'OK', { duration: 2000 });
        console.error('Error removing movie from favorites:', error);
      });
    }
  }
}