import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';
import { StudentList } from './features/students/student-list/student-list';
import { StudentForm } from './features/students/student-form/student-form';
import { TeacherList } from './features/teachers/teacher-list/teacher-list';
import { NoteList } from './features/notes/note-list/note-list';

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
        path: 'notes',
        component: NoteList
      },
      {
        path: '',
        redirectTo: 'students',
        pathMatch: 'full'
      }
    ]
  }
];
