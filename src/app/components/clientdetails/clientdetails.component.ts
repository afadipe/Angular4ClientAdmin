import { Component, OnInit } from '@angular/core';


import {Router,ActivatedRoute,Params} from '@angular/router';

import {Client}  from '../../models/client';
import {ClientService} from '../../services/client.service';


import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-clientdetails',
  templateUrl: './clientdetails.component.html',
  styleUrls: ['./clientdetails.component.css']
})
export class ClientdetailsComponent implements OnInit {

  id:string;
  client:Client;
  hasBalance:boolean;
  showBalanceUpdateInput:boolean=false;

  constructor( public router:Router,
    public route:ActivatedRoute,
    public clientService:ClientService,
    public flashMessagesService: FlashMessagesService) {

          
     }

  ngOnInit() {
    //Get ID
    this.id=this.route.snapshot.params['id'];
    //get the client details into the server

     this.clientService.getClient(this.id).subscribe(client=>{

        if(client.balance>0){
          this.hasBalance=true;
        }
         this.client=client;
         console.log(this.client);
     });
  }


  onDeleteClick(){
    if(confirm("Are you sure to delete?")){

      this.clientService.deleteClient(this.id);
      this.flashMessagesService.show('Client deleted!', { cssClass: 'alert-success', timeout: 3000 });
      this.router.navigate(['/']);

    }
  }

  updateBalance(id:string){

    this.clientService.updateClient(this.id,this.client);

    this.flashMessagesService.show('Balance updated!', { cssClass: 'alert-success', timeout: 3000 });
    this.router.navigate(['/client/'+this.id]);
  }

}
