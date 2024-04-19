import { Component, inject } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { User } from "../sign-up/user.model";
import { AuthService } from "../sign-up/auth.service";


@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule
  ],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {

  firebaseService = inject(AuthService);
  login1 = false;
  constructor(private router:Router) {

  }

  form = new FormGroup({
    email: new FormControl("",[Validators.required,Validators.email]),
    password: new FormControl("",[Validators.required]),

  })

  errorPassword(){
    const emailError = document.getElementById("passwordreg-error")
    emailError.textContent = '';
    emailError.style.display = 'none';

    emailError.textContent = "Correo electrónico o contraseña incorrectos";
    emailError.style.display = 'block';
}


  async submit() {

          try {
            await this.firebaseService.login(this.form.value as User);
            this.firebaseService.changestatus();
            this.router.navigate([""])
            this.login1 = true;
            console.log("Éxito");
          } catch (error) {
            const x = error.code
            if(x  == 'auth/invalid-credential'){
              this.errorPassword();
              console.error("CLAVE INVALIDA");
            }else {
              console.error("el error es:" + x);
            }
          }


  }


}
