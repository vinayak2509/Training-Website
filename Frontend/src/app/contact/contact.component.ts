import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  @Input({ required: true }) userId!: string;
  @Output() close = new EventEmitter<void>();

  enteredName = '';
  enteredEmail = '';
  enteredMessage = '';

  constructor(private contactService: ContactService) {}

  onSubmit() {
    if (this.enteredName && this.enteredEmail && this.enteredMessage) {
      const messageData = {
        name: this.enteredName,
        email: this.enteredEmail,
        message: this.enteredMessage,
      };

      this.contactService.addMessageToServer(messageData).subscribe(
        (response) => {
          console.log('Message sent successfully:', response);
          window.location.href = '/thanks';
          this.close.emit();
        },
        (error) => {
          console.error('Error sending message:', error);
        }
      );
    }
  }
}
