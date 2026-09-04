import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { StudentService } from '../../../core/services/student/student.service';

@Component({
  selector: 'app-student-form',
  imports: [
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './student-form.html',
  styleUrl: './student-form.scss'
})
export class StudentForm implements OnInit {

  studentId: number | null = null;

  name = '';

  loading = false;
  saving = false;

  errorMessage = '';

  constructor(
    private studentService: StudentService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.studentId = Number(id);
      this.loadStudent();
    }
  }

  get isEditMode(): boolean {
    return this.studentId !== null;
  }

  loadStudent(): void {

    if (this.studentId === null) {
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.studentService
      .getStudent(this.studentId)
      .subscribe({
        next: (student) => {

          this.name = student.name;

          this.loading = false;
          this.cdr.detectChanges();
        },

        error: (error) => {

          console.error(
            'Error cargando estudiante:',
            error
          );

          this.errorMessage =
            error.error?.message ??
            'No fue posible cargar el estudiante.';

          this.loading = false;
        }
      });
  }

  save(): void {

    if (!this.name.trim()) {

      this.errorMessage =
        'El nombre es obligatorio.';

      return;
    }

    this.saving = true;
    this.errorMessage = '';

    const student = {
      name: this.name.trim()
    };

    if (this.isEditMode) {

      this.updateStudent(student);

    } else {

      this.createStudent(student);

    }
  }

  private createStudent(
    student: { name: string }
  ): void {

    this.studentService
      .createStudent(student)
      .subscribe({

        next: () => {

          this.router.navigate([
            '/students'
          ]);

        },

        error: (error) => {

          console.error(
            'Error creando estudiante:',
            error
          );

          this.errorMessage =
            error.error?.message ??
            'No fue posible crear el estudiante.';

          this.saving = false;
        }

      });
  }

  private updateStudent(
    student: { name: string }
  ): void {

    this.studentService
      .updateStudent(
        this.studentId!,
        student
      )
      .subscribe({

        next: () => {

          this.router.navigate([
            '/students'
          ]);

        },

        error: (error) => {

          console.error(
            'Error actualizando estudiante:',
            error
          );

          this.errorMessage =
            error.error?.message ??
            'No fue posible actualizar el estudiante.';

          this.saving = false;
        }

      });
  }

  cancel(): void {

    this.router.navigate([
      '/students'
    ]);
  }
}