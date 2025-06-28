import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Play Area Management';
  activeTab = 'customers'; // Default to customers tab

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
}