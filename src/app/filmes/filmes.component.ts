import { Component, OnInit } from '@angular/core';
import { MatFormFieldControl } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { MovieDBService } from '../services/movie-db.service';
import { NgAnimateScrollService } from 'ng-animate-scroll';

@Component({
  selector: 'app-filmes',
  templateUrl: './filmes.component.html',
  styleUrls: ['./filmes.component.css']
})
export class FilmesComponent implements OnInit {
  itemList: any;
  defaultImage = environment.placeholderImg;
  options = { page: 1 };
  pager = { currentPage: 1, totalPages: 0, totalPaginas: 0 };
  isLoading = false;
  constructor(
    public animateScrollService: NgAnimateScrollService,
    private titleService: Title,
    public DBService: MovieDBService,
    private router: Router,
  ) {
    this.getDiscover(this.options);
    this.titleService.setTitle('Descubra novos filmes');
  }

  ngOnInit() {}

  getDiscover(options) {
    if (this.isLoading) {
      return;
    }
    this.isLoading = true;
    this.DBService.getDiscover('movie', options).subscribe(
      (res: any) => {
        this.pager.totalPages = res.total_pages;
        this.isLoading = false;
        this.itemList = this.DBService.formatMovies(res.results);
        setTimeout(() => {
            this.animateScrollService.scrollToElement('scroll-top', 900)
        }, 300);
      },
      (error) => {
        this.isLoading = false;
      },
    );
  }

  changeSelection(options) {
    this.pager.currentPage = 1;
    options.page = 1;
    this.getDiscover(options);
  }

  like(e, movie) {
    e.stopPropagation();
    alert(movie.title);
  }

  goToMovieDetails(movie) {
    this.router.navigate(['/movie', movie.id]);
  }

  changePage(pageno) {
    this.pager.currentPage = pageno;
    this.options.page = pageno;
    this.getDiscover(this.options);
  }
}
