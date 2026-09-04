import { TestBed } from '@angular/core/testing';
import { Teacher } from './teacher.service';

describe('Teacher', () => {
  let service: Teacher;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Teacher);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
