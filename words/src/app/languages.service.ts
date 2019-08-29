import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

const languages = [
  "English", "German"
]

@Injectable({
  providedIn: 'root'
})
export class LanguagesService {
  get() {
    return of(languages);
  }
}
