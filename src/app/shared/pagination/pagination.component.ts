import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() pager;
  @Output() changePage = new EventEmitter<number>();

  constructor() {}
  
  setPage(page: number) {
    if (page <= 0) {
      page = 1;
    } else if (page > this.pager.totalPages) {
      return;
    }
    this.changePage.emit(page);
  }
  ngOnInit() {}
}