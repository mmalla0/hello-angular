import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginCredentials } from '../shared/loginCredentials';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  formEmployee!: FormGroup;

  formHatFehler: boolean = false;
  isEmployee: boolean = true;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, Validators.required],
    });

    this.formEmployee = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    });
  }

  handleUsernameValueChange(event: any) {
    this.form.get('username')?.setValue(event.target.value);
  }

  handleEmailValueChange(event: any) {
    this.formEmployee.get('email')?.setValue(event.target.value);
  }

  handlePasswordValueChange(event: any) {
    this.form.get('password')?.setValue(event.target.value);
    this.formEmployee.get('password')?.setValue(event.target.value);
  }

  handleUserTypeValueChange(event: any) {
    this.isEmployee = this.stringToBoolean(event.target.value);
    console.log(this.isEmployee);
  }

  stringToBoolean(value: string): boolean {
    return value === 'true';
  }

  handleLogin() {
    if (this.isEmployee) {
      if (!this.formEmployee.valid) {
        this.formHatFehler = true;
        return;
      } else {
        const employeeToLogIn: any = {
          email: this.formEmployee.get('email')?.value.toLowerCase(),
          password: this.formEmployee.get('password')?.value,
        };

        this.authService.loginEmployee(employeeToLogIn).subscribe(
          (res) => {
            //Anmeldung erfolgreich
            this.router.navigate(['/landing']);
            this.authService.userLoggedIn.next(true);
            this.authService.currentUser = res;
            this.toastr.success('Logged in', 'Success');
            this.authService.userType = 'employee';
          },
          (error) => {
            //Fehlermeldung
            this.toastr.error(
              'Email or password is wrong!',
              'Error'
            );
          }
        );
      }
    } else {
      if (!this.form.valid) {
        this.formHatFehler = true;
        return;
      } else {
        this.formHatFehler = false;

        const userToLogIn: LoginCredentials = {
          username: this.form.get('username')?.value.toLowerCase(),
          password: this.form.get('password')?.value,
        };

        this.authService.loginCustomer(userToLogIn).subscribe(
          (res) => {
            //Anmeldung erfolgreich
            this.router.navigate(['/landing']);
            this.authService.userLoggedIn.next(true);
            this.authService.currentUser = res;
            this.toastr.success('Logged in', 'Success');
            this.authService.userType = 'customer';
          },
          (error) => {
            //Fehlermeldung
            this.toastr.error(
              'Email or password is wrong!',
              'Error'
            );
          }
        );
      }
    }
  }

  handleRegisterClicked() {
    this.router.navigate(['/register'])
  }
}
