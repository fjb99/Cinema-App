import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/core/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'ikub-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private onComponentDestroy$: Subject<void> = new Subject<void>();
  loginForm!: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private matSnackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({ // <form>
      email: new FormControl('eve.holt@reqres.in', Validators.required), // <input>
      password: new FormControl('', Validators.required) // <input>
    });
  }

  ngOnDestroy(): void {
    this.onComponentDestroy$.next();
    this.onComponentDestroy$.complete();
  }

  public login(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).pipe(
        take(1),
        takeUntil(this.onComponentDestroy$)
      ).subscribe(
        (response: { token: string }) => {
          if (response) {
            localStorage.setItem(environment.loggedInUserLocalStorageKey, JSON.stringify(response));
            this.router.navigateByUrl('/home');
          }
        },
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
