import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoteGenerateDialog } from './note-generate-dialog';

describe('NoteGenerateDialog', () => {
  let component: NoteGenerateDialog;
  let fixture: ComponentFixture<NoteGenerateDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteGenerateDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(NoteGenerateDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
