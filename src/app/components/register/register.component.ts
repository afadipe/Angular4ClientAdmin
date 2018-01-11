import { Component, OnInit } from '@angular/core';

import {Router} from '@angular/router';
import { AuthService }  from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email:string;
  password:string;

  constructor(public router:Router,
    public flashMessagesService: FlashMessagesService,
    public authservice:AuthService) { }

  ngOnInit() {
  }


  onRegister(){
    this.authservice.register(this.email,this.password)
    .then(res=>{

      this.flashMessagesService.show('New user registered', { cssClass: 'alert-sucess', timeout: 4000 });
      this.router.navigate(['/']);

    })
    .catch((err)=>{
      this.flashMessagesService.show(err.messages, { cssClass: 'alert-danger', timeout: 4000 });
      this.router.navigate(['/register']);
    });
  }
}
