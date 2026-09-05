import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { NoteService } from '../../../core/services/note/note.service';
import { StudentService } from '../../../core/services/student/student.service';
import { TeacherService } from '../../../core/services/teacher/teacher.service';
import { NotificationService } from '../../../core/services/notification/notification.service';
import { StudentDTO } from '../../../core/models/student.model';
import { TeacherDTO } from '../../../core/models/teacher.model';

@Component({
  selector: 'app-note-form',
  imports: [
    FormsModule,

    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './note-form.html',
  styleUrl: './note-form.scss'
})
export class NoteForm implements OnInit {

  noteId: number | null = null;

  name = '';
  value: number | null = null;

  studentId: number | null = null;
  teacherId: number | null = null;

  students: StudentDTO[] = [];
  teachers: TeacherDTO[] = [];

  loading = false;
  saving = false;

  errorMessage = '';

  constructor(
    private noteService: NoteService,
    private studentService: StudentService,
    private teacherService: TeacherService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.noteId = Number(id);
    }

    this.loadData();
  }

  get isEditMode(): boolean {
    return this.noteId !== null;
  }

  loadData(): void {

    this.loading = true;
    this.errorMessage = '';

    this.studentService
      .getStudents(1, 1000)
      .subscribe({

        next: (response) => {

          this.students = response.items;

          this.cdr.detectChanges();

          this.loadTeachers();
        },

        error: (error) => {

          console.error(
            'Error cargando estudiantes:',
            error
          );

          this.errorMessage =
            error.error?.message ??
            'No fue posible cargar los estudiantes.';

          this.loading = false;

          this.cdr.detectChanges();
        }

      });
  }

  private loadTeachers(): void {

    this.teacherService
      .getTeachers(1, 1000)
      .subscribe({

        next: (response) => {

          this.teachers = response.items;

          this.cdr.detectChanges();

          if (this.isEditMode) {

            this.loadNote();

          } else {

            this.loading = false;

            this.cdr.detectChanges();
          }
        },

        error: (error) => {

          console.error(
            'Error cargando profesores:',
            error
          );

          this.errorMessage =
            error.error?.message ??
            'No fue posible cargar los profesores.';

          this.loading = false;

          this.cdr.detectChanges();
        }

      });
  }

  private loadNote(): void {

    if (this.noteId === null) {
      return;
    }

    this.noteService
      .getNote(this.noteId)
      .subscribe({

        next: (note) => {

          this.name = note.name;
          this.value = note.value;
          this.studentId = note.studentId;
          this.teacherId = note.teacherId;

          this.loading = false;

          this.cdr.detectChanges();
        },

        error: (error) => {

          console.error(
            'Error cargando nota:',
            error
          );

          this.errorMessage =
            error.error?.message ??
            'No fue posible cargar la nota.';

          this.loading = false;

          this.cdr.detectChanges();
        }

      });
  }

  save(): void {

    this.errorMessage = '';

    if (!this.name.trim()) {

      this.errorMessage =
        'El nombre de la nota es obligatorio.';

      this.cdr.detectChanges();

      return;
    }

    if (
      this.value === null ||
      this.value < 0 ||
      this.value > 5
    ) {

      this.errorMessage =
        'La nota debe estar entre 0 y 5.';

      this.cdr.detectChanges();

      return;
    }

    if (this.studentId === null) {

      this.errorMessage =
        'Debe seleccionar un estudiante.';

      this.cdr.detectChanges();

      return;
    }

    if (this.teacherId === null) {

      this.errorMessage =
        'Debe seleccionar un profesor.';

      this.cdr.detectChanges();

      return;
    }

    this.saving = true;

    this.cdr.detectChanges();

    const note = {
      name: this.name.trim(),
      value: this.value,
      studentId: this.studentId,
      teacherId: this.teacherId
    };

    if (this.isEditMode) {

      this.updateNote(note);

    } else {

      this.createNote(note);
    }
  }

  private createNote(note: {
    name: string;
    value: number;
    studentId: number;
    teacherId: number;
  }): void {

    this.noteService
      .createNote(note)
      .subscribe({

        next: () => {
          this.notification.success(
          'Nota creada correctamente.'
        );
          this.router.navigate([
            '/notes'
          ]);
        },

        error: (error) => {

          console.error(
            'Error creando nota:',
            error
          );

          this.errorMessage =
            error.error?.message ??
            'No fue posible crear la nota.';

          this.saving = false;

          this.cdr.detectChanges();
        }

      });
  }

  private updateNote(note: {
    name: string;
    value: number;
    studentId: number;
    teacherId: number;
  }): void {

    this.noteService
      .updateNote(
        this.noteId!,
        note
      )
      .subscribe({

        next: () => {
        this.notification.success(
            'Nota actualizada correctamente.'
          );
          this.router.navigate([
            '/notes'
          ]);
        },

        error: (error) => {

          console.error(
            'Error actualizando nota:',
            error
          );

          this.errorMessage =
            error.error?.message ??
            'No fue posible actualizar la nota.';

          this.saving = false;

          this.cdr.detectChanges();
        }

      });
  }

  cancel(): void {

    this.router.navigate([
      '/notes'
    ]);
  }
}