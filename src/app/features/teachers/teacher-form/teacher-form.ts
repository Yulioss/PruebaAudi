import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NotificationService } from '../../../core/services/notification/notification.service';
import { TeacherService } from '../../../core/services/teacher/teacher.service';

@Component({
  selector: 'app-teacher-form',
  imports: [
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './teacher-form.html',
  styleUrl: './teacher-form.scss'
})
export class TeacherForm implements OnInit {

  teacherId: number | null = null;

  name = '';

  loading = false;
  saving = false;

  errorMessage = '';

  constructor(
    private teacherService: TeacherService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.teacherId = Number(id);
      this.loadTeacher();
    }
  }

  get isEditMode(): boolean {
    return this.teacherId !== null;
  }

  loadTeacher(): void {

    if (this.teacherId === null) {
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.teacherService
      .getTeacher(this.teacherId)
      .subscribe({

        next: (teacher) => {

          this.name = teacher.name;

          this.loading = false;
          this.cdr.detectChanges();
        },

        error: (error) => {

          console.error(
            'Error cargando profesor:',
            error
          );

          this.errorMessage =
            error.error?.message ??
            'No fue posible cargar el profesor.';

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

    const teacher = {
      name: this.name.trim()
    };

    if (this.isEditMode) {

      this.updateTeacher(teacher);

    } else {

      this.createTeacher(teacher);

    }
  }

  private createTeacher(
    teacher: { name: string }
  ): void {

    this.teacherService
      .createTeacher(teacher)
      .subscribe({

        next: () => {
        this.notification.success(
          'Profesor creado correctamente.'
        );
          this.router.navigate([
            '/teachers'
          ]);

        },

        error: (error) => {

          console.error(
            'Error creando profesor:',
            error
          );

          this.errorMessage =
            error.error?.message ??
            'No fue posible crear el profesor.';

          this.saving = false;
        }

      });
  }

  private updateTeacher(
    teacher: { name: string }
  ): void {

    this.teacherService
      .updateTeacher(
        this.teacherId!,
        teacher
      )
      .subscribe({

        next: () => {
          this.notification.success(
          'Profesor actualizado correctamente.'
        );
          this.router.navigate([
            '/teachers'
          ]);

        },

        error: (error) => {

          console.error(
            'Error actualizando profesor:',
            error
          );

          this.errorMessage =
            error.error?.message ??
            'No fue posible actualizar el profesor.';

          this.saving = false;
        }

      });
  }

  cancel(): void {

    this.router.navigate([
      '/teachers'
    ]);
  }
}