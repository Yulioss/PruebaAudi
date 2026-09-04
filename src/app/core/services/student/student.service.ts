import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  StudentDTO,
  CreateStudentDTO
} from '../../models/student.model';

import { PagedResponse } from '../../models/paged-response.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiUrl = 'https://localhost:7159/api/Students';

  constructor(private http: HttpClient) {}

  getStudents(
    pageNumber: number = 1,
    pageSize: number = 10
  ): Observable<PagedResponse<StudentDTO>> {

    const params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);

    return this.http.get<PagedResponse<StudentDTO>>(
      this.apiUrl,
      { params }
    );
  }

  getStudent(id: number): Observable<StudentDTO> {
    return this.http.get<StudentDTO>(
      `${this.apiUrl}/${id}`
    );
  }

  createStudent(
    student: CreateStudentDTO
  ): Observable<StudentDTO> {

    return this.http.post<StudentDTO>(
      this.apiUrl,
      student
    );
  }

  updateStudent(
    id: number,
    student: CreateStudentDTO
  ): Observable<void> {

    return this.http.put<void>(
      `${this.apiUrl}/${id}`,
      student
    );
  }

  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }
}