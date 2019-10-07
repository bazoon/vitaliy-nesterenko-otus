import { Injectable } from '@angular/core';

interface Word {
  original: String,
  translation: String,
  language: String
}

@Injectable({
  providedIn: 'root'
})
export class StoreWordsService {
  private words: Word[];

  constructor() {
    const words = localStorage.getItem("words");
    this.words = words && JSON.parse(words) || [];
  }

  store(words) {
    this.words = words;
    localStorage.setItem("words", JSON.stringify(words));
  }

  get() {
    return this.words;
  }
}
