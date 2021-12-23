import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private router: Router,
    private fireAuth: AngularFireAuth,
    private db: AngularFirestore
  ) {}

  public isLoggedIn = false;
  private _userId: string | undefined = '';

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
  public getUserId(): string | undefined {
    return this._userId;
  }

  public async getUserInformation(userId: string | undefined): Promise<any> {
    try {
      if (userId) {
        const snapshot = await this.db.collection('users').doc(userId).get().toPromise();
        return snapshot.data();
      } else {
        throw 'No logged in user found.'
      }
    } catch (err) {
      // Maybe could add an error using a messaging service to tell the user
      console.error(err);
    }
  }

  public async emailSignUp(signUpInfo: any): Promise<void> {
    await this.fireAuth
      .createUserWithEmailAndPassword(signUpInfo.email, signUpInfo.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        if (user!.uid !== null) {
          this.isLoggedIn = true;
          this._userId = user!.uid;

          this.db.collection('users').doc(this._userId).set({
            firstName: signUpInfo.firstName,
            lastName: signUpInfo.lastName,
            email: signUpInfo.email,
            password: signUpInfo.password,
          });
        } else {
          // Emit an error message using a message service
        }

        this.router.navigateByUrl('/dashboard');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  public async emailLogin(email: string, password: string): Promise<void> {
    await this.fireAuth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        this.isLoggedIn = true;
        this._userId = user!.uid;

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
