import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';



interface Language {
  language: String,
  id: String
}

const languages = [
  {
    name: 'English',
    id: 'english'
  },
  {
    name: 'German',
    id: 'german'
  },
]

@Injectable({
  providedIn: 'root'
})
export class LanguagesService {
  get() {
    return of(languages);
  }
}
