import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AddressService } from '../services/address-service/address.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  formHatFehler = false;

  address = {
    customer_id: null,
    street_name: '',
    street_number: null,
    city: '',
    zip_code: null,
    country: '',
    planet: '',
  };

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private addressService : AddressService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: [null, Validators.required],
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      methodofpayment: [null, Validators.required],
      streetName: [null, Validators.required],
      streetNumber: [null, Validators.required],
      city: [null, Validators.required],
      zipCode: [null, Validators.required],
      country: [null, Validators.required],
      planet: [null, Validators.required],
    });
  }

  handleUserNameValueChange(event: any) {
    this.form.get('username')?.setValue(event.target.value);
  }
  handleFirstNameValueChange(event: any) {
    this.form.get('firstname')?.setValue(event.target.value);
  }
  handleLastNameValueChange(event: any) {
    this.form.get('lastname')?.setValue(event.target.value);
  }

  handleEmailValueChange(event: any) {
    this.form.get('email')?.setValue(event.target.value);
  }

  handlePasswordValueChange(event: any) {
    this.form.get('password')?.setValue(event.target.value);
  }

  handleZahlungsmethodeValueChange(event: any) {
    this.form.get('methodofpayment')?.setValue(event.target.value);
  }

  handleValueChange(property: string, event: any) {
    this.form.get(property)?.setValue(event.target.value);
  }

  handleLoginClicked() {
    this.router.navigate(['/login']);
  }

  handleRegister() {
    if (!this.form.valid) {
      this.formHatFehler = true;
    } else {
      this.formHatFehler = false;

      //so war es in Main
      const userToRegister: any = {
        username: this.form.get('username')?.value,
        first_name: this.form.get('firstname')?.value,
        last_name: this.form.get('lastname')?.value,
        email: this.form.get('email')?.value.toLowerCase(),
        password: this.form.get('password')?.value,
        paymentMethod: this.form.get('methodofpayment')?.value,
      };

      /* const userToRegister: User = {
        //name: this.form.get('name')?.value,
        email: this.form.get('email')?.value.toLowerCase(),
        password: this.form.get('password')?.value,
        id: null,
        firstName: '',                                  //TODO: Werte aus der Form holen
        lastName: '',
        addressId: 0,
        methodOfPayment: '',
        cartId: 0,
        stockpileId: 0
      } */
      this.authService.register2(userToRegister).subscribe(
        (res) => {
          this.toastr.success('You have been successfully registed!', 'Success');
          this.address.customer_id = res.id;
          this.addAddressToCustomer();
          this.router.navigate(['/login']);

          this.router.navigate(['/']);
        },
        (error) => {
          console.log(error);
          this.toastr.error('register failed!', 'Error');
        }
      );
    }
  }

  addAddressToCustomer() {
    this.address.city = this.form.get('city')?.value;
    this.address.country = this.form.get('country')?.value;
    this.address.planet = this.form.get('planet')?.value;
    this.address.street_name = this.form.get('streetName')?.value;
    this.address.street_number = +this.form.get('streetNumber')?.value;
    this.address.zip_code = +this.form.get('zipCode')?.value;

    this.addressService.addAddressToCustomer(this.address).subscribe((res) => {
      this.updateCustomerAddress(this.address.customer_id, res.id);
      console.log(res);
    });
  }

  updateCustomerAddress(customerId: number, newAddressId: number) {
    this.addressService
      .updateCustomerAdress(customerId, newAddressId)
      .subscribe((res) => {
        console.log(res);
      });
  }
}
