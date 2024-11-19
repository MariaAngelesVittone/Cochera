import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { DataAuthService } from '../../services/data-auth.service';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  errorRegister = false;
  authService = inject(DataAuthService)
  router = inject(Router)

  async register(registerForm: NgForm){
    const {username, nombre, apellido, password} = registerForm.value;
    const registerData = {username, nombre, apellido, password};
    
    const res = await this.authService.register(registerData)

    if(res?.statusText === "Created") {
      this.router.navigate(['/login']).then(() => {
        Swal.fire("Registro exitoso", "", "success");
      })
    } else this.errorRegister = true;
  }
}