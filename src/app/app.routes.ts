import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';
import { StudentList } from './features/students/student-list/student-list';
import { StudentForm } from './features/students/student-form/student-form';
import { TeacherList } from './features/teachers/teacher-list/teacher-list';
import { TeacherForm } from './features/teachers/teacher-form/teacher-form';
import { NoteList } from './features/notes/note-list/note-list';
import { NoteForm } from './features/notes/note-form/note-form';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: 'students',
        component: StudentList
      },
      {
        path: 'students/new',
        component: StudentForm
      },
      {
        path: 'students/edit/:id',
        component: StudentForm
      },
      {
        path: 'teachers',
        component: TeacherList
      },
      {
        path: 'teachers/new',
        component: TeacherForm
      },
      {
        path: 'teachers/edit/:id',
        component: TeacherForm
      },
      {
        path: 'notes',
        component: NoteList
      },
      {
        path: 'notes/new',
        component: NoteForm
      },
      {
        path: 'notes/edit/:id',
        component: NoteForm
      },
      {
        path: '',
        redirectTo: 'students',
        pathMatch: 'full'
      }
    ]
  }
];
