import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { NoteDTO, CreateNoteDTO } from '../../models/note.model';
import { PagedResponse } from '../../models/paged-response.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private apiUrl = 'https://localhost:7159/api/Notes';

  constructor(private http: HttpClient) {}

  getNotes(
    pageNumber: number = 1,
    pageSize: number = 10,
    searchTerm: string = ''
  ): Observable<PagedResponse<NoteDTO>> {

    const params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize)
      .set('searchTerm', searchTerm);

    return this.http.get<PagedResponse<NoteDTO>>(
      this.apiUrl,
      { params }
    );
  }

  getNote(id: number): Observable<NoteDTO> {
    return this.http.get<NoteDTO>(
      `${this.apiUrl}/${id}`
    );
  }

  createNote(
    note: CreateNoteDTO
  ): Observable<NoteDTO> {

    return this.http.post<NoteDTO>(
      this.apiUrl,
      note
    );
  }

  updateNote(
    id: number,
    note: CreateNoteDTO
  ): Observable<void> {

    return this.http.put<void>(
      `${this.apiUrl}/${id}`,
      note
    );
  }

  deleteNote(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }

  generateNotes(quantity: number): Observable<any> {
  return this.http.post(
    `${this.apiUrl}/Generate`,
    { quantity }
  );
}
}