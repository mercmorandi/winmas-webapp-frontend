import {Injectable, NgZone} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    public snackBar: MatSnackBar,
    private zone: NgZone
  ) {}

  public success(message, action = '', duration = 5000) {
    this.zone.run(() => {
      this.snackBar.open(message, action, { duration, panelClass: 'snack-success' });
    });
  }

  public error(message, action = '', duration = 5000) {
    this.zone.run(() => {
      this.snackBar.open(message, action, { duration, panelClass: 'snack-error' });
    });
  }
}
