import { Injectable } from '@angular/core';
// for database
//import { AngularFireDatabase,AngularFireList,AngularFireObject } from 'angularfire2/database';
// for Observables
//FirebaseListObservable and FirebaseObjectObservable are now called AngularFireList and AngularFireObject
import {AngularFireDatabase,FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import {Observable} from 'rxjs';
import {Client} from '../models/Client';
import { HttpModule } from '@angular/http';

 
@Injectable()
export class ClientService {

  clients:FirebaseListObservable<any[]>;
  client:FirebaseObjectObservable<any>;
  constructor(public af: AngularFireDatabase) { 

    this.clients= this.af.list('/clients') as FirebaseListObservable<Client[]>;
  }

  getClients(){

    //return this.af.list('/clients').valueChanges();
    return this.clients;
  }

  newClient(client :Client){
    this.clients.push(client);
  }

  getClient(id:string){

    this.client = this.af.object('/clients/'+id) as FirebaseObjectObservable<Client>;
    return this.client;
  }

  updateClient(id:string,client:Client){

    return this.clients.update(id,client);
  }

  deleteClient(id:string)
  {
    return this.clients.remove(id);
  }

}
