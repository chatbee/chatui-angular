import { Component, OnInit, Input } from '@angular/core';
import { ChatMsg } from '../models/chat-msg';

@Component({
  selector: 'lib-msg',
  templateUrl: './msg.component.html',
  styleUrls: ['./msg.component.scss']
})
export class MsgComponent implements OnInit {
  @Input()
  public message: ChatMsg;
  public alignment: 'start' | 'end';
  public shouldShowDate = false;

  public toggleDate() {
    this.shouldShowDate = !this.shouldShowDate;
  }
  public setColor() {
    return { 'background-color': this.message.color };
  }
  public setMargin() {
    return {
      'margin-bottom.px': this.shouldShowDate ? '0' : '13'
    };
  }
  ngOnInit() {
    if (this.message.align === 'left') {
      this.alignment = 'start';
    } else if (this.message.align === 'right') {
      this.alignment = 'end';
    }
  }
}
