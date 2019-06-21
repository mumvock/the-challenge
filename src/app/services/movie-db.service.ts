import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class MovieDBService {
  API_BASE = environment.API_BASE;
  API_KEY = environment.API_KEY;
  body: any;
  err: any;

  constructor(private http: HttpClient) {}

  formatParams(options) {
    let params = new HttpParams()
      .set('api_key', this.API_KEY)
      .set('language', 'pt-BR');

    if (options) {
      Object.keys(options).forEach(function(key) {
        params = params.append(key, options[key]);
      });
    }
    return { params };
  }
  sortByList(): Array<any> {
    return [
      { key: 'popularity.desc', value: 'Popularidade decrescente' },
      { key: 'popularity.asc', value: 'Popularidade crescente' },
      { key: 'vote_count.asc', value: 'Avaliação crescente' },
      { key: 'vote_count.desc', value: 'Avaliação decrescente' },
      { key: 'primary_release_date.desc', value: 'Data de lançamento decrescente' },
      { key: 'primary_release_date.asc', value: 'Data de lançamento crescente' }
    ];
  }

  getYears(): Array<number> {
    const year = new Date().getFullYear();
    const yearList = [];
    for (let i = 0; i < 25; i++) {
      yearList.push(year - i);
    }
    return yearList;
  }

  getMovies(type): Observable<Response> {
    type = type || 'popular';
    return this.http
      .get(`${this.API_BASE}movie/${type}`, this.formatParams({}))
      .pipe(
        map((res: Response) => res),
        catchError(this.handleError)
      );
  }

  getMovieDetails(movieId): Observable<Response> {
    const movieDetilasUrl = `${this.API_BASE}movie/${movieId}`;
    return this.http.get(movieDetilasUrl, this.formatParams({})).pipe(
      map((res: Response) => res),
      catchError(this.handleError)
    );
  }

  getMovieVideos(movieId): Observable<Response> {
    const movieTrailersUrl = `${this.API_BASE}movie/${movieId}/videos`;
    return this.http.get(movieTrailersUrl, this.formatParams({})).pipe(
      map((res: Response) => res),
      catchError(this.handleError)
    );
  }

  getMovieReviews(movieId): Observable<Response> {
    const movieReviewUrl = `${this.API_BASE}movie/${movieId}/reviews`;
    return this.http.get(movieReviewUrl, this.formatParams({})).pipe(
      map((res: Response) => res),
      catchError(this.handleError)
    );
  }

  getGenres(): Observable<Response> {
    const generesUrl = `${this.API_BASE}genre/movie/list`;
    return this.http.get(generesUrl, this.formatParams({})).pipe(
      map((res: Response) => res),
      catchError(this.handleError)
    );
  }

  getkeywords(search: string): Observable<Response> {
    const generesUrl = `${this.API_BASE}search/movie?api_key=${
      this.API_KEY
    }&query=${search}&page=1`;

    return this.http.get(generesUrl).pipe(
      map((res: Response) => res),
      catchError(this.handleError)
    );
  }

  formatMovies(items) {
    const placeholderImg = environment.placeholderImg;
    const imgUrl = environment.imgUrl;
    return items.map(item => {
      if (item) {
        item.poster_path = item.poster_path
          ? `${imgUrl}${item.poster_path}`
          : placeholderImg;
        item.backdrop_path = item.backdrop_path
          ? `${imgUrl}${item.backdrop_path}`
          : placeholderImg;
        item.overview = item.overview.substr(0, 200) + '...';
        return item;
      }
    });
  }

  getSimilarMovies(movie_id): Observable<Response> {
    const similarMovieUrl = `${this.API_BASE}movie/${movie_id}/similar`;
    return this.http.get(similarMovieUrl, this.formatParams({})).pipe(
      map((res: Response) => res),
      catchError(this.handleError)
    );
  }

  getCastMovie(movie_id): Observable<Response> {
    const castUrl = `${this.API_BASE}movie/${movie_id}/credits?api_key=${
      this.API_KEY
    }`;
    return this.http.get(castUrl).pipe(
      map((res: Response) => res),
      catchError(this.handleError)
    );
  }

  getDiscover(type, options): Observable<Response> {
    // options.api_key = this.API_KEY;
    const discoverUrl = `${this.API_BASE}discover/${type}`;
    return this.http.get(discoverUrl, this.formatParams(options)).pipe(
      map((res: Response) => res),
      catchError(this.handleError)
    );
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      this.body = error || '';
      this.err = this.body.error || JSON.stringify(this.body);
      errMsg = `${error.status} - ${error.statusText || ''} ${this.err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}