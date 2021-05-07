export const environment = {
  production: true,
  /**
   * Do not add trailing slash, add slash during usage, instead
   * @example return this.httpClient.get<Array<IMovie>>(`${environment.apiUrl}/movies`)
   */
  apiUrl: 'https://607b2b11bd56a60017ba3708.mockapi.io/api',
  loginApiUrl: 'https://reqres.in/api/login',
  loggedInUserLocalStorageKey: 'internshipProjectLoggedInUserData'
};
