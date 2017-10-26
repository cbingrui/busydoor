import { Post } from './../../../models/post.model';
import { ToastrService } from './../../shared/services/toastr/toastr.service';
import { PostService } from './../post/post.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth/auth.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {
  contenturl: any;
  summary: any;
  content: string;
  title: string;
  postForm: FormGroup;
  operationText = 'New';
  post = {
    _id: '',
    timestamp: null,
    title: '',
    summary: '',
    contentUrl: '',
    body: ''
  };
  constructor(private formBuilder: FormBuilder, private router: Router
    , private auth: AuthService
    , private route: ActivatedRoute
    , private postService: PostService
    , private toastrService: ToastrService) { }

  ngOnInit() {

    // if (this.auth.loggedIn) {
    //   this.router.navigate(['/']);
    // }
    const id = this.route.snapshot.params['id'];
    if (id !== '0') {
      this.operationText = 'Update';
      this.getPost(id);
    }

    this.buildForm();
  }
  getPost(id: string) {
    this.postService.getPostUrl(id).subscribe(data => {
      if (data.err) {
        this.toastrService.error(data.err.message);
      } else {
        this.post = data.post;
        this.buildForm();
      }
    });
  }
  buildForm() {
    this.postForm = this.formBuilder.group({
      title: this.post.title,
      content: this.post.body,
      summary: this.post.summary,
      contenturl: this.post.contentUrl
    });
  }

  onConfirm() {

    const post = {
      title: this.postForm.get('title').value,
      body: this.postForm.get('content').value,
      summary: this.postForm.get('summary').value,
      contentUrl: this.postForm.get('contenturl').value,

    };
    console.log(post);
    this.postService.newPost(post).subscribe(
      data => {
        if (data.err) {
          this.toastrService.error(data.err.message);
        } else {
          this.toastrService.success('new post success');
        }
      }
    );
  }

}
