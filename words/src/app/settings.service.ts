import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';


interface Settings {
  language: String,
  numberOfWords: number
}

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  language = 'English';
  numberOfWords = 20;
}
