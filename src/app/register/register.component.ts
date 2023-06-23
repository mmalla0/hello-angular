import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, UserModel } from '../services/auth-service/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form!: FormGroup;
  formHatFehler: boolean = false;

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      zahlungsmethode: [null, Validators.required]
    })
  }

  handleNameValueChange(event: any) {
    this.form.get('name')?.setValue(event.target.value);
  }

  handleEmailValueChange(event: any) {
    this.form.get('email')?.setValue(event.target.value);
  }

  handlePasswordValueChange(event: any) {
    this.form.get('password')?.setValue(event.target.value);
  }

  handleZahlungsmethodeValueChange(event: any){
    console.log(event.target.value, '>==== zahlung');
    
    this.form.get('zahlungsmethode')?.setValue(event.target.value);
  }

  handleLoginClicked() {
    this.router.navigate(['/'])
  }

  handleRegister() {
    console.log(this.form.valid);
    
    if (!this.form.valid) {
      this.formHatFehler = true;
    } else {
      this.formHatFehler = false;
      const userToRegister: UserModel = {
        name: this.form.get('name')?.value,
        email: this.form.get('email')?.value.toLowerCase(),
        password: this.form.get('password')?.value,
        zahlungsmethode: this.form.get('zahlungsmethode')?.value
      }
      this.authService.register(userToRegister);
      this.router.navigate(['/']);
    }
  }


}
