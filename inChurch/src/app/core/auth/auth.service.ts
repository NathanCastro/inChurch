import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(){}

    public login(email: string, password:string): boolean {
        if(email === 'admin@admin.com.br' && password === '13579'){
            const token = 'fake0987'
            localStorage.setItem('userToken', token)
            return true
        }
        return false
    }

    public isAuthenticated(): boolean {
        return !!localStorage.getItem('userToken')
    }

    public logout(): void {
        localStorage.removeItem('userToken');
    }
}