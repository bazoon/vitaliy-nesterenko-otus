import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { WordsService } from '../words.service';
import { LanguagesService } from '../languages.service';
import { SettingsService } from '../settings.service';



interface Word {
  original: String,
  translation: String,
  language: String
}

@Component({
  selector: 'app-recently-added',
  templateUrl: './recently-added.component.html',
  styleUrls: ['./recently-added.component.scss']
})
export class RecentlyAddedComponent implements OnInit {
  words: Word[];

  constructor(public dialog: MatDialog, public wordsService: WordsService, public settingsService: SettingsService) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(Dialog, {
      width: '250px',
      data: { original: '', translation: '', language: this.settingsService.language }
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data && data.original && data.translation && data.language) {
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

  constructor(
    public dialogRef: MatDialogRef<Dialog>,
    private languagesService: LanguagesService,
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

}

