import { Component } from '@angular/core';
import { BasicUsageComponent } from './pages/basic-usage/basic-usage.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BasicUsageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
