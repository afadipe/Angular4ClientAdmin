import { Component, OnInit } from '@angular/core';
import { ClientService } from  '../../services/client.service'; 
import {Client} from '../../models/client';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients:any[];
  totalOwed:number;
  constructor(public clientservice : ClientService) {}

  ngOnInit() {
     this.clientservice.getClients().subscribe(clients => {
      this.clients = clients;
      console.log(this.clients);
      this.getTotalOwed();
    });
  }

  getTotalOwed()
  {
    let total: number=0;
    for(let i=0;i<this.clients.length;i++)
    {
      console.log('Amount' + this.clients[i].balance);
      total += parseFloat(this.clients[i].balance);
    }
    this.totalOwed=total;
    console.log(this.totalOwed);
  }

}
