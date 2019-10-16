import { TestBed } from '@angular/core/testing';
import { LanguagesService } from './app/languages.service';



describe('LanguagesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LanguagesService = TestBed.get(LanguagesService);
    expect(service).toBeTruthy();
  });

  it('should have 2 languages by default', () => {
    const service: LanguagesService = TestBed.get(LanguagesService);
    service.get().subscribe(languages => {
      expect(languages.length).toEqual(2);
    });


  });


});
