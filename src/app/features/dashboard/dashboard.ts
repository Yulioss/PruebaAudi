import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { DashboardService } from '../../core/services/dashboard/dashboard.service';
import { DashboardDTO } from '../../core/models/dashboard.model';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {

  dashboard: DashboardDTO | null = null;

  loading = false;
  errorMessage = '';

  constructor(
    private dashboardService: DashboardService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {

    this.loading = true;
    this.errorMessage = '';

    this.dashboardService.getDashboard().subscribe({
      next: (response) => {

        this.dashboard = response;
        this.loading = false;

        this.cdr.detectChanges();
      },

      error: (error) => {

        console.error(
          'Error cargando dashboard:',
          error
        );

        this.errorMessage =
          error.error?.message ??
          'No fue posible cargar el dashboard.';

        this.loading = false;

        this.cdr.detectChanges();
      }
    });
  }
}