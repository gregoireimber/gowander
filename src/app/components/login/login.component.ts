import { Component, HostListener, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MessagingService } from '../../services/messaging.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnChanges, OnDestroy {

  @HostListener('window:resize', ['$event'])
  private onResize(event: any) {
    if (event.target.innerWidth < 1024) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  // Add some password validators - e.g min length and the need for a number or a special symbol to make the app more secure
  // Will also need to change the relative error messgaes with hints as to how to make the password pass the checks
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  firstNameFormControl = new FormControl('', [Validators.required]);
  lastNameFormControl = new FormControl('', [Validators.required]);

  private email: string = '';
  private password: string = '';
  private firstName: string = '';
  private lastName: string = '';

  public emailSubscription: Subscription;
  public passwordSubscription: Subscription;
  public firstNameSubscription: Subscription;
  public lastNameSubscription: Subscription;

  public loading = false;
  public isLogin = true;
  public isMobile = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageServ: MessagingService
  ) {
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

    this.firstNameSubscription =
      this.firstNameFormControl.valueChanges.subscribe((firstName: string) => {
        this.firstName = firstName;
      });

    this.lastNameSubscription = this.lastNameFormControl.valueChanges.subscribe(
      (lastName: string) => {
        this.lastName = lastName;
      }
    );

  }

  ngOnInit(): void {
    this.isLogin = this.authService.isLogin;

    if (window.screen.width < 1024) this.isMobile = true;
  }

  ngOnChanges(): void {
    this.isLogin = this.authService.isLogin;
  }

  public onSwitchToSignUp(): void {
    this.router.navigateByUrl('/signup');
    this.isLogin = this.authService.isLogin;
  }

  public onSwitchToLogIn(): void {
    this.router.navigateByUrl('/login');
    this.isLogin = this.authService.isLogin;
  }

  public onLogIn(): void {
    this.loading = true;
    this.authService
      .emailLogin(this.email.trim(), this.password.trim())
      .then(() => {
        this.loading = false;
      })
      .catch((error) => {
        this.messageServ.emitErrorMessage(error.message);
      });
  }

  public onSignUp(): void {
    this.loading = true;

    const signUpInfo = {
      firstName: this.firstName.trim(),
      lastName: this.lastName.trim(),
      email: this.email.trim(),
      password: this.password.trim(),
    };

    this.authService
      .emailSignUp(signUpInfo)
      .then(() => {
        this.loading = false;
      })
      .catch((error) => {
        this.messageServ.emitErrorMessage(error.message);
      });
  }

  ngOnDestroy(): void {
    this.emailSubscription.unsubscribe();
    this.passwordSubscription.unsubscribe();
    this.firstNameSubscription.unsubscribe();
    this.lastNameSubscription.unsubscribe();
  }
}
