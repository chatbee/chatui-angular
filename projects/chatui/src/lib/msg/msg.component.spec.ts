import { MatDividerModule } from '@angular/material/divider';
import { TimeAgoPipe } from 'time-ago-pipe';
import { MatChipsModule } from '@angular/material/chips';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsgComponent } from './msg.component';
import { ChatMsg } from '../models/chat-msg';

describe('MsgComponent', () => {
  let component: MsgComponent;
  let fixture: ComponentFixture<MsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MsgComponent, TimeAgoPipe],
      imports: [MatCardModule, FlexLayoutModule, MatChipsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsgComponent);
    component = fixture.componentInstance;
    component.message = new ChatMsg('hello', new Date(), '#000000', 'left');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('ngOnInit sets alignment properly to start', async () => {
    component.message = new ChatMsg('hello', new Date(), '#000000', 'left');
    fixture.detectChanges();
    component.ngOnInit();

    expect(component.alignment).toBe('start');
  });
  it('ngOnInit sets alignment properly to end', async () => {
    component.message = new ChatMsg('hello', new Date(), '#000000', 'right');
    fixture.detectChanges();
    component.ngOnInit();

    expect(component.alignment).toBe('end');
  });
  it('setMargin returns bottom margin as 0 if shouldShowDate is true', async () => {
    component.shouldShowDate = true;
    const result = component.setMargin();
    expect(result).toEqual({ 'margin-bottom.px': '0' });
  });
  it('setMargin returns bottom margin as 13 if shouldShowDate is true', async () => {
    const result = component.setMargin();
    expect(result).toEqual({ 'margin-bottom.px': '13' });
  });
  it('setColor returns background color properly', async () => {
    const result = component.setColor();
    expect(result).toEqual({ 'background-color': '#000000' });
  });
  it('toggleDate should toggle the date to true', async () => {
    expect(component.shouldShowDate).toBeFalsy();
    component.toggleDate();
    expect(component.shouldShowDate).toBeTruthy();
  });
  it('toggleDate should toggle the date to false', async () => {
    component.shouldShowDate = true;
    component.toggleDate();
    expect(component.shouldShowDate).toBeFalsy();
  });
});
