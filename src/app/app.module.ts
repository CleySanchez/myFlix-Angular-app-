import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';  // Import for Material Icons
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';


// Routing imports
import { RouterModule, Routes } from '@angular/router';  // Import RouterModule and Routes

import { AppComponent } from './app.component';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { FetchApiDataService } from './fetch-api-data.service';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { GenreDialogComponent } from './genre-dialog/genre-dialog.component';
import { DirectorDialogComponent } from './director-dialog/director-dialog.component';
import { DetailsDialogComponent } from './details-dialog/details-dialog.component';  // Import the UserProfileComponent

// Define routes
const appRoutes: Routes = [
  { path: 'welcome', component: WelcomePageComponent },  // Route for welcome page
  { path: 'movies', component: MovieCardComponent },  // Route for movies page
  { path: 'profile', component: UserProfileComponent },  // Route for profile page
  { path: '', redirectTo: 'welcome', pathMatch: 'prefix' },  // Redirect to welcome as default
];

@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationFormComponent,
    UserLoginFormComponent,
    MovieCardComponent,
    WelcomePageComponent,
    UserProfileComponent,
    GenreDialogComponent,
    DirectorDialogComponent,
    DetailsDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,  // Import HttpClientModule
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSnackBarModule,
    MatIconModule,// Import for Material Icons
    MatToolbarModule,
    MatGridListModule,   
    RouterModule.forRoot(appRoutes)  // Add RouterModule with the defined routes
  ],
  providers: [FetchApiDataService],  // Provide the service
  bootstrap: [AppComponent]
})
export class AppModule { }
