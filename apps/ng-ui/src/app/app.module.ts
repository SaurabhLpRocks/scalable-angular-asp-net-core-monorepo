import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '@core/core.module';
import { HotToastModule } from '@ngneat/hot-toast';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


const MODULES = [
  BrowserAnimationsModule,
  BrowserModule,
  FormsModule,
  HttpClientModule,
  ReactiveFormsModule,
  CoreModule,
  AppRoutingModule
];

const THIRD_PARTY_MODULES = [
  HotToastModule.forRoot()
]
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [...MODULES, ...THIRD_PARTY_MODULES],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy },],
  bootstrap: [AppComponent]
})
export class AppModule { }
