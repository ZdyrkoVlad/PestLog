import {Component, OnInit, OnDestroy} from '@angular/core';
import {ChatService} from '../../services/chat.service';
import {takeUntil, map} from 'rxjs/operators';
import {Chat} from 'src/app/dao/blog/Chat';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {


  chatBoolean: boolean = true;

  constructor(private chatService: ChatService) {
  }

  chatShow() {
    this.chatBoolean = !this.chatBoolean;
  }


  ngOnInit(): void {
    // this.chatService.getAllChat().pipe(
    //
    // ).subscribe(
    //   data => {
    //     console.log('this.chatService.getAllChat', data);
    //   }
    // );

    this.chatService.subscribeChatById('').pipe(
      map((data: any) => {
        return data.data.chatSubscription;
      })
    ).subscribe(
      (data: Chat) => {
        console.log('this.chatService.getAllChat', data.messageIdList);
      }
    )
    ;

  }

}
