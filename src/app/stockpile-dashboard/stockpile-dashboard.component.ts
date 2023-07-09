import { Component} from '@angular/core';
import { User } from '../shared/user'; 
import { EmailService } from 'src/app/services/email.service';
import { StockpileItemEntry } from '../shared/stockpile-item-entry';

@Component({
  selector: 'app-stockpile-dashboard',
  templateUrl: './stockpile-dashboard.component.html',
  styleUrls: ['./stockpile-dashboard.component.css']
})
export class StockpileDashboardComponent {
  stockpileItemEntries: StockpileItemEntry[];
  currentUser: User | null;

  constructor(
    private emailService: EmailService
  ) {}


  checkItemsForEmail(itemEntries: StockpileItemEntry[]) {
    const today = new Date();

    itemEntries.forEach(entry => {
      const { product, bestBeforeDates } = entry;
      
      bestBeforeDates.forEach(entryDate => {
        const daysRemaining = Math.floor((entryDate.date.getTime() - today.getTime()) / (1000 * 3600 * 24));
  
        if (daysRemaining === 7) {
          const emailText = `Attention: Consume the item "${product.name}" within 7 days!`;
          const recipient = 'recipient@example.com'; // Geben Sie hier die tatsächliche E-Mail-Adresse des Empfängers an
          this.emailService.sendEmail('Attention: Consume Item', emailText, recipient);
        }
      });
    });
  }
}
