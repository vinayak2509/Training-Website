import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    this.typeOutText();
  }
  private typeOutText(): void {
    const text = 'Hello! Welcome to my Website!';
    const h1Element = document.getElementById('typed-text')!;
    let index = 0;

    const typingInterval = setInterval(() => {
      if (index < text.length) {
        h1Element.textContent += text.charAt(index);
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);
  }
}
