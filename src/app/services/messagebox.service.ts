
import { MessageboxComponent } from './messagebox/messagebox.component';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';



@Injectable({
  providedIn: 'root'
})
export class MessageboxService {

  constructor(private matDialog: MatDialog) { }

  show(message: string, title: string, messageBoxType: MessageBoxType): void {
    this.matDialog.open(MessageboxComponent, {
      data: {
        text: message,
        titleBar: title,
        messagetype: messageBoxType
      }
    });
  }
}

export enum MessageBoxType {
  Information, // 0
  Question, // 1
  Error, // 2
  Warning // 3
}
