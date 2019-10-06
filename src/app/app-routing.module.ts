import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SplashComponent} from './splash/splash.component';
import {QuizComponent} from './quiz/quiz.component';
import {ContactComponent} from './contact/contact.component';
import {FinalComponent} from './final/final.component';

const routes: Routes = [
  {path: 'quiz', component: QuizComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'final', component: FinalComponent},
  {path: '**', component: SplashComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
