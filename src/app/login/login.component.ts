import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
//import { User } from '../shared/user';
import { ToastrService } from 'ngx-toastr';
import { LoginCredentials } from '../shared/loginCredentials';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  formHatFehler: boolean = false;

  
  constructor (
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
    ){}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: [null,[ Validators.required]],
      password: [null, Validators.required]
    })
  }

  handleUsernameValueChange(event: any){
    this.form.get('username')?.setValue(event.target.value);        
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
      
      const userToLogIn: LoginCredentials = {
        username: this.form.get('username')?.value.toLowerCase(),
        password: this.form.get('password')?.value
      };
    
      console.log(userToLogIn)
      this.authService.login2(userToLogIn).subscribe(res => {
        //Anmeldung erfolgreich 
        this.router.navigate(['/landing']);

        this.authService.userLoggedIn.next(true);

        this.authService.currentUser = res;
        this.toastr.success('Sie wurden angemeldet!', 'Erfolg');

      }, error => {
        //Fehlermeldung
        this.toastr.error('Die E-Mail-Adresse oder das Passwort ist falsh!', 'Fehler');
      });
      
    }
  }

  handleRegisterClicked() {
    this.router.navigate(['/register'])
  }


}
