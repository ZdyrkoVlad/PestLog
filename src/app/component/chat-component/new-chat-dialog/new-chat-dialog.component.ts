import {Component, Inject, Input, OnInit} from '@angular/core';
import {ChatService} from '../../../services/chat.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-new-chat-dialog',
  templateUrl: './new-chat-dialog.component.html',
  styleUrls: ['./new-chat-dialog.component.css']
})
export class NewChatDialogComponent implements OnInit {

  constructor(private chatService: ChatService,
              public dialogRef: MatDialogRef<NewChatDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  @Input() chatName: string;


  createChat() {
    this.chatService.newChatCreate(this.chatName).pipe().subscribe(
      newchatdata => {
        console.log('chatService.newChatCreate', newchatdata);

        this.dialogRef.close({event: 'close', data: newchatdata});
      }
    );

  }

  ngOnInit(): void {

  }

}
