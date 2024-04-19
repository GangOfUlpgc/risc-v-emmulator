import { Routes } from '@angular/router';

import { WhoweareComponent } from './whoweare-page/whoweare.component';
import { LogInComponent } from "./components/auth/log-in/log-in.component";
import { SignUpComponent } from "./components/auth/sign-up/sign-up.component";
import { AppComponent } from "./home-page/app.component";
import { ForgotpasswordComponent } from "./components/auth/forgotpassword/forgotpassword.component";

export const routes: Routes = [



	{ path: 'whoweare', component: WhoweareComponent },

  {path:"login",component:LogInComponent},

  {path:"signup",component:SignUpComponent},

  {path:"forgotpassword", component:ForgotpasswordComponent}

];
