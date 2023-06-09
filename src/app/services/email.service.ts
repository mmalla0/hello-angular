import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  sendEmail(subject: string, body: string, recipient: string) {
    console.log(`Sending email with subject: ${subject}`);
    console.log(`Recipient: ${recipient}`);
    console.log(`Body: ${body}`);
  }

  constructor(private http: HttpClient) {}

  sendEmailWithAttachment(recipient: string, subject: string, body: string, pdfData: unknown): Observable<void> {
    const emailData = {
      recipient,
      subject,
      body,
      attachment: pdfData
    };
    const url = `/sendEmail`;
    return this.http.post<void>(url, emailData);
  }
}
