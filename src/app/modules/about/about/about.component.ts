import { ToastrService } from './../../shared/services/toastr/toastr.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  constructor(private toastr: ToastrService) {}

  ngOnInit() {
    this.toastr.info('Resume can be printed with browser');
  }
}
