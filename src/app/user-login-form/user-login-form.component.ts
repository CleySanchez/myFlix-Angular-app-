import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';  // Import Router for navigation

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  // Data object bound to the form via ngModel
  @Input() loginData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router  // Inject the Router for navigation
  ) {}

  ngOnInit(): void {}

  // Method to log in the user
  loginUser(): void {
    this.fetchApiData.userLogin(this.loginData).subscribe((result) => {
      // Save the user information and token to localStorage
      localStorage.setItem('token', result.token);
      localStorage.setItem('user', JSON.stringify(result.user));

      // Close the dialog after successful login
      this.dialogRef.close();

      // Show success message
      this.snackBar.open('Login successful', 'OK', {
        duration: 2000
      });

      // Navigate to the "movies" route after successful login
      this.router.navigate(['movies']);  // Redirect to movies page

    }, (error) => {
      // Show error message if login fails
      this.snackBar.open('Error: ' + error, 'OK', {
        duration: 2000
      });
    });
  }
}
