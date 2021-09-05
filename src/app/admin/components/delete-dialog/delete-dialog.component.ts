import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/say/services/data.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    private userService: DataService,
    @Inject(MAT_DIALOG_DATA) public data: number) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick() {
    this.userService.deleteUser(this.data);
    this.dialogRef.close();
  }
}
