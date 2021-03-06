import { ChatService } from '../services/chat.service';
import { ChatMsg } from './../models/chat-msg';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { ChatMessage } from '../models/chat-message';

@Component({
  selector: 'lib-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit, OnDestroy {
  public messages: Subject<Array<ChatMsg>> = new Subject<Array<ChatMsg>>();
  private msgs: Array<ChatMsg> = [];
  public userInput: string;
  public instanceId: string;
  private subscription: Subscription;
  constructor(private chat: ChatService) {}

  public userTyping(event: KeyboardEvent) {
    if (event.key !== 'Enter') {
      return;
    }
    const value = (' ' + this.userInput).slice(1); // copies the string
    this.userInput = '';
    this.chat.userSays(new ChatMessage(value, this.instanceId));
  }

  private addToUI(chatMsg: ChatMessage) {
    let msg: ChatMsg;
    if (chatMsg.from === 'bot') {
      msg = new ChatMsg(chatMsg.message, new Date(), '#a180fe', 'left');
    } else {
      msg = new ChatMsg(chatMsg.message, new Date(), '#6639fc', 'right');
    }
    this.msgs.push(msg);
    this.messages.next(this.msgs);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.subscription = this.chat.botSays$().subscribe(msg => {
      this.addToUI(msg);
    });
  }
}
