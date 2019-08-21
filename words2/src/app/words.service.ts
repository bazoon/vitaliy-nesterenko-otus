import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';


const words = [
  {
    original: 'House',
    translation: 'Дом',
    language: 'english'
  },
  {
    original: 'Table',
    translation: 'Стол',
    language: 'english'
  },
  {
    original: 'Milk',
    translation: 'Молок',
    language: 'english'
  },
  {
    original: 'Cheese',
    translation: 'Сыр',
    language: 'english'
  },
  {
    original: 'House',
    translation: 'Дом',
    language: 'english'
  }
];

interface Word {
  original: String,
  translation: String,
  language: String
}


@Injectable({
  providedIn: 'root'
})
export class WordsService {
  words: Word[]
  
  constructor() { 
    this.words = words;
  }

  getWords() {
    return of(this.words);
  }

  addWord(word: Word) {
    this.words.push(word);
  }
}
