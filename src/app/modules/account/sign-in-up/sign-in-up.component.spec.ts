import { SharedModule } from './../../shared/shared.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInUpComponent } from './sign-in-up.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router/src/router_module';

describe('SignInUpComponent', () => {
  let component: SignInUpComponent;
  let fixture: ComponentFixture<SignInUpComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        // RouterTestingModule has to be added manually instead of adding in `SharedModule` for lazy loading
        imports: [SharedModule.forRoot(), RouterTestingModule],

        declarations: [SignInUpComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
