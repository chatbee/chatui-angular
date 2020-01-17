import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatButtonViewComponent } from './chat-button-view.component';

describe('ChatButtonViewComponent', () => {
  let component: ChatButtonViewComponent;
  let fixture: ComponentFixture<ChatButtonViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatButtonViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatButtonViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
