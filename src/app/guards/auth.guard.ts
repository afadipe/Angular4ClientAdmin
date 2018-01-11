import { Injectable } from '@angular/core';
import { CanActivate,Router } from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth'; 
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/RX';


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(public afAuth: AngularFireAuth,
                public router:Router){

    }

    canActivate(): Observable<boolean> {
        return this.afAuth.authState.map(auth=>{
            if(!auth){
                this.router.navigate([ '/login' ]);
                return false;
            }else{

                return true;
            }
        });
    }

}