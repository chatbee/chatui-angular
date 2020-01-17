import { TimeAgoPipe } from 'time-ago-pipe';
import { NgModule } from '@angular/core';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule } from '@angular/forms';
import { MsgComponent } from './msg/msg.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { ChatButtonViewComponent } from './chat-button-view/chat-button-view.component';
@NgModule({
  declarations: [ChatWindowComponent, MsgComponent, TimeAgoPipe, ChatButtonViewComponent],
  imports: [
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatDividerModule,
    MatChipsModule,
    FormsModule,
    FlexLayoutModule,
    CommonModule
  ],
  exports: [ChatWindowComponent]
})
export class ChatuiModule {}
