import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private fireAuth: AngularFireAuth) {}

  public isLoggedIn = false;
  private _user = null;

  public get isLogin(): boolean {
    if (this.router.url === '/login') {
      return true;
    } else if (this.router.url === '/signup') {
      return false;
    }
    // default to return true
    return true;
  }

  // Type this later when I knpw what the return type of user is
  public getUser(): any {
    return this._user;
  }

  public async emailSignUp(email: string, password: string): Promise<void> {
    await this.fireAuth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log('here', email, password, this._user)
        this.isLoggedIn = true;
        // ...
        // maybe add the userid to the end of this url to make it so that you go to your own dashboard
        this.router.navigateByUrl('/dashboard');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }

  public async emailLogin(email: string, password: string): Promise<void> {
    await this.fireAuth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        this.isLoggedIn = true;
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

// export interface User {
//   userId: string;
//   name: string;
// }
