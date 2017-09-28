import { AuthService } from './../../account/services/auth/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {
  content: string;
  title: string;
  postForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router, private auth: AuthService) { }

  ngOnInit() {
    if (this.auth.loggedIn) {
      this.router.navigate(['/']);
    }
    this.postForm = this.formBuilder.group({
      title: this.title,
      content: this.content
    });
  }

  onConfirm() {

  }

}
