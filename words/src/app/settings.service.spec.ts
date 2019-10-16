import { TestBed } from '@angular/core/testing';
import { SettingsService } from './settings.service';



describe('SettingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SettingsService = TestBed.get(SettingsService);
    expect(service).toBeTruthy();
  });

  it('should have default values', () => {
    const service: SettingsService = TestBed.get(SettingsService);

    expect(service.language).toEqual({ code: "en" });
    expect(service.numberOfWords).toEqual(20);
    expect(service.time).toEqual(1);
  });


});
