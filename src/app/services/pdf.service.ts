import { Injectable } from '@angular/core';
import { Invoice } from '../shared/invoice';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  createInvoicePDF(invoice: Invoice) {
    throw new Error('Method not implemented.');
  }

  constructor() { }
}
