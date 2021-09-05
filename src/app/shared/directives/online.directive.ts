import { Directive, HostBinding, Input } from '@angular/core';
import { OnlineColor } from '../models/constants';

@Directive({
  selector: '[appOnline]'
})
export class OnlineDirective {
  @Input('appOnline') isOnline: boolean | undefined = false;

  @HostBinding('style.color') get color() {
    if (this.isOnline) {
      return OnlineColor.Online;
    }
    return OnlineColor.Offline;
  }
}
