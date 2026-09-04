import { Component, OnInit } from '@angular/core';
import { StudentService} from '../../../core/services/student/student.service';
import { StudentDTO } from '../../../core/models/student.model';

@Component({
  selector: 'app-student-list',
  imports: [],
  templateUrl: './student-list.html',
  styleUrl: './student-list.scss'
})
export class StudentList implements OnInit {

  students: StudentDTO[] = [];

  pageNumber = 1;
  pageSize = 10;
  totalItems = 0;
  totalPages = 0;

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.studentService
      .getStudents(this.pageNumber, this.pageSize)
      .subscribe({
        next: (response) => {
          this.students = response.items;
          this.totalItems = response.totalItems;
          this.totalPages = response.totalPages;
        },
        error: (error) => {
          console.error('Error cargando estudiantes', error);
        }
      });
  }

  nextPage(): void {
    if (this.pageNumber < this.totalPages) {
      this.pageNumber++;
      this.loadStudents();
    }
  }

  previousPage(): void {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.loadStudents();
    }
  }
}
