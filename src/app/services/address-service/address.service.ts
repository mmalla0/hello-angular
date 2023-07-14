import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Address } from '../../shared/address';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient, private router: Router) { }

  updateCustomerAdress(customerId: number, data) { 
    console.log("Diese CustomerId wird der Methode updateCustomer übergeben: ", customerId);
    console.log("diese address_id soll der customer-Tabelle übergeben werden: ", data.address_id)
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let options = { headers: headers };
    return this.http.put<any>(
      'http://localhost:8080/customer/' + customerId + '/address',
      { address_id: data },
      options
    );
  }

  private getAddressURL = 'getAddress';
  getAddressById(id: number): Observable<Address> {
    const url = `${this.getAddressURL}/${id}`;
    return this.http.get<Address>(url);
  }
}
