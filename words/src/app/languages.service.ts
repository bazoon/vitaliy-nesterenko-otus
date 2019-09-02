import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

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

@Injectable({
  providedIn: 'root'
})
export class LanguagesService {
  get() {
    return of(languages);
  }
}
