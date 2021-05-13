import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private router: Router) { }

    private isLoggedIn(): boolean {
        const storedUserDataAsString: string | null = localStorage.getItem(environment.loggedInUserLocalStorageKey);
        const storedUserDataAsObject: { token?: string } | null = storedUserDataAsString && JSON.parse(storedUserDataAsString);
        if (!storedUserDataAsObject?.token) {
            this.router.navigateByUrl('/login');
        }
        return !!storedUserDataAsObject?.token;
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        return this.isLoggedIn();
    }

    canActivateChild(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        return this.isLoggedIn();
    }
}
