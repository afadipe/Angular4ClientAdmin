import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {RouterModule,Routes} from '@angular/router'; 
import {HttpModule} from '@angular/http';
import { HttpClientModule } from '@angular/common/http'
import { FlashMessagesModule } from 'angular2-flash-messages';
//angularfire imports
import {AngularFireModule} from 'angularfire2'; 
//import {AngularFireDatabase} from 'angularfire2/database'; 
import {AngularFireDatabase } from 'angularfire2/database-deprecated';
import {AngularFireAuth} from 'angularfire2/auth'; 

//componenet imports
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ClientdetailsComponent } from './components/clientdetails/clientdetails.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SettingsComponent } from './components/settings/settings.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

//Guard
import { AuthGuard } from './guards/auth.guard';
import { RegisterGuard } from './guards/register.guard';

//Service Imports
import  {ClientService} from './services/client.service';
import  {AuthService} from './services/auth.service';
import  {SettingsService} from './services/settings.service';


const appRoutes:Routes=[
  {path:'',component:DashboardComponent,canActivate:[AuthGuard]},
  {path:'register',component:RegisterComponent,canActivate:[RegisterGuard]},
  {path:'login',component:LoginComponent},
  {path:'client',component:ClientsComponent},
  {path:'add-client',component:AddClientComponent,canActivate:[AuthGuard]},  
  {path:'client/:id',component:ClientdetailsComponent,canActivate:[AuthGuard]} ,
  {path:'edit-client/:id',component:EditClientComponent,canActivate:[AuthGuard]} 
];
 
export const firebaseConfig={
  apiKey: "AIzaSyAX9gldyuhB4Zn3s_AoHrYt8_8IuicwDDA",
  authDomain: "clientpanel-d5de0.firebaseapp.com",
  databaseURL: "https://clientpanel-d5de0.firebaseio.com",
  projectId: "clientpanel-d5de0",
  storageBucket: "clientpanel-d5de0.appspot.com",
  messagingSenderId: "625248621053"
}


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ClientsComponent,
    ClientdetailsComponent,
    AddClientComponent,
    EditClientComponent,
    NavbarComponent,
    SidebarComponent,
    LoginComponent,
    RegisterComponent,
    SettingsComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(firebaseConfig),
    FlashMessagesModule.forRoot(),
  ],
  providers: [
    AngularFireAuth,
    AngularFireDatabase,
    ClientService,
    SettingsService,
    AuthService,
    AuthGuard,
    RegisterGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


