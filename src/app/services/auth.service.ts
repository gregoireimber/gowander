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
  private tokenExpiresIn: number = 3.6e6;
  private tokenExpirationTimer: any;

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
        const snapshot = await this.db
          .collection('users')
          .doc(userId)
          .get()
          .toPromise();
        return snapshot.data();
      } else {
        throw 'No logged in user found.';
      }
    } catch (err) {
      this.messageServ.emitErrorMessage('Error while getting user data.');
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
            username: signUpInfo.username,
            trips: [],
            friends: [],
            incomingFR: [],
            outgoingFR: [],
          });

          const fireAuthToken = user?.getIdToken();

          // Add to local storage
          this.handleAuthentication(
            signUpInfo.email,
            this._userId,
            fireAuthToken,
            this.tokenExpiresIn
          );
        } else {
          this.messageServ.emitErrorMessage('Error while signing up.');
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
        this._userId = user!.uid;

        const fireAuthToken = user?.getIdToken();

        // Add to local storage
        this.handleAuthentication(
          email,
          this._userId,
          fireAuthToken,
          this.tokenExpiresIn
        );

        this.isLoggedIn = true;
        this.messageServ.emitSuccessMessage('Log In Successful.');
        this.router.navigateByUrl('/dashboard');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        this.messageServ.emitErrorMessage('Error while logging in.');
      });
  }

  public async logOut(): Promise<void> {
    await this.fireAuth.signOut().then(() => {
      this.router.navigate(['/home']);
    });

    // Clear the local storage
    localStorage.removeItem('userData');
    localStorage.removeItem('userTrips');

    // Clear the token expiration timer when you logout
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.messageServ.emitSuccessMessage('Log out successful.');
    this.isLoggedIn = false;
  }

  private async handleAuthentication(
    email: string,
    userID: string,
    token: any,
    expiresIn: number
  ) {
    // Make an expiration date which is the current date + the number of seconds in which the ID token expires (milliseconds) - then this itself gets converted into a new date (timestamp)
    const expirationDate = new Date(new Date().getTime() + expiresIn);

    const fireAuthToken = await token.then((result: any) => {
      return result;
    });

    this.autoLogout(expiresIn);

    // Store in the local storage
    localStorage.setItem(
      'userData',
      JSON.stringify({
        email: email,
        userId: userID,
        token: fireAuthToken,
        tokenExpiration: expirationDate,
      })
    );
  }

  public autoLogin(): void {
    // Look into storage and see if there is a user stored
    // Need to convert the string back to a javascript object

    const localStorageUser = localStorage.getItem('userData');
    let userData: {
      email: string;
      userId: string;
      token: any;
      tokenExpiration: Date;
    } = { email: '', userId: '', token: '', tokenExpiration: new Date() };

    if (localStorageUser) {
      userData = JSON.parse(localStorageUser);
    }

    if (!userData) {
      return; // need to sign in manually
    }

    if (userData.token && userData.userId) {
      this._userId = userData.userId;
      this.isLoggedIn = true;
      // Set the timer up once logged in
      const expirationDuration =
        new Date(userData.tokenExpiration).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  private autoLogout(expirationDuration: number) {
    // Set a timer to log user out once the token expires
    this.tokenExpirationTimer = setTimeout(() => {
      this.logOut();
    }, expirationDuration);
  }

  public async isValidUsername(username: string) {
    return this.db.collection<any>('users', (ref) => {
      return ref.where('username', '==', username)
    })
    .valueChanges()
  }
}
