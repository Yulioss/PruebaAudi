import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import {
  MatPaginatorModule,
  PageEvent
} from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NotificationService } from '../../../core/services/notification/notification.service';
import { TeacherService } from '../../../core/services/teacher/teacher.service';
import { TeacherDTO } from '../../../core/models/teacher.model';

@Component({
  selector: 'app-teacher-list',
  imports: [
    RouterLink,
    FormsModule,

    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTooltipModule
  ],
  templateUrl: './teacher-list.html',
  styleUrl: './teacher-list.scss'
})
export class TeacherList implements OnInit {

  teachers: TeacherDTO[] = [];

  displayedColumns: string[] = [
    'teacherId',
    'name',
    'actions'
  ];

  pageNumber = 1;
  pageSize = 10;

  totalItems = 0;
  totalPages = 0;

  loading = false;

  searchTerm = '';

  constructor(
    private teacherService: TeacherService,
    private cdr: ChangeDetectorRef,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadTeachers();
  }

  loadTeachers(): void {

    this.loading = true;

    this.teacherService
      .getTeachers(this.pageNumber, this.pageSize, this.searchTerm)
      .subscribe({

        next: (response) => {

          this.teachers = response.items;
          this.totalItems = response.totalItems;
          this.totalPages = response.totalPages;

          this.loading = false;

          this.cdr.detectChanges();
        },

        error: (error) => {

          console.error(
            'Error cargando profesores:',
            error
          );

          this.loading = false;

          this.cdr.detectChanges();
        }

      });
  }

  onPageChange(event: PageEvent): void {

    this.pageNumber = event.pageIndex + 1;
    this.pageSize = event.pageSize;

    this.loadTeachers();
  }

     searchTeachers(): void {
  this.pageNumber = 1;
  this.loadTeachers();
}

 clearSearch(): void {
  this.searchTerm = '';
  this.pageNumber = 1;
  this.loadTeachers();
}

  deleteTeacher(teacher: TeacherDTO): void {

    const confirmed = confirm(
      `¿Está seguro de eliminar al profesor "${teacher.name}"?`
    );

    if (!confirmed) {
      return;
    }

    this.teacherService
      .deleteTeacher(teacher.teacherId)
      .subscribe({

        next: () => {
          this.notification.success(
          'Profesor eliminado correctamente.'
        );
          this.loadTeachers();
        },

        error: (error) => {

          console.error(
            'Error eliminando profesor:',
            error
          );

        }

      });
  }
}