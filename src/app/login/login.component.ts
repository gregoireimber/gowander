import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnChanges, OnDestroy {
  // Add some password validators - e.g min length and the need for a number or a special symbol to make the app more secure
  // Will also need to change the relatice error messgaes with hints as to how to make the password pass the checks
  passwordFormControl = new FormControl('', [Validators.required]);
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  private email: string = '';
  private password: string = '';
  public emailSubscription: Subscription;
  public passwordSubscription: Subscription;
  public loading = false;
  public isLogin = true;

  constructor(private authService: AuthService, private router: Router) {
    this.emailSubscription = this.emailFormControl.valueChanges.subscribe(
      (email: string) => {
        this.email = email;
      }
    );
    this.passwordSubscription = this.passwordFormControl.valueChanges.subscribe(
      (password: string) => {
        this.password = password;
      }
    );
  }

  ngOnInit(): void {
    this.isLogin = this.authService.isLogin;
  }

  ngOnChanges(): void {
    this.isLogin = this.authService.isLogin;
  }

  public onSwitchToSignUp(): void {
    this.authService.isLogin = false;
    this.router.navigateByUrl('/signup');
  }

  public onSwitchToLogIn(): void {
    this.authService.isLogin = true;
    this.router.navigateByUrl('/login');
  }

  public onLogIn(): void {
    this.loading = true;
    this.authService
      .emailLogin(this.email.trim(), this.password.trim())
      .then(() => {
        this.loading = false;
      })
      .catch((error) => {
        console.log('error');
      });
  }

  ngOnDestroy(): void {
    this.emailSubscription.unsubscribe();
    this.passwordSubscription.unsubscribe();
  }
}
