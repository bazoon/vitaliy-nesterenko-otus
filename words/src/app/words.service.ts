import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TranslateService } from './translate.service';
import { StoreWordsService } from './store-words.service';

const WORD_MIN_LENGTH = 3;

const words = [
  {
    original: 'House',
    translation: 'Дом',
    language: 'en'
  },
  {
    original: 'Table',
    translation: 'Стол',
    language: 'en'
  },
  {
    original: 'Milk',
    translation: 'Молок',
    language: 'en'
  },
  {
    original: 'Cheese',
    translation: 'Сыр',
    language: 'en'
  },
  {
    original: 'House',
    translation: 'Дом',
    language: 'en'
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
  words: Word[] = []

  constructor(public translateService: TranslateService, public storeWordsService: StoreWordsService) {
    this.words = storeWordsService.get();
  }

  getWords() {
    return of(this.words);
  }

  filterNonAlpha(data) {
    const regex = /[a-zA-Z]/;
    return data.split("").filter(a => regex.test(a)).join("");
  }

  hasWord(word) {
    return this.words.find(w => w.original === word);
  }

  addWord(word: Word) {
    const { original, language } = word;
    const isText = original.indexOf(" ") > 0

    if (isText) {
      const words = original.split(" ");

      words.forEach(async (word) => {
        const isLongEnough = word.length > WORD_MIN_LENGTH;
        const isNewWord = this.hasWord(word);

        if (!isNewWord || !isLongEnough) return;
        word = this.filterNonAlpha(word);
        const [text] = await this.translateService.translate(word, language);

        this.words.push({
          original: word,
          translation: text,
          language: language
        });
        this.storeWordsService.store(this.words);
      });
    } else {
      const isNewWord = this.hasWord(word);
      if (isNewWord) {
        this.words.push(word);
        localStorage.setItem("word", JSON.stringify(this.words));
      }
    }

  }
}
