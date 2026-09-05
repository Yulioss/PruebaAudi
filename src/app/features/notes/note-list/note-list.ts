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
import { NoteService } from '../../../core/services/note/note.service';
import { NoteDTO } from '../../../core/models/note.model';
import { MatDialog } from '@angular/material/dialog';
import { NoteGenerateDialog } from '../note-generate-dialog/note-generate-dialog';

@Component({
  selector: 'app-note-list',
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
  templateUrl: './note-list.html',
  styleUrl: './note-list.scss'
})
export class NoteList implements OnInit {

  notes: NoteDTO[] = [];

  displayedColumns: string[] = [
    'noteId',
    'name',
    'value',
    'studentId',
    'teacherId',
    'actions'
  ];

  pageNumber = 1;
  pageSize = 10;

  totalItems = 0;
  totalPages = 0;

  loading = false;

  searchTerm = '';

  constructor(
    private noteService: NoteService,
    private cdr: ChangeDetectorRef,
    private notification: NotificationService,
    private dialog: MatDialog 
  ) {}

  ngOnInit(): void {
    this.loadNotes();
  }

  loadNotes(): void {
  this.loading = true;

  this.noteService
    .getNotes(
      this.pageNumber,
      this.pageSize,
      this.searchTerm
    )
    .subscribe({
      next: (response) => {
        this.notes = response.items;
        this.totalItems = response.totalItems;
        this.totalPages = response.totalPages;
        this.loading = false;

        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error cargando notas:', error);

        this.loading = false;

        this.cdr.detectChanges();
      }
    });
}

  onPageChange(event: PageEvent): void {

    this.pageNumber = event.pageIndex + 1;
    this.pageSize = event.pageSize;

    this.loadNotes();
  }


   searchNotes(): void {
  this.pageNumber = 1;
  this.loadNotes();
}

 clearSearch(): void {
  this.searchTerm = '';
  this.pageNumber = 1;
  this.loadNotes();
}

private generateNotes(quantity: number): void {

  this.loading = true;
  this.cdr.detectChanges();

  this.noteService.generateNotes(quantity).subscribe({
    next: (response) => {

      this.notification.success(
        response.message ?? 'Notas generadas correctamente.'
      );

      this.loadNotes();
    },

    error: (error) => {

      console.error('Error generando notas:', error);

      this.loading = false;

      this.notification.error(
        error.error?.message ??
        'No fue posible generar las notas.'
      );

      this.cdr.detectChanges();
    }
  });
}

openGenerateDialog(): void {
  const dialogRef = this.dialog.open(NoteGenerateDialog, {
    width: '400px',
    disableClose: true
  });

  dialogRef.afterClosed().subscribe((quantity: number | undefined) => {

    if (quantity === undefined) {
      return;
    }

    this.generateNotes(quantity);
  });
}

  deleteNote(note: NoteDTO): void {

    const confirmed = confirm(
      `¿Está seguro de eliminar la nota "${note.name}"?`
    );

    if (!confirmed) {
      return;
    }

    this.noteService
      .deleteNote(note.noteId)
      .subscribe({

        next: () => {
          this.notification.success(
          'Nota eliminada correctamente.'
        );
          this.loadNotes();
        },

        error: (error) => {

          console.error(
            'Error eliminando nota:',
            error
          );

        }

      });
  }
}