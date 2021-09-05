import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {
  transform(date: string): number {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const userBirthday = new Date(today
      .getFullYear(), new Date(date).getMonth(), new Date(date).getDate());
    let age = today.getFullYear() - new Date(date).getFullYear();
    if (today < userBirthday) {
      age -= 1;
    }
    return age;
  }
}
