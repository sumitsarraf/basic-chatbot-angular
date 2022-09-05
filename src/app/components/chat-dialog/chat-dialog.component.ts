import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { scan } from 'rxjs/operators';
import { ScrollToBottomDirective } from 'src/app/directives/scroll-to-bottom.directive';
import { Message } from 'src/app/_models/Message';
import { ChatService } from 'src/app/_services/chat.service';

@Component({
  selector: 'app-chat-dialog',

  templateUrl: './chat-dialog.component.html',

  styleUrls: ['./chat-dialog.component.css'],
})
export class ChatDialogComponent implements OnInit {
  greetings = ['hi', 'hello', 'hey'];
  botImage:string = "../../assets/images/botimg.jpg";
  userImage:string = "../../assets/images/user.png";
  @ViewChild(ScrollToBottomDirective, { static: false })
  scroll!: ScrollToBottomDirective;

  messages!: Observable<Message[]>;

  formValue!: string;

  constructor(public chat: ChatService) {}

  ngOnInit() {
    this.chat.greeting();
    this.messages = this.chat.conversation
      .asObservable().pipe(
      scan((acc, val) => acc.concat(val)));
  }

  sendMessage() {
    console.log("sendMessage");
    const greetingFromUser = this.greetings.includes(this.formValue.toString());
    if (greetingFromUser) {
      this.chat.update(new Message(this.formValue.toString(), 'user'));
      this.chat.greeting();
    } else {
      this.chat.getChatResponse(this.formValue);
    }
    this.formValue = '';
  }
}
