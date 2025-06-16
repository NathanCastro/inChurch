import { Routes } from "@angular/router";
import { LoginComponent } from "./container/login/login.component";
import { authGuard } from "./core/auth/guards/auth.guard";
import { LayoutMainComponent } from "./layout/layout-main/layout-main.component";

export const routes: Routes = [
    {
        path:"",
        pathMatch: "full",
        redirectTo: "login"
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'home',
        canActivate: [authGuard],
        component: LayoutMainComponent
    }
];
