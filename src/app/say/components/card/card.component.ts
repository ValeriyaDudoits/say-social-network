import {
  Component, Input, OnDestroy, OnInit
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { DeleteDialogComponent } from 'src/app/admin/components/delete-dialog/delete-dialog.component';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LanguagService } from 'src/app/core/services/language.service';
import { ICard } from 'src/app/shared/models/card';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, OnDestroy {
  @Input() card: ICard = {} as ICard;

  public isAdmin: boolean = false;

  private subscription = new Subscription();

  constructor(private authService: AuthService, public userService: DataService,
    public dialog: MatDialog, public translate: TranslateService, private langService: LanguagService) {
  }

  ngOnInit(): void {
    this.subscription = this.authService.isAdmin
      .subscribe((data) => this.isAdmin = data)
      .add(this.langService.language
        .subscribe((data) => this.translate.use(data)));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: id,
    });

    dialogRef.afterClosed().subscribe(() => {
    });
  }
}
