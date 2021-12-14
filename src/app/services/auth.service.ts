import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private fireAuth: AngularFireAuth) {}

  private _isLogin = true;

  public set isLogin(val: boolean) {
    this._isLogin = val;
  }

  public get isLogin(): boolean {
    return this._isLogin;
  }

  public async emailSignUp(email: string, password: string): Promise<void> {
    await this.fireAuth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log('here', email, password)
        // ...
        // maybe add the userid to the end of this url to make it so that you go to your own dashboard
        this.router.navigateByUrl('/dashboard');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('error you silly billy', error);
        // ..
      });
  }

  public async emailLogin(email: string, password: string): Promise<void> {
    await this.fireAuth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        this.router.navigateByUrl('/dashboard');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('error you silly billy', error);
      });
  }

  public async logout(): Promise<void> {
    await this.fireAuth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }
}

