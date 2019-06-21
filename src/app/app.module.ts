import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  BrowserModule,
  HAMMER_GESTURE_CONFIG,
  HammerGestureConfig,
} from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { FilterComponent } from './shared/filter/filter.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MovieDBService } from './services/movie-db.service';
import {
  MovieDetailsComponent,
  TrailerDialogComponent,
} from './movie-details/movie-details.component';
import { FilmesComponent } from './filmes/filmes.component';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { SharedModule } from './shared/shared.module';
import { SwService } from './services/sw.service';
import { PaginationComponent } from './shared/pagination/pagination.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
export class MyHammerConfig extends HammerGestureConfig {
  overrides = <any>{
    pinch: { enable: false },
    rotate: { enable: false },
  };
}

@NgModule({
  declarations: [
    AppComponent,
    MovieDetailsComponent,
    TrailerDialogComponent,
    FilmesComponent,
    FilterComponent,
    PaginationComponent,
    HomeComponent,
    SearchComponent,
    MovieDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    AppRoutingModule,
    ServiceWorkerModule.register('/the-challenge/ngsw-worker.js', {
      enabled: environment.production,
    }),
  ],
  providers: [
    { provide: HAMMER_GESTURE_CONFIG, useClass: MyHammerConfig },
    MovieDBService,
    SwService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [TrailerDialogComponent],
})
export class AppModule {}
