import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { StudentService } from '../../../core/services/student/student.service';
import { StudentDTO } from '../../../core/models/student.model';
import { NotificationService } from '../../../core/services/notification/notification.service';

@Component({
  selector: 'app-student-list',
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
  templateUrl: './student-list.html',
  styleUrl: './student-list.scss'
})
export class StudentList implements OnInit {

  students: StudentDTO[] = [];

  displayedColumns: string[] = [
    'studentId',
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
    private studentService: StudentService, private cdr: ChangeDetectorRef, private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadStudents();
  }

 loadStudents(): void {
  this.loading = true;

  this.studentService
    .getStudents(this.pageNumber, this.pageSize, this.searchTerm)
    .subscribe({
      next: (response) => {
  this.students = response.items;
  this.totalItems = response.totalItems;
  this.totalPages = response.totalPages;

  this.loading = false;
  this.cdr.detectChanges();
},

      error: (error) => {

        this.loading = false;
      }
    });
}

  onPageChange(event: PageEvent): void {

    this.pageNumber = event.pageIndex + 1;
    this.pageSize = event.pageSize;

    this.loadStudents();
  }

     searchStudents(): void {
  this.pageNumber = 1;
  this.loadStudents();
}

 clearSearch(): void {
  this.searchTerm = '';
  this.pageNumber = 1;
  this.loadStudents();
}

  deleteStudent(student: StudentDTO): void {

  const confirmed = confirm(
    `¿Está seguro de eliminar al estudiante "${student.name}"?`
  );

  if (!confirmed) {
    return;
  }

  this.studentService
    .deleteStudent(student.studentId)
    .subscribe({

      next: () => {
        this.notification.success(
          'Estudiante eliminado correctamente.'
        );
        this.loadStudents();

      },

      error: (error) => {
      console.error('Error eliminando estudiante:', error);

      const message =
        error.error?.Message ||
        'No se pudo eliminar el estudiante.';

      this.notification.error(message);
    }

    });
}
}