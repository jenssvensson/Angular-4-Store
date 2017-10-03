import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
  constructor() { }

  login(username: string, password: string) {

    let user = {
        id: 42,
        username: 'Jens',
        firstName: 'Jens',
        lastName: 'Svensson',
        token: 'fake-jwt-token'
    };

    if (username == 'jens') {
      localStorage.setItem('currentUser', JSON.stringify(user));
      return Promise.resolve(user);
    } else {
      return Promise.reject('debug');
    }
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}