// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  /**
   * Do not add trailing slash, add slash during usage, instead
   * @example return this.httpClient.get<Array<IMovie>>(`${environment.apiUrl}/movies`)
   */
  apiUrl: 'https://607b2b11bd56a60017ba3708.mockapi.io/api',
  loginApiUrl: 'https://reqres.in/api/login'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
