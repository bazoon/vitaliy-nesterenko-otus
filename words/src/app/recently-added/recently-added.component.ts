import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WordsService } from '../words.service';
import { LanguagesService } from '../languages.service';
import { SettingsService } from '../settings.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from "../translate.service";

interface Word {
  original: String,
  language: String
}

@Component({
  selector: 'app-recently-added',
  templateUrl: './recently-added.component.html',
  styleUrls: ['./recently-added.component.scss']
})
export class RecentlyAddedComponent implements OnInit {
  words: Word[];

  constructor(public dialog: MatDialog,
    public wordsService: WordsService,
    public settingsService: SettingsService
  ) { }


  openDialog(): void {
    const dialogRef = this.dialog.open(Dialog, {
      width: '250px',
      data: { original: '', language: this.settingsService.language.code }
    });

    dialogRef.afterClosed().subscribe(data => {
      if (!data) return;

      const { original, language } = data;
      const isValid = original && language;
      if (isValid) {
        this.wordsService.addWord(data);
      }
    });
  }

  getWords() {
    this.wordsService.getWords().subscribe(words => {
      this.words = words;
    });
  }

  ngOnInit() {
    this.getWords();
  }
}

@Component({
  selector: 'app-dialog-word',
  templateUrl: './dialog.html',
})
export class Dialog implements OnInit {
  languages;
  isLoading = false;
  diameter = 10;

  constructor(
    public dialogRef: MatDialogRef<Dialog>,
    private languagesService: LanguagesService,
    private toastr: ToastrService,
    public translateService: TranslateService,
    @Inject(MAT_DIALOG_DATA) public data: Word) {
  }

  ngOnInit() {
    this.languagesService.get().subscribe(languages => {
      this.languages = languages;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    const isValid = this.data.original && this.data.language;
    if (isValid) {
      this.dialogRef.close(this.data);
    } else {
      this.toastr.warning('Предупреждение!', 'Необходимо заполнить все поля!');
    }
  }
}
