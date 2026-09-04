export interface NoteDTO {
  noteId: number;
  name: string;
  value: number;
  studentId: number;
  teacherId: number;
}

export interface CreateNoteDTO {
  name: string;
  value: number;
  studentId: number;
  teacherId: number;
}