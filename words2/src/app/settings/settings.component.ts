import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../settings.service';
import { LanguagesService } from '../languages.service';


interface Settings {
  language: String,
  numberOfWords: number
}


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  languages;
  
  constructor(public settingsService: SettingsService, public languagesService: LanguagesService) {  }

  ngOnInit() {
    this.languagesService.get().subscribe(languages => {
      this.languages = languages;
    });
  }
}
