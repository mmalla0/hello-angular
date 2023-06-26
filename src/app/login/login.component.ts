import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../shared/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  formHatFehler: boolean = false;

  constructor (private authService: AuthService, private fb: FormBuilder, private router: Router){}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [null,[ Validators.required, Validators.email]],
      password: [null, Validators.required]
    })
  }

  handleEmailValueChange(event: any){
    this.form.get('email')?.setValue(event.target.value);        
  }

  handlePasswordValueChange(event: any){
    this.form.get('password')?.setValue(event.target.value);
  }

  handleLogin(){
    if (!this.form.valid){
      this.formHatFehler = true;
      return;
    } else {
      this.formHatFehler = false;
      
      const userToLogIn: any = {
        email: this.form.get('email')?.value.toLowerCase(),
        password: this.form.get('password')?.value
      };
      this.authService.login(userToLogIn);
      
    }
  }

  handleRegisterClicked() {
    this.router.navigate(['/register'])
  }


}
