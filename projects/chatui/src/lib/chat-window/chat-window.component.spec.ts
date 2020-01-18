import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ChatService } from './../services/chat.service';
import { of, Observable } from 'rxjs';
import { TimeAgoPipe } from 'time-ago-pipe';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MsgComponent } from './../msg/msg.component';
import { MatChipsModule } from '@angular/material/chips';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatWindowComponent } from './chat-window.component';
import { ChatMessage } from '../models/chat-message';

let chatServiceStub: Partial<ChatService>;
chatServiceStub = {
  userSays: _ => {
    return Promise.resolve();
  },
  botSays$: () => {
    return of({ from: null }) as Observable<ChatMessage>;
  }
};
describe('ChatWindowComponent', () => {
  let component: ChatWindowComponent;
  let fixture: ComponentFixture<ChatWindowComponent>;
  let chatService: ChatService;
  let spyUserSays: jasmine.Spy<(message: ChatMessage) => Promise<void>>;
  let spyBotSays$: jasmine.Spy<() => Observable<ChatMessage>>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChatWindowComponent, MsgComponent, TimeAgoPipe],
      imports: [
        NoopAnimationsModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatCardModule,
        FlexLayoutModule,
        MatChipsModule,
        MatDividerModule,
        MatInputModule,
        FormsModule
      ],
      providers: [
        {
          provide: ChatService,
          useValue: chatServiceStub
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    chatService = fixture.debugElement.injector.get(ChatService);
    spyUserSays = spyOn(chatService, 'userSays').and.callThrough();
    spyBotSays$ = spyOn(chatService, 'botSays$').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have no side affects if userTyping is called with a key other than Enter', async () => {
    const e = new KeyboardEvent('Space');
    component.userTyping(e);
    expect(spyUserSays).not.toHaveBeenCalled();
  });
  it('should call userSays when userTyping is called with Enter', async () => {
    let e = new KeyboardEvent('enter');
    e = Object.assign({}, e, { key: 'Enter' });
    component.userInput = 'hello world';

    component.userTyping(e);

    expect(spyUserSays).toHaveBeenCalledWith(
      new ChatMessage('hello world', undefined)
    );
    expect(component.userInput).toBe('');
  });
  it('should create a subscription in ngOnInit', async () => {
    component.ngOnInit();
    expect(spyBotSays$).toHaveBeenCalled();
  });
  it('runs ngOnDestroy', async () => {
    component.ngOnDestroy();
  });
  it('adds a bot msg', async () => {
    chatServiceStub = Object.assign({}, chatServiceStub, {
      botSays$: () => {
        return of({ from: 'bot' });
      }
    });
    component.ngOnInit();
  });
});
