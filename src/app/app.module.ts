import { NgModule }             from '@angular/core';
import { BrowserModule }        from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule }           from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent }         from './app.component';
import { HomeComponent }        from './home/home.component';
import { DataService }          from './services/data.service';
import { FormsModule }          from '@angular/forms';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    HttpModule,
    FormsModule,
  ],
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  providers:[
    DataService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
