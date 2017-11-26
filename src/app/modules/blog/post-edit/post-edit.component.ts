import { Post } from './../../../models/post.model';
import { ToastrService } from './../../shared/services/toastr/toastr.service';
import { PostService } from './../post/post.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ValidatorFn, FormControl, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth/auth.service';

const OperationType = {
  New: 'New',
  Edit: 'Update'
};

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
  operationText = OperationType.New;
  postID = '';
  tags = [];
  post = {
    _id: '',
    timestamp: null,
    title: '',
    summary: '',
    contentUrl: '',
    body: '',
    tags: [],
    sticky: false
  };

  ctrlTag = new FormControl('');

  validateUrl(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const regExp = new RegExp(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
      const urlInvalid = !regExp.test(control.value);
      console.log('invalid' + urlInvalid);
      return urlInvalid ? { 'validateUrl': { value: control.value } } : null;
    };
  }

  constructor(private formBuilder: FormBuilder, private router: Router
    , private auth: AuthService
    , private route: ActivatedRoute
    , private postService: PostService
    , private toastrService: ToastrService) { }

  ngOnInit() {

    // if (this.auth.loggedIn) {
    //   this.router.navigate(['/']);
    // }
    this.postID = this.route.snapshot.params['id'];
    if (this.postID) {
      this.operationText = OperationType.Edit;
      this.getPost(this.postID);
    } else {
      this.operationText = OperationType.New;
    }

    this.buildForm();

  }

  getPost(id: string) {
    this.postService.getPostUrl(id).subscribe(data => {
      if (data.err) {
        this.toastrService.error(data.err.message);
      } else {
        this.post = data.post;
        this.setFormValue();
      }
    });
  }
  setFormValue() {
    this.postForm.setValue({
      title: this.post.title
      , summary: this.post.summary
      , contenturl: this.post.contentUrl
      , content: this.post.body
      , sticky: this.post.sticky
    });
    this.initTags(this.post.tags);
  }

  buildForm() {
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: '',
      summary: '',
      contenturl: ['', this.validateUrl()],
      sticky: false
    });
  }
  initTags(tags) {
    this.tags = tags;
  }
  onConfirm() {

    const post = {
      title: this.postForm.get('title').value,
      body: this.postForm.get('content').value,
      summary: this.postForm.get('summary').value,
      contentUrl: this.postForm.get('contenturl').value,
      sticky: this.postForm.get('sticky').value,
      tags: this.tags,
      _id: this.postID
    };
    console.log('post');
    console.log(post);
    console.log(this.post);
    if (this.operationText === OperationType.New) {

      this.postService.newPost(post).subscribe(
        data => {
          if (data.err) {
            this.toastrService.error(data.err.message);
          } else {
            this.toastrService.success('new post success');
            const postId = data.post._id;
            this.router.navigateByUrl('/blog/' + postId);
          }
        }
      );
    } else {
      this.postService.updatePost(post).subscribe(
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
  addTag(e: Event) {
    e.preventDefault();
    const newTag = this.ctrlTag.value;
    if (newTag === '' || this.tags.indexOf(newTag) > -1) {
      return;
    }

    this.tags.push(newTag);
    this.ctrlTag.reset('');

  }

  removeTag(tag: string) {
    this.tags = this.tags.filter(t => t !== tag);
  }

}
