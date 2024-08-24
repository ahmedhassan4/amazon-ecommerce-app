import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth/auth.service";


export const AuthGuard : CanActivateFn = (route,state) => {
    const authServ= inject(AuthService);
    const router = inject(Router);
    if(authServ.isLogged){ 
        return true
    }else{ 
        router.navigateByUrl("/login")
        return false
    }
}


export const LoggedGuard : CanActivateFn = (route , state) => { 
    const authServ= inject(AuthService)
    const router =inject(Router)
    if(authServ.isLogged) {
        router.navigateByUrl('/') 
        return false 
    }else { 
        return true
    }
}