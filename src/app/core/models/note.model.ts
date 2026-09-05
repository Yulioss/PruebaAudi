export interface NoteDTO {
  noteId: number;
  name: string;
  value: number;
  studentId: number;
  studentName: string;
  teacherId: number;
  teacherName: string;
}

export interface CreateNoteDTO {
  name: string;
  value: number;
  studentId: number;
  teacherId: number;
}