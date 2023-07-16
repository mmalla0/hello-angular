import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class EmailService {
  constructor(private http: HttpClient) { }

  sendEmail(subject: string, text: string, recipient: string) {
    console.log(`Sending email with subject: ${subject}`);
    console.log(`Recipient: ${recipient}`);
    console.log(`Text: ${text}`);
    const emailData = {
      from: 'spacesaversshop@gmail.com',
      to:recipient,
      subject: subject,
      text: text,
    };
    const url = `/send-email`;
    return this.http.post<void>(url, emailData);
  }

  sendEmailWithAttachment(recipient: string, subject: string, text: string, pdfData: unknown): Observable<void> {
    const emailData = {
      from: 'spacesaversshop@gmail.com',
      to:recipient,
      subject: subject,
      text: text,
      attachment: [{
        filename: 'invoice.pdf',
        content: pdfData
      }]
    };
    const url = `/send-email`;
    return this.http.post<void>(url, emailData);
  }
  
}
