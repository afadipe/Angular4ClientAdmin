import { Component, OnInit } from '@angular/core';

import {Router,ActivatedRoute,Params} from '@angular/router';
import {Client}  from '../../models/client';
import {ClientService} from '../../services/client.service';
import { FlashMessagesService } from 'angular2-flash-messages';

import {SettingsService} from '../../services/settings.service';


@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {


  id:string;
  client:Client={
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
    balance:0
  }
  disableBalanceOnEdit:boolean=true;
  constructor(public router:Router,
    public route:ActivatedRoute,
    public clientService:ClientService,
    public flashMessagesService: FlashMessagesService,
    public settingsservice : SettingsService) { }

  ngOnInit() {

    this.id=this.route.snapshot.params['id'];
    //get the client details into the server
     this.clientService.getClient(this.id).subscribe(client=>{
         this.client=client;
         console.log(this.client);
     });

     this.disableBalanceOnEdit=this.settingsservice.getSettings().disableBalanceOnEdit;
  }

  onSubmit({value,valid}:{value:Client,valid:boolean}){
   
    if(!valid){

      console.log('Form not valid')
      this.flashMessagesService.show('Please fill in all fields!', { cssClass: 'alert-danger', timeout: 3000 });
      this.router.navigate(['edit-client/'+this.id]);

    }else{

      this.clientService.updateClient(this.id,value);
      this.flashMessagesService.show('Client was updated successfully!', { cssClass: 'alert-success', timeout: 3000 });
      this.router.navigate(['/client/'+ this.id]);

    }
   
     
  }

}
