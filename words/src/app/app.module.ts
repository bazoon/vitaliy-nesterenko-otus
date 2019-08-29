import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MainComponent } from './main/main.component';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { RecentlyAddedComponent, Dialog } from './recently-added/recently-added.component';
import { GoComponent } from './go/go.component';
import { SettingsComponent } from './settings/settings.component';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { NavigationComponent } from './navigation/navigation.component';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    RecentlyAddedComponent,
    GoComponent,
    SettingsComponent,
    Dialog,
    NavigationComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTabsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatBadgeModule,
    MatListModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    ToastrModule.forRoot()
  ],
  entryComponents: [
    Dialog
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
