import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { LanguagService } from 'src/app/core/services/language.service';
import { DataService } from 'src/app/say/services/data.service';
import { ICard } from 'src/app/shared/models/card';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss']
})
export class EditFormComponent implements OnInit, OnDestroy {
  private subscription$ = new Subscription();

  public card: ICard = {} as ICard;

  private id: number = 0;

  public base64: string | ArrayBuffer | null = '';

  public form: FormGroup;

  public name = new FormControl(this.card.name, [Validators.required]);

  public surname = new FormControl(this.card.name, [Validators.required]);

  public birthday = new FormControl(this.card.birthday, [Validators.required, this.birthdayValidation]);

  public country = new FormControl(this.card.country, [Validators.required]);

  public city = new FormControl(this.card.city, [Validators.required]);

  public university = new FormControl('', [Validators.minLength(2), Validators.required]);

  public enteredAt = new FormControl('', [Validators.required, this.integer()]);

  public graduatedAt = new FormControl('', [Validators.required,
    this.graduetedValidation(this.enteredAt), this.integer()]);

  public photo = new FormControl('');

  constructor(private userService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    public translate: TranslateService,
    private langService: LanguagService) {
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

  ngOnInit() {
    this.subscription$ = this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.userService.getById(+params.id);
    });
    this.subscription$.add(this.userService.card$.subscribe((card) => {
      this.card = card;
      this.base64 = card.photo;
      this.name.setValue(this.card.name.split(' ')[0]);
      this.surname.setValue(this.card.name.split(' ')[1]);
      this.birthday.setValue(this.card.birthday);
      this.country.setValue(this.card.country);
      this.city.setValue(this.card.city);
      (this.form.get('education') as FormArray)?.get(`${0}`)?.patchValue({
        university: this.card.education[0].university,
        enteredAt: this.card.education[0].enteredAt,
        graduatedAt: this.card.education[0].graduatedAt,
      });
      if (this.card.education.length > 1) {
        for (let i = 1; i < this.card.education.length; i++) {
          const enteredAt = new FormControl('', [Validators.required, this.integer()]);
          const group = new FormGroup({
            university: new FormControl('', [Validators.minLength(2), Validators.required]),
            enteredAt,
            graduatedAt: new FormControl('', [Validators.required,
              this.graduetedValidation(enteredAt.value), this.integer()]),
          });
          (this.form.get('education') as FormArray)?.push(group);
          (this.form.get('education') as FormArray)?.get(`${i}`)?.patchValue({
            university: this.card.education[i].university,
            enteredAt: this.card.education[i].enteredAt,
            graduatedAt: this.card.education[i].graduatedAt,
          });
        }
      }
      this.photo.setValue(this.base64);
    })).add(this.langService.language.subscribe((data) => this.translate.use(data)));
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  submit() {
    const date = this.birthday.value.toString();
    const data: ICard = {
      name: `${this.name.value} ${this.surname.value}`,
      birthday: date,
      country: this.country.value,
      city: this.city.value,
      education: this.form.get('education')?.value,
      photo: this.base64,
      online: false,
      posts: this.card.posts,
      id: this.userService.getId()
    };
    this.userService.editUser(this.id, data);
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
    const { value } = control;
    const now = Date.now();
    if (value > now) {
      return { birthdayValidation: 'Your date is incorrect!' };
    }
    return null;
  }

  private graduetedValidation(dateControl: FormControl) {
    return (control: FormControl): ValidationErrors | null => {
      const { value } = control;
      if ((+dateControl.value - +value) > 0) {
        return { graduetedValidation: 'Your date is incorrect!' };
      }
      return null;
    };
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
    reader.readAsDataURL(event?.target?.files[0]);
  }
}
