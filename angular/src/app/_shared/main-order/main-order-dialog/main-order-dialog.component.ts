import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/_services/api/api.service';

@Component({
  selector: 'app-main-order-dialog',
  templateUrl: './main-order-dialog.component.html',
  styleUrls: ['./main-order-dialog.component.scss'],
})
export class MainOrderDialogComponent implements OnInit {
  selectedDate!: Date;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {}

  onValidate() {
    const mainOrder = {
      closingDate: this.selectedDate,
    };
    this.apiService.createMainOrder(mainOrder);
  }

  isInvalidDate(): boolean {
    const now = new Date();
    if (Date.parse(this.selectedDate.toString()) < Date.parse(now.toString())) {
      return true;
    }
    return false;
  }
}
