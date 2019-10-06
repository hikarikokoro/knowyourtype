import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SplashComponent} from './splash/splash.component';
import {ContactComponent} from './contact/contact.component';
import {QuizComponent} from './quiz/quiz.component';
import {FinalComponent} from './final/final.component';

@NgModule({
  declarations: [
    AppComponent,
    SplashComponent,
    ContactComponent,
    QuizComponent,
    FinalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
