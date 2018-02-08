import { Component, OnInit } from '@angular/core';
import { Field, NgrxFormsState } from '@angular-ngrx-nx/ngrx-forms/src/+state/ngrx-forms.interfaces';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromNgrxForms from '@angular-ngrx-nx/ngrx-forms/src/+state/ngrx-forms.reducer';
import { Validators } from '@angular/forms';

const structure: Field[] = [
  {
    type: 'INPUT',
    name: 'username',
    placeholder: 'Username',
    validator: [Validators.required]
  },
  {
    type: 'INPUT',
    name: 'email',
    placeholder: 'Email',
    validator: [Validators.required]
  },
  {
    type: 'INPUT',
    name: 'password',
    placeholder: 'Password',
    validator: [Validators.required],
    attrs: {
      type: 'password'
    }
  }
];

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  structure$: Observable<Field[]>;
  data$: Observable<any>;

  constructor(private store: Store<NgrxFormsState>) {}

  ngOnInit() {
    this.store.dispatch({
      type: '[ngrxForms] SET_STRUCTURE',
      payload: structure
    });
    this.data$ = this.store.select(fromNgrxForms.getData);
    this.structure$ = this.store.select(fromNgrxForms.getStructure);
  }

  updateForm(changes: any) {
    this.store.dispatch({
      type: '[ngrxForms] SET_DATA',
      payload: changes
    });
  }

  submit() {
    this.store.dispatch({
      type: '[auth] REGISTER'
    });
  }
}