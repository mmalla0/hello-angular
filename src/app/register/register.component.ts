import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../shared/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form!: FormGroup;
  formHatFehler = false;

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
    this.form.get('zahlungsmethode')?.setValue(event.target.value);
  }

  handleLoginClicked() {
    this.router.navigate(['/login'])
  }

  handleRegister() {
        
    if (!this.form.valid) {
      this.formHatFehler = true;
    } else {
      this.formHatFehler = false;

      /*  so war es in Main
      const userToRegister: any = {
        name: this.form.get('name')?.value,
        email: this.form.get('email')?.value.toLowerCase(),
        password: this.form.get('password')?.value,
        zahlungsmethode: this.form.get('zahlungsmethode')?.value*/             

      const userToRegister: User = {
        //name: this.form.get('name')?.value,
        email: this.form.get('email')?.value.toLowerCase(),
        password: this.form.get('password')?.value,
        id: 0,
        firstName: '',                                  //TODO: Werte aus der Form holen
        lastName: '',
        addressId: 0,
        methodOfPayment: '',
        cartId: 0,
        stockpileId: 0
      }
      this.authService.register(userToRegister);

      this.router.navigate(['/login']);

      this.router.navigate(['/']);

    }
  }


}


