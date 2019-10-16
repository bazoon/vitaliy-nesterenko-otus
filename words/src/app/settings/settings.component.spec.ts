import { of } from 'rxjs';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SettingsService } from '../settings.service';
import { LanguagesService } from '../languages.service';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { ToastrModule } from 'ngx-toastr';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SettingsComponent } from './settings.component';


const languages = [
  {
    name: 'English',
    code: 'en',
  },
  {
    name: 'German',
    code: 'de'
  }
];

class MockLanguagesService {
  get() {
    return of(languages);
  }
}

export class MockSettingsService {
  language = {
    code: 'en'
  }
  numberOfWords = 20;
  time = 1;
}

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SettingsComponent,
      ],
      imports: [
        BrowserAnimationsModule,
        MatTabsModule,
        MatIconModule,
        MatBadgeModule,
        MatListModule,
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatSelectModule,
        ToastrModule,
        MatProgressSpinnerModule
      ],
      providers: [
        SettingsComponent,
        { provide: SettingsService, useClass: MockSettingsService },
        { provide: LanguagesService, useClass: MockLanguagesService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should contain language', fakeAsync(() => {
    const settingElement: HTMLElement = fixture.nativeElement;
    expect(settingElement.textContent).toContain('Language');
  }));

  it('should contain number of words', fakeAsync(() => {
    const settingElement: HTMLElement = fixture.nativeElement;
    expect(settingElement.textContent).toContain('number of words');
  }));

  it('should contain time', fakeAsync(() => {
    const settingElement: HTMLElement = fixture.nativeElement;
    expect(settingElement.textContent).toContain('time');
  }));

});
