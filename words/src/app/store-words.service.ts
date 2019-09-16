import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreWordsService {
  private words: string;

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
