import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Title } from '@angular/platform-browser';
import { MovieDBService } from '../services/movie-db.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  defaultImage = environment.placeholderImg;
  isLoading = false;

  search: any;
  itemList:any;

  input(event: any) {
    if (this.isLoading) {
      return;
    }
    this.isLoading = true;
    this.DBService.getkeywords(this.search = event.target.value).subscribe (
      (res: any) => {
        this.isLoading = false;
        this.itemList = this.DBService.formatMovies(res.results)
        }
      )
  }
  
  constructor(public DBService: MovieDBService, public router: Router, private titleService: Title) {
    this.titleService.setTitle('Buscar filme, série ou ator...');
    this.search = 'movie';
    if (this.isLoading) {
      return;
    }
    this.isLoading = true;
    this.DBService.getkeywords(this.search).subscribe (
      (res: any) => {
        this.isLoading = false;
        this.itemList = this.DBService.formatMovies(res.results)
        },
        (error) => {
          this.isLoading = false;
        },
      )
  }

  goToMovieDetails(movie) {
    this.router.navigate(['/movie', movie.id]);
  }
  
  ngOnInit() {}

}
