import { ChatMessage } from './../models/chat-message';
import { SettingsService } from './settings.service';
import { Injectable } from '@angular/core';
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
  JsonHubProtocol
} from '@aspnet/signalr';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private readonly botSaysOn = 'BotSays';
  private readonly userSaysOn = 'UserSays';
  public connection: HubConnection;
  constructor(private settings: SettingsService) {
    if (!settings.isSettingsSet()) {
      console.warn('No settings are set!');
      return;
    }
    this.connection = new HubConnectionBuilder()
      .withUrl(this.makeUrl())
      .configureLogging(LogLevel.Error)
      .withHubProtocol(new JsonHubProtocol())
      .build();
    const p = this.connection
      .start()
      .then(c => {}) // silent
      .catch(e => console.error(e));
  }
  public userSays(message: ChatMessage): Promise<void> {
    return this.connection.send(this.userSaysOn, message);
  }
  /**
   * This is the output from the server side hub
   */
  public botSays$() {
    const subject = new Subject<ChatMessage>();
    this.connection.stream<ChatMessage>(this.botSaysOn).subscribe(subject);
    return subject.asObservable().pipe(
      map(m => {
        m.from = 'bot';
        return m;
      })
    );
  }
  private makeUrl(): string {
    let baseUrl = this.settings.loadSettings().apiUrl;
    if (!baseUrl.endsWith('/', baseUrl.length - 1)) {
      baseUrl += '/';
    }
    return `${baseUrl}chathub`;
  }
}
