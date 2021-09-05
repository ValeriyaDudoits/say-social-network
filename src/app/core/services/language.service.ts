import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguagService {
  public language = new BehaviorSubject('en');

  constructor(public translate: TranslateService) { }

  setLang(lang: string) {
    this.language.next(lang);
  }
}
