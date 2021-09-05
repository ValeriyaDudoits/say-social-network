import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/say/services/data.service';
import { ICard } from 'src/app/shared/models/card';

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.scss']
})
export class AdminFormComponent {

  public base64: string | ArrayBuffer | null = '';

  public form: FormGroup;

  public name = new FormControl('', [Validators.required]);

  public surname = new FormControl('', [Validators.required]);

  public birthday = new FormControl('', [Validators.required, this.birthdayValidation]);

  public country = new FormControl('', [Validators.required]);

  public city = new FormControl('', [Validators.required]);

  public university = new FormControl('', [Validators.minLength(2), Validators.required]);

  public enteredAt = new FormControl('', [Validators.required, this.integer()]);

  public graduatedAt = new FormControl('', [Validators.required, this.graduetedValidation(this.enteredAt), this.integer()]);

  public photo = new FormControl('', [Validators.required]);

  constructor(private userService: DataService, private router: Router) {
    this.form = new FormGroup({
      name: this.name,
      surname: this.surname,
      birthday: this.birthday,
      country: this.country,
      city: this.city,
      education: new FormArray([
        new FormGroup({
          university: this.university,
          enteredAt: this.enteredAt,
          graduatedAt: this.graduatedAt,
        }),
      ]),
      photo: this.photo,
    });
  }

  submit() {
    const data: ICard = {
      name: `${this.name.value} ${this.surname.value}`,
      birthday: this.birthday.value,
      country: this.country.value,
      city: this.city.value,
      education: this.form.get('education')?.value,
      photo: this.base64,
      online: false,
      posts: [],
      id: this.userService.getId()
    }
    this.userService.setUser(data);
    this.router.navigate(['/main']);
  }

  addUniversity() {
    const group = new FormGroup({
      university: this.university,
      enteredAt: this.enteredAt,
      graduatedAt: this.graduatedAt,
    });
    (this.form.get('education') as FormArray).push(group);
  }

  deleteUniversity(i: number) {
    (this.form.get('education') as FormArray).removeAt(i);
  }

  getControls() {
    return (this.form.get('education') as FormArray).controls;
  }

  private birthdayValidation(control: FormControl,): ValidationErrors | null {
    const value = control.value;
    const now = Date.now();
    if (value > now) {
      return { birthdayValidation: 'Your date is incorrect!' }
    }
    return null;
  }

  private graduetedValidation(dateControl: FormControl) {
    return (control: FormControl): ValidationErrors | null => {
      const value: string = control.value;
      if ((+dateControl.value - +value) > 0) {
        return { graduetedValidation: 'Your date is incorrect!' }
      }
      return null;
    }
  }

  private integer(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const error: ValidationErrors = { integer: true };

      if (control.value && control.value !== `${parseInt(control.value, 10)}`) {
        control.setErrors(error);
        return error;
      }

      control.setErrors(null);
      return null;
    };
  }

  onFileSelected(event: any) {
    this.form.get('photo')?.setValue(event?.target?.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      this.base64 = reader.result;
    };
    const img = reader.readAsDataURL(event?.target?.files[0]);
  }
}
