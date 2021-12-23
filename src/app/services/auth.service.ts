import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MessagingService } from './messaging.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isLoggedIn = false;
  private _userId: string | undefined = '';

  constructor(
    private router: Router,
    private fireAuth: AngularFireAuth,
    private db: AngularFirestore,
    private messageServ: MessagingService
  ) {}


  // Is the component in Log In mode or Sign Up mode
  public get isLogin(): boolean {
    if (this.router.url === '/login') {
      return true;
    } else if (this.router.url === '/signup') {
      return false;
    }
    // default to return true
    return true;
  }

  // Return the logged in userId
  public getUserId(): string | undefined {
    return this._userId;
  }

  // Return the information of the logged in user
  public async getUserInformation(userId: string | undefined): Promise<any> {
    try {
      if (userId) {
        const snapshot = await this.db.collection('users').doc(userId).get().toPromise();
        return snapshot.data();
      } else {
        throw 'No logged in user found.'
      }
    } catch (err) {
      this.messageServ.emitErrorMessage('Error while getting user data.')
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
          this.messageServ.emitErrorMessage('Error while signing up.')
        }

        this.router.navigateByUrl('/dashboard');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        this.messageServ.emitErrorMessage('Error while signing up.');
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
        this.messageServ.emitSuccessMessage('Log In Successful.');
        this.router.navigateByUrl('/dashboard');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        this.messageServ.emitErrorMessage('Error while logging in.');
      });
  }

  public async logout(): Promise<void> {
    await this.fireAuth.signOut().then(() => {
      this.router.navigate(['/home']);
    });
    this.messageServ.emitSuccessMessage('Log out successful.')
    this.isLoggedIn = false;
  }
}

