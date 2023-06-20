import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  sendEmailWithAttachment(arg0: string, arg1: string, arg2: string, pdfData: any) {
    throw new Error('Method not implemented.');
  }

  constructor() { }
}
