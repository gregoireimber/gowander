import { Component, OnInit } from '@angular/core';

import { firebase, firebaseui, FirebaseUIModule } from 'firebaseui-angular';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private fbService: FirebaseService) {}

  ngOnInit(): void {
    this.fbService.initializeFirebase().then(() => {
      var ui = new firebaseui.auth.AuthUI(firebase.auth());

      ui.start('#firebaseui-auth-container', {
        signInOptions: [
          {
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
            requireDisplayName: false,
          },
        ],
      });
      
      var uiConfig = {
        callbacks: {
          signInSuccessWithAuthResult: function (
            authResult: any,
            redirectUrl: any
          ) {
            console.log(authResult, redirectUrl);
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            return true;
          },
          uiShown: function () {
            // The widget is rendered.
            // Hide the loader.
            document.getElementById('loader')!.style.display = 'none';
          },
        },
        // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
        signInFlow: 'popup',
        signInSuccessUrl: '<url-to-redirect-to-on-success>',
        signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
        // Terms of service url.
        tosUrl: '<your-tos-url>',
        // Privacy policy url.
        privacyPolicyUrl: '<your-privacy-policy-url>',
      };
    });
  }
}
