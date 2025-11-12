import { Component, inject } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [
    MatGridListModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  public service1Response: any;
  public service2Response: any;
  public httpClient = inject(HttpClient);
  private readonly apiUrl = 'http://localhost/api/';
  private subscription!: Subscription;

  callService1() {
    this.subscription?.unsubscribe();
    this.subscription = this.httpClient
      .get(`${this.apiUrl}service1/${crypto.randomUUID()}`)
      .subscribe({
        next: (data) => {
          this.service1Response = data;
        },
        error: (error) => {
          this.service1Response = `Error: ${error.message}`;
        },
      });
  }

  callService2() {
    this.subscription?.unsubscribe();
    this.subscription = this.httpClient
      .get(`${this.apiUrl}service2/${crypto.randomUUID()}`)
      .subscribe({
        next: (data) => {
          this.service2Response = data;
        },
        error: (error) => {
          this.service2Response = `Error: ${error.message}`;
        },
      });
  }
}
