import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userData: any = {};

  constructor(private fetchApiData: FetchApiDataService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.getUserProfile();
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
}
