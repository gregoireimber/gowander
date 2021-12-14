// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  
  firebase: {
      apiKey: 'AIzaSyBRbVg7lrjZ_e8pLbMIXH8cEySqXBWN1wE',
      authDomain: 'gowander-1e179.firebaseapp.com',
      projectId: 'gowander-1e179',
      storageBucket: 'gowander-1e179.appspot.com',
      messagingSenderId: '196910161498',
      appId: '1:196910161498:web:a7b49ee2284c07a44ec263',
      measurementId: '${config.measurementId}',
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
