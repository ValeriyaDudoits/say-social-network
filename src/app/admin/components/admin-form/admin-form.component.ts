import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.scss']
})
export class AdminFormComponent implements OnInit {

  public form: FormGroup;

  public name = new FormControl('', [Validators.required]);

  public surname = new FormControl('', [Validators.required]);

  public birthday = new FormControl('', [Validators.required]);

  public country = new FormControl('', [Validators.required]);

  public city = new FormControl('', [Validators.required]);

  public education =  new FormControl('', [Validators.required]);

  public photo =  new FormControl('', [Validators.required]);

  constructor() {
    this.form = new FormGroup({
      name: this.name,
      surname: this.surname,
      birthday: this.birthday,
      country: this.country,
      city: this.city,
      education:  this.education,
      photo: this.photo,
    });
  }

  ngOnInit(): void {
  }

}
