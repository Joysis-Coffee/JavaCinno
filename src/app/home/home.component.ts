import { Component, AfterViewInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements AfterViewInit {
  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.makeNavbarSticky();
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  makeNavbarSticky(): void {
    const header = document.querySelector('.header');
    if (header) {
      this.renderer.setStyle(header, 'position', 'sticky');
      this.renderer.setStyle(header, 'top', '0');
      this.renderer.setStyle(header, 'left', '0');
      this.renderer.setStyle(header, 'right', '0');
      this.renderer.setStyle(header, 'background', '#2f2721');
      this.renderer.setStyle(header, 'padding', '1rem 4rem');
      this.renderer.setStyle(header, 'display', 'flex');
      this.renderer.setStyle(header, 'align-items', 'center');
      this.renderer.setStyle(header, 'z-index', '1000');
    }
  }
}
