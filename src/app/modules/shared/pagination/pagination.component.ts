import { PostEditComponent } from './../../blog/post-edit/post-edit.component';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';



export interface Page {
  label: string;
  value: any;
}

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() id: string;
  @Input() postTotal;
  @Input() postEachPage = 7;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();
  pages: Page[] = [];

  constructor() { }

  ngOnInit() {
  }

  setCurrent(page: number) {
    this.pageChange.emit(page);

  }

  createPager(postTotal, postEachPage) {
    const pageNumber = postTotal / postEachPage;
    const items: Page[] = [];
    for (let i = 1; i <= pageNumber; i++) {
      items.push({ label: `label-${i}`, value: i });
    }
    return items;
  }
}
