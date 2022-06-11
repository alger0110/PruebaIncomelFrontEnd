// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API_URL: 'https://localhost:44313/api',
  ClaimRole: 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role',
  ClaimUserData:
    'http://schemas.microsoft.com/ws/2008/06/identity/claims/userdata',
  ClaimEmailAddress:
    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress',
  ClaimName: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name',
  ClaimLastName:
    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname',
  ClaimId: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
