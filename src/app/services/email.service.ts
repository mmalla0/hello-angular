import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  apiUrl = 'http://localhost:8080'; // Set the URL of your server.js API

  constructor(private http: HttpClient) {}

  sendEmailWithAttachment(recipient: string, subject: string, body: string, pdfData: unknown): Observable<void> {
    const emailData = {
      recipient,
      subject,
      body,
      attachment: pdfData
    };
    const url = `${this.apiUrl}/sendEmail`;
    return this.http.post<void>(url, emailData);
  }
}
