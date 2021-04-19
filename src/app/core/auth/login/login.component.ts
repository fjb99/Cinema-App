import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'ikub-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private matSnackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({ // <form>
      email: new FormControl('eve.holt@reqres.in', Validators.required), // <input>
      password: new FormControl('', Validators.required) // <input>
    });
  }

  public login(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (response: { token: string }) => console.log(response.token),
        (err: HttpErrorResponse) => {
          this.matSnackBar.open(err?.error?.error ? err.error.error : 'Unknown error!');
          if (err?.error?.error?.toLowerCase() === 'user not found') {
            this.loginForm.get('email')?.reset();
          }
        }
      );
    }
  }
}
