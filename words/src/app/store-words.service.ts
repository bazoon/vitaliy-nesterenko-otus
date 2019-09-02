import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreWordsService {

  store(words) {
    localStorage.setItem("words", JSON.stringify(words));
  }

  get() {
    const words = localStorage.getItem("words");
    return words && JSON.parse(words) || [];
  }
}
