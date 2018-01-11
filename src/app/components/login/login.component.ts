import { Component, OnInit } from '@angular/core';

import {Router} from '@angular/router';
import { AuthService }  from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:string;
  password:string;
  constructor(public router:Router,
    public flashMessagesService: FlashMessagesService,
    public authservice:AuthService) { }

  ngOnInit() {
  }

  onSubmit(){

    this.authservice.login(this.email,this.password)
    .then(res=>{

      this.flashMessagesService.show('You are logged in', { cssClass: 'alert-sucess', timeout: 4000 });
      this.router.navigate(['/']);

    })
    .catch((err)=>{
      this.flashMessagesService.show(err.messages, { cssClass: 'alert-danger', timeout: 4000 });
      this.router.navigate(['/login']);
    });

  }

}
