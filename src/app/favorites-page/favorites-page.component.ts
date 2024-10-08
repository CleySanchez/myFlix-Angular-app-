import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.scss']
})
export class FavoritesPageComponent implements OnInit {
  user: any = {};  // Store user data
  favoriteMovies: any[] = [];  // Store favorite movies

  constructor(
    private fetchApiData: FetchApiDataService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.getFavoriteMovies();
  }

  // Get user from localStorage
  getUser(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    }
  }

  // Fetch all movies and filter the favorite movies based on user data
  getFavoriteMovies(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const favoriteMovieIds = user.FavoriteMovies;  // Retrieve favorite movie IDs from localStorage
  
    this.fetchApiData.getAllMovies().subscribe((movies: any[]) => {
      this.favoriteMovies = movies.filter(movie => favoriteMovieIds.includes(movie._id));
    }, (error: any) => {
      this.snackBar.open('Error fetching favorite movies', 'OK', { duration: 2000 });
      console.error('Error fetching favorite movies:', error);
    });
  }
  
}