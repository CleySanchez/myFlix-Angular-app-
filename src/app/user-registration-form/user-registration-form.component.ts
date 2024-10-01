import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';  // Import the service
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {
  
  // Binding form data to userData object
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,  // Inject the service
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,  // To manage dialog closing
    public snackBar: MatSnackBar  // For showing notifications
  ) {}

  ngOnInit(): void {}

  // Function to register user via service API
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
      this.dialogRef.close();  // Close the dialog on success
      this.snackBar.open('Registration successful', 'OK', {
        duration: 2000
      });
    }, (error) => {
      this.snackBar.open('Error: ' + error, 'OK', {
        duration: 2000
      });
    });
  }
}
