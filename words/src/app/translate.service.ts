import { Injectable } from '@angular/core';

const url = "https://translate.yandex.net/api/v1.5/tr.json/translate";
const key = "trnsl.1.1.20190902T053919Z.380f3a2c1138e4ee.4db7cd76f4bb80964ccc21dabb672f24f1143399";

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  translate(word, lang) {
    return fetch(`${url}?key=${key}&text=${word}&lang=${lang}-ru`).then(r => r.json()).then(data => {
      return data.text;
    });
  }
}
