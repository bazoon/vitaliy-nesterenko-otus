import { Component, OnInit } from '@angular/core';
import { WordsService } from '../words.service';
import { SettingsService } from '../settings.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-go',
  templateUrl: './go.component.html',
  styleUrls: ['./go.component.scss']
})
export class GoComponent {
  trainWords;
  word;
  numberOfRight = 0;
  current = 0;
  hasMore = true;
  translation;
  remainingTime;
  timer;

  constructor(public wordsService: WordsService,
    public settingsService: SettingsService,
    private toastr: ToastrService
  ) {


  }

  getCurrent() {
    this.word = this.trainWords[this.current];
  }

  check() {
    if (this.word.translation === this.translation) {
      this.toastr.success('Правильно');
      this.numberOfRight += 1;
    } else {
      this.toastr.warning('Предупреждение!', `Неправильно ${this.word.translation} vs ${this.translation}`);
    }
  }

  reset() {
    this.hasMore = true;
    this.numberOfRight = 0;
    this.current = 0;
    this.remainingTime = this.settingsService.time * 60;
    this.word = undefined;
    this.clearTimer();
  }

  selectWords() {
    const { language, numberOfWords } = this.settingsService;
    this.wordsService.getWords().subscribe(words => {
      this.trainWords = words.filter(word => {
        return word.language === language.code;
      }).sort(() => Math.random() - 0.5).slice(0, numberOfWords);
    });
  }

  start() {
    this.reset();
    this.selectWords();
    this.getCurrent();
    this.timer = setInterval(() => {
      this.remainingTime -= 1;
      if (this.remainingTime === 0) {
        this.reset();
      }
    }, 1000);
  }

  formatTime() {
    if (!this.remainingTime) return '';
    const time = this.remainingTime;
    // отбрасываем дробную часть
    const min = (time / 60) ^ 0;
    const sec = time % 60;
    return `${min}:${sec}`;
  }

  next() {
    this.check();
    this.current += 1;
    if (this.current < this.settingsService.numberOfWords) {
      this.getCurrent();
    } else {
      this.hasMore = false;
    }
  }

  clearTimer() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  ngOnDestroy() {
    this.clearTimer();
  }

}
