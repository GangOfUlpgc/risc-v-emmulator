import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../sign-up/auth.service";
import { User } from "../sign-up/user.model";

@Component({
  selector: 'app-forgotpassword',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.css'
})
export class ForgotpasswordComponent {

  firabase = inject(AuthService)

  constructor(private router:Router) {

  }

  form = new FormGroup({
    email: new FormControl("",[Validators.required,Validators.email]),


  })

  async submit(){

    try {
      this.firabase.Forgotpassword(this.form.value as User)
      console.log("correo enviado correctamente")
      setTimeout(() => {
        // Navegar a otra página después de 2 segundos
        this.router.navigate(["/login"])
      }, 2000); // 2000 milisegundos = 2 segundos


    }catch (error){
      console.log("Hubo un error en enviar correo")
    }


  }

}
