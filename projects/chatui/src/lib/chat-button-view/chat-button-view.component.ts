import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-chat-button-view',
  templateUrl: './chat-button-view.component.html',
  styleUrls: ['./chat-button-view.component.scss']
})
export class ChatButtonViewComponent {
  public isChatUiShown = false;

  public toggleChatUI() {
    this.isChatUiShown = !this.isChatUiShown;
  }
}
