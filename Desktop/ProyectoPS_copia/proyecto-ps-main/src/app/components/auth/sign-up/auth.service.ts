import { Injectable, inject, OnInit } from "@angular/core";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,
  GoogleAuthProvider,signInWithPopup,sendEmailVerification,sendPasswordResetEmail} from "@angular/fire/auth";
import {User} from "./user.model";
import { Router } from "@angular/router";
import { error } from "@angular/compiler-cli/src/transformers/util";
import firebase from "firebase/compat";
import app = firebase.app;

@Injectable({
  providedIn:"root"
})

export class AuthService implements OnInit{
  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);
  router = inject(Router);
  login2 = false


  ngOnInit() {
    localStorage.setItem('isloogedIn', 'false');
  }

  getAuth(){

    return getAuth();
  }

  googlesignin(){

    signInWithPopup(getAuth(), new GoogleAuthProvider()).then(()=>{
      localStorage.setItem('isloogedIn','true');
      this.router.navigate([""])

      console.log("entraaste por google")
    }).catch()



  }
  enviarCorreo(){
    sendEmailVerification(getAuth().currentUser).then(()=> {
    console.log("correo enviado")
    })
  }



  signup(user:User){



    return createUserWithEmailAndPassword(getAuth(),user.email,user.password);


  }

  login(user:User){
    this.login2 = true

    return signInWithEmailAndPassword(getAuth(),user.email,user.password);

  }
  changestatus(){
    localStorage.setItem('isloogedIn', 'true')
  }
  /*
  login(user:User){


    try {

      signInWithEmailAndPassword(getAuth(),user.email,user.password);
      this.login2 = true

    }catch (error){
      this.login2 = false
    }
  }
  */
  getLogin(){
    return this.login2
  }

  signout(){
    this.login2 = false;
    console.log("estamos mas adentro");
    localStorage.setItem("isloogedIn","false")
    const valor = localStorage.getItem("isloogedIn")
    console.log(valor)
    return signOut(getAuth());
  }

  Forgotpassword(user:User){
    sendPasswordResetEmail(getAuth(),user.email).then(()=>{
      window.alert("password reset email send, check your inbox.")

    })
      .catch((error) =>{
        window.alert(error)
    })
  }

}
