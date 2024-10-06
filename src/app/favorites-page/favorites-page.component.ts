// src/app/favorites-page/favorites-page.component.ts
import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.scss']
})
export class FavoritesPageComponent implements OnInit {
  favoriteMovies: any[] = [];
  user: any = localStorage.getItem('user');  // Get the logged-in user

  constructor(
    private fetchApiData: FetchApiDataService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getFavoriteMovies();
  }

  // Fetch the favorite movies for the user
  getFavoriteMovies(): void {
    this.fetchApiData.getFavoriteMovies(this.user).subscribe((resp: any) => {
      this.favoriteMovies = resp;
    }, (error: any) => {
      this.snackBar.open('Failed to load favorite movies.', 'OK', {
        duration: 2000
      });
    });
  }
}
