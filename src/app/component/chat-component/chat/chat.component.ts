import {Component, OnInit, OnDestroy, Input, ViewChild, ElementRef, AfterViewChecked} from '@angular/core';
import {ChatService} from '../../../services/chat.service';
import {takeUntil, map, take, switchMap} from 'rxjs/operators';
import {Chat} from 'src/app/dao/blog/Chat';
import {Subject, Subscription} from 'rxjs';
import {MessageService} from '../../../services/message.service';
import {Message} from 'src/app/dao/blog/message';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ReplaySubject, Observable, interval} from 'rxjs';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {NewChatDialogComponent} from '../new-chat-dialog/new-chat-dialog.component';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {


  submitted = false;
  subscriptionChatMessage: Subscription;

  private destroyedChat$: ReplaySubject<boolean> = new ReplaySubject(1);
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);


  currentChatId$ = new Subject<string>();
  currentChat$ = new Subject<Chat>();
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  @Input() messageText: string;

  MessageList$: Subject<Message[]> = new Subject<Message[]>(

  );

  MessageList: Message[] = [];
  ChatList: Chat[] = [];
  ChatList$: Subject<Chat[]> = new Subject<Chat[]>(

  );
  chatId: string;


  constructor(private chatService: ChatService,
              private messageService: MessageService,
              private dialog: MatDialog,
              private formBuilder: FormBuilder) {
  }

  // сhatForm = new FormGroup({
  //
  //   message: new FormControl('1', [Validators.required, Validators.minLength(1)]),
  // });

  messageForm = new FormGroup({
    message: new FormControl('', [Validators.required, Validators.minLength(1)]),

  });

  get f() {
    return this.messageForm.controls;
  }

  sendMessage() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.messageForm.invalid) {
      return;
    }


    console.log('messageText sendMessage', this.messageForm.value.message);
    this.messageService.sendMessage(this.messageForm.value.message, this.chatId);
    this.messageForm.controls.message.setValue('');

  }

  newChat() {
    console.log('chat show');
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;


    const dialogRef = this.dialog.open(NewChatDialogComponent, dialogConfig);

    dialogRef.afterClosed().pipe(

    ).subscribe((newchatData: any) => {

      console.log('ChatList', this.ChatList);
      const newChat: Chat = newchatData.data.data.createChat;
      console.log('The dialog was closed1', newChat);

      const ChatLists: Chat[] = [];
      ChatLists.push(newChat);
      this.ChatList = [...this.ChatList, newChat];

      this.ChatList$.next(
        this.ChatList
      );
    });
  }


  chatChoice(chatId: string) {
    this.chatId = chatId;
    // console.log('this.chatId', this.chatId);
    this.currentChatId$.next(this.chatId);
  }

  getChatByID(): Chat {
    return this.ChatList.find(element => element.id === this.chatId);
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }


  ngOnInit(): void {

    this.currentChatId$.pipe(
      switchMap(
        (data: string) =>
          this.chatService.subscribeChatById(data).pipe(
            map(
              (data1: any) => {
                return data1.data.chatSubscription;
              }
            ),
            map((wsChatConecntion: any) => {
              this.MessageList = [];

              for (let i = 0; i < wsChatConecntion.messageIdList.length; i++) {
                this.messageService.getMessage(wsChatConecntion.messageIdList[i]).pipe(
                  take(1)
                ).subscribe(data1 => {
                  const message: Message = data1.data.getMessageById;
                  this.MessageList.push(message);
                  // console.log('messageService', message.text);
                });
              }

              this.MessageList$.next(this.MessageList);
              return this.MessageList;
            })
          )
      )
    ).subscribe(
      data => {

        console.log('this.currentChatId$', data);
      }
    );

    this.chatService.getAllChat().pipe(
      takeUntil(this.destroyed$)
    ).subscribe(data => {
      this.ChatList = data.data.getAllChat;
      console.log('this.ChatList', this.ChatList);
    });


  }

}
