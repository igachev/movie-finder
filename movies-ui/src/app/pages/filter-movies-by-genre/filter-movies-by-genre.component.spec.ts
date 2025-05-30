import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterMoviesByGenreComponent } from './filter-movies-by-genre.component';

describe('FilterMoviesByGenreComponent', () => {
  let component: FilterMoviesByGenreComponent;
  let fixture: ComponentFixture<FilterMoviesByGenreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterMoviesByGenreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterMoviesByGenreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
