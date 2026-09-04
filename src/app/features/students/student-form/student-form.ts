import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { StudentService } from '../../../core/services/student/student.service';

@Component({
  selector: 'app-student-form',
  imports: [FormsModule],
  templateUrl: './student-form.html',
  styleUrl: './student-form.scss'
})
export class StudentForm {

  name = '';
  loading = false;
  errorMessage = '';

  constructor(
    private studentService: StudentService,
    private router: Router
  ) {}

  save(): void {

    if (!this.name.trim()) {
      this.errorMessage = 'El nombre es obligatorio.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.studentService.createStudent({
      name: this.name.trim()
    }).subscribe({
      next: () => {
        this.router.navigate(['/students']);
      },
      error: (error) => {
        console.error(error);

        this.errorMessage =
          error.error?.message ??
          'No fue posible crear el estudiante.';

        this.loading = false;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/students']);
  }
}