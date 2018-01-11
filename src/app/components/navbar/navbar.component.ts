import { Component, OnInit } from '@angular/core';

import {Router} from '@angular/router';
import { AuthService }  from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import 'rxjs/add/operator/map';
import {SettingsService} from '../../services/settings.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn:boolean;
  loggedInUser:string;
  showRegister:boolean;
  constructor(public router:Router,
    public flashMessagesService: FlashMessagesService,
    public authservice:AuthService,
    public settingsservice : SettingsService) { }

  ngOnInit() {

    this.authservice.getAuth().subscribe(auth=>{
      if(auth){
        this.isLoggedIn= true;
        this.loggedInUser= auth.email;
      }else{

        this.isLoggedIn= false;
        this.loggedInUser= '';

      }

     this.showRegister= this.settingsservice.getSettings().allowRegistration;
    })
  }

  onLogOutClick(){
    this.authservice.logout();
    this.flashMessagesService.show('You are logged out', { cssClass: 'alert-success', timeout: 4000 });
    this.router.navigate(['/login']);
  }

}
