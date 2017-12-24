import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  settingsForm: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.builForm();
  }

  submitForm() {}
  builForm() {
    this.settingsForm = this.fb.group({
      username: [''],
      password: ['']
    });
  }
}
