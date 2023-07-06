import { Injectable } from '@angular/core';
import { Invoice } from '../shared/invoice';
import { Observable } from 'rxjs';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Address } from '../shared/address';
import { User } from '../shared/user';

@Injectable({
  providedIn: 'root'
})
export class PdfService {


  createInvoicePDF(invoice: Invoice): Observable<Blob> {
    const documentDefinition = this.generateDocumentDefinition(invoice);
    const pdfDocGenerator = pdfMake.createPdf(documentDefinition);

    return new Observable<Blob>(observer => {
      pdfDocGenerator.getBlob((pdfData: Blob) => {
        observer.next(pdfData);
        observer.complete();
      });
    });
  }

  private generateDocumentDefinition(invoice: Invoice): pdfMake.TDocumentDefinitions {    
    //Erstellung des PDF-Dokuments unter Verwendung der pdfmake-API
    // Layout, Texte, Tabellen, Bilder ...

    const documentDefinition: pdfMake.TDocumentDefinitions = {
      content: [
        { text: 'Invoice', style: 'header' },
        { text: 'Invoice ID: ' + invoice.id, style: 'subheader' },
        { text: 'Date of Purchase: ' + this.formatDate(new Date()), style: 'subheader' },
        { text: this.formatAddress(invoice.address, invoice.user), style: 'subheader' },
        { text: ' ' }, // Leere Zeile für Abstand

        // Rechnungspositionen
        { text: 'Purchased Items:', style: 'subheader' },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto'],
            body: [
              ['Items', 'Price', 'Quantity', 'Total'],
              ...invoice.items.map(item => [item.name, item.price, item.quantity, (item.price * item.quantity).toFixed(2)])
            ]
          }
        },
        { text: ' ' }, // Leere Zeile für Abstand

        // Gesamtsummen
        { text: 'Total:', style: 'subheader' },
        {
          table: {
            widths: ['*', 'auto'],
            body: [
              ['Total (without VAT)', invoice.totalWithoutVat.toFixed(2)],
              ['VAT (20%)', (invoice.totalWithVat - invoice.totalWithoutVat).toFixed(2)],
              ['Total (incl. VAT)', invoice.totalWithVat.toFixed(2)]
            ]
          }
        },

        { text: ' ' }, // Leere Zeile für Abstand
        { text: 'Shopname: ' + invoice.shopName, style: 'subheader' }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 10, 0, 5]
        },
      }
    };

    return documentDefinition;
  }
  private formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('de-DE', options);
  }
  
  private formatAddress(address: Address, user: User): string {
    return `${user.firstName} ${user.lastName}\n${address.street}\n${address.postalCode} ${address.city} \n${address.planet}`;
  }

  constructor() {
    pdfMake.vfs = pdfFonts.pdfMake.vfs; // Importieren der benötigten Schriftarten für pdfmake
  }
}
