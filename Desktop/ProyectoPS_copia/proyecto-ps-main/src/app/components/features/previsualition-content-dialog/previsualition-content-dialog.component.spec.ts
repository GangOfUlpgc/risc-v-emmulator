import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevisualitionContentDialogComponent } from './previsualition-content-dialog.component';

describe('PrevisualitionContentComponent', () => {
  let component: PrevisualitionContentDialogComponent;
  let fixture: ComponentFixture<PrevisualitionContentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrevisualitionContentDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrevisualitionContentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
