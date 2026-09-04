import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { TeacherDTO, CreateTeacherDTO } from '../../models/teacher.model';
import { PagedResponse } from '../../models/paged-response.model';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private apiUrl = 'https://localhost:7159/api/Teachers';

  constructor(private http: HttpClient) {}

  getTeachers(
    pageNumber: number = 1,
    pageSize: number = 10
  ): Observable<PagedResponse<TeacherDTO>> {

    const params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);

    return this.http.get<PagedResponse<TeacherDTO>>(
      this.apiUrl,
      { params }
    );
  }

  getTeacher(id: number): Observable<TeacherDTO> {
    return this.http.get<TeacherDTO>(
      `${this.apiUrl}/${id}`
    );
  }

  createTeacher(
    teacher: CreateTeacherDTO
  ): Observable<TeacherDTO> {

    return this.http.post<TeacherDTO>(
      this.apiUrl,
      teacher
    );
  }

  updateTeacher(
    id: number,
    teacher: CreateTeacherDTO
  ): Observable<void> {

    return this.http.put<void>(
      `${this.apiUrl}/${id}`,
      teacher
    );
  }

  deleteTeacher(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }
}