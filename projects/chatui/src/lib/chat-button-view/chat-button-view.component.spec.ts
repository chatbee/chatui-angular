import { TimeAgoPipe } from 'time-ago-pipe';
import { MatChipsModule } from '@angular/material/chips';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MsgComponent } from './../msg/msg.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ChatWindowComponent } from './../chat-window/chat-window.component';
import { MatButtonModule } from '@angular/material/button';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatButtonViewComponent } from './chat-button-view.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';

describe('ChatButtonViewComponent', () => {
  let component: ChatButtonViewComponent;
  let fixture: ComponentFixture<ChatButtonViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ChatButtonViewComponent,
        ChatWindowComponent,
        MsgComponent,
        TimeAgoPipe
      ],
      imports: [
        NoopAnimationsModule,
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
        MatDividerModule,
        MatFormFieldModule,
        MatCardModule,
        FormsModule,
        FlexLayoutModule,
        MatChipsModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatButtonViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('toggleChatUi toggles isChatUiShown', async () => {
    expect(component.isChatUiShown).toBeFalsy();
    component.toggleChatUI();
    expect(component.isChatUiShown).toBeTruthy();
    component.toggleChatUI();
    expect(component.isChatUiShown).toBeFalsy();
  });
});
