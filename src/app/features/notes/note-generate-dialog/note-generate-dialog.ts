import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-note-generate-dialog',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './note-generate-dialog.html',
  styleUrl: './note-generate-dialog.scss'
})
export class NoteGenerateDialog {

  quantity = 100;

  constructor(
    private dialogRef: MatDialogRef<NoteGenerateDialog>
  ) {}

  generate(): void {
    if (this.quantity < 1 || this.quantity > 10000) {
      return;
    }

    this.dialogRef.close(this.quantity);
  }

  cancel(): void {
    this.dialogRef.close();
  }
}