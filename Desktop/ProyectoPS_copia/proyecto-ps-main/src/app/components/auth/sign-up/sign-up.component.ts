import { Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { AuthService } from "./auth.service";
import { CommonModule } from "@angular/common";
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { User } from "./user.model";
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    RouterLink,CommonModule,ReactiveFormsModule,FormsModule

  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export  class SignUpComponent {

  firebaseService = inject(AuthService);

  constructor(private router:Router) {
  }

  form = new FormGroup({
    email: new FormControl("",[Validators.required,Validators.email]),
    password: new FormControl("",[Validators.required]),
    password1: new FormControl("",[Validators.required])
  })

  passwordlenght(valor:string):void{

    const passwordErrorDiv = document.getElementById("passwordreg-error")
    passwordErrorDiv.textContent = '';
    passwordErrorDiv.style.display = 'none';

    passwordErrorDiv.textContent = valor;
    passwordErrorDiv.style.display = 'block';

  }

  clean(){
    const passwordErrorDiv = document.getElementById("passwordreg-error")
    passwordErrorDiv.textContent = '';
    passwordErrorDiv.style.display = 'none';

  }
  emailBadly():void{

    const emailError = document.getElementById("email-error")

    emailError.textContent = '';
    emailError.style.display = 'none';

    emailError.textContent = "Correo invalido.";
    emailError.style.display = 'block';


  }

  emailerrorr() {
    const emailError = document.getElementById("email-error")

    emailError.textContent = '';
    emailError.style.display = 'none';
    const x = document.getElementById("email") as HTMLInputElement


    const pattern =  /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;
    const value = x.value;

    if (!pattern.test(value)){
      return false
    }else
      return true;


  }

  emailUsed(){
    const emailError = document.getElementById("email-error")
    emailError.textContent = '';
    emailError.style.display = 'none';

    emailError.textContent = "El correo ya esta en uso.";
    emailError.style.display = 'block';

  }

  googlesignin(){

    this.firebaseService.googlesignin();
  }

  passwordverification():string{

    const contrasena = this.form.get('password')!.value;
    const contrasena1 = this.form.get('password1')!.value;

    if(contrasena.length < 6){


      return "La contraseña es menor de 6 digitos"
    }
    const numero = /\d/.test(contrasena);
    const tieneSimbolo = /[!@#$%&*(),.?":{}|<>]/.test(contrasena);
    if(!numero || !tieneSimbolo){
        return "La contraseña debe tener un numero y algun simbolo $@&"
    }
    if(contrasena != contrasena1 ){
      return "Las contraseñas no coinciden"
    }


    return ""



  }

  async submit() {
    const x = this.passwordverification();
    if(this.emailerrorr()) {
      if(this.passwordverification() === "") {
        try {
          await this.firebaseService.signup(this.form.value as User);
          this.firebaseService.enviarCorreo()
          window.alert("Usuario logeado");
          this.router.navigate(["/login"])
          console.log("Éxito");
        } catch (error) {
          const x = error.code
          if (x == 'auth/email-already-in-use') {
            this.emailUsed();
          }

        }

      }else{
        this.passwordlenght(x);

      }

    }else{
      this.emailBadly();
      this.clean()
      if(x != "") {
        this.passwordlenght(x);
        console.log("toy aqui")
      }
    }
  }

  /*
  async submit() {
    if(this.emailerrorr()) {
      if (this.passwordlenght()) {
        if (this.coincidenClaves()) {
          if (this.form.valid) {
            try {
              await this.firebaseService.signup(this.form.value as User);
              this.firebaseService.enviarCorreo()
              this.router.navigate(["/login"])
              console.log("Éxito");
            } catch (error) {
              const x = error.code
              if (x == 'auth/invalid-email') {
                this.emailBadly();
              } else if (x == 'auth/email-already-in-use') {

                this.emailUsed();
              }


              // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje de error al usuario
            }
          }
        }
      }
    }else{
      this.emailBadly();
    }
  }
  */
}


