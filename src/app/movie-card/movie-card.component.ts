// movie-card.component.ts

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';  // Import MatSnackBar for notifications
import { Router } from '@angular/router';  // Import Router for navigation

// Import the dialog components
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';
import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';
import { DetailsDialogComponent } from '../details-dialog/details-dialog.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];  // Array to store the list of movies

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,  // Inject MatSnackBar for notifications
    private router: Router  // Inject the Router for navigation
  ) {}

  ngOnInit(): void {
    this.getMovies();  // Fetch the movies when the component initializes
  }

  // Fetch all movies from the API
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    }, (error: any) => {
      console.error('Error fetching movies:', error);
      this.snackBar.open('Error fetching movies', 'OK', { duration: 2000 });
    });
  }

  // Add a movie to the user's favorites
  addToFavorites(movieId: string): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');  // Parse user object
    const userId = user._id;  // Get userId from the parsed user object

    if (userId) {
      this.fetchApiData.addFavoriteMovie(userId, movieId).subscribe((response: any) => {
        this.snackBar.open('Movie added to favorites!', 'OK', {
          duration: 2000  // Notification duration in milliseconds
        });

        // Update localStorage to include the new favorite movie
        if (!user.FavoriteMovies.includes(movieId)) {
          user.FavoriteMovies.push(movieId);
          localStorage.setItem('user', JSON.stringify(user));
        }

      }, (error: any) => {
        console.log(error);
        this.snackBar.open('Failed to add movie to favorites.', 'OK', {
          duration: 2000
        });
      });
    } else {
      this.snackBar.open('User not found. Please log in again.', 'OK', { duration: 2000 });
      this.router.navigate(['welcome']);  // Redirect to login if userId is missing
    }
  }

  // Logout method to clear local storage and redirect to the welcome page
  logout(): void {
    localStorage.clear();  // Clear all local storage items (user info and token)
    this.snackBar.open('Logged out successfully', 'OK', {
      duration: 2000  // Notification duration in milliseconds
    });
    this.router.navigate(['welcome']);  // Navigate to the welcome page
  }

  // Open a dialog with genre details
  openGenreDialog(genre: any): void {
    this.dialog.open(GenreDialogComponent, {
      data: { genre },
      width: '500px'
    });
  }

  // Open a dialog with director details
  openDirectorDialog(director: any): void {
    this.dialog.open(DirectorDialogComponent, {
      data: { director },
      width: '500px'
    });
  }

  // Open a dialog with movie details
  openDetailsDialog(movie: any): void {
    this.dialog.open(DetailsDialogComponent, {
      data: { movie },
      width: '500px'
    });
  }
}