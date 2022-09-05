import { Injectable } from '@angular/core';
import { Message } from '../_models/Message';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  conversation = new BehaviorSubject<Message[]>([]);

  url = 'http://localhost:3002/chatapi';


  constructor(private http: HttpClient) {}

  greeting() {
    const d = new Date();
    const hour = d.getHours();
    let str = '';
    if (hour >= 0 && hour <= 11) {
      str = 'Good Morning';
    } else if (hour >= 12 && hour <= 15) {
      str = 'Good Afternoon';
    } else {
      str = 'Good Evening';
    }
    this.sendBotReply(
      str +
        '. I am you Assistant. You can ask me questions related to different policies.'
    );
  }

  continuation() {
    this.sendBotReply('Can I help you with anything more?');
  }

  sendBotReply(str: string) {
    const botMessage = new Message(str, 'bot');
    this.update(botMessage);
  }

  welcomeMsg() {
    this.greeting();
  }

  update(msg: Message) {
    this.conversation.next([msg]);
  }

  getChatResponse(msg: string) {
    console.log('in get chat service: ' + msg);
    const userMessage = new Message(msg, 'user');
    this.update(userMessage);
    this.http
     // .post<any>(this.url + 'chat', { text: msg })   utterance_id: 'l3mzdcxisa0sc2tleu_1',
     .post<any>(this.url, { data: msg, utterance_id: 'l3mzdcxisa0sc2tleu_1' })   
     .subscribe(
        (data) => {
          console.log(data);
          if (data.Bot != '') {
            this.sendBotReply(data.Bot);
          } else {
            const responsemsg = `Sorry. I can only help with questions related to different policies.
                              Please try questions specific to it.`;
            this.sendBotReply(responsemsg);
          }
          //this.continuation();
        },
        (error) => {
          this.sendBotReply(
            'Some error occurred while resolving your query. Please try to rephrase your query.'
          );
        }
      );
  }
}
