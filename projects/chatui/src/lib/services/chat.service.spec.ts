import { TestBed } from '@angular/core/testing';

import { ChatService } from './chat.service';
import { SettingsService } from './settings.service';
import { ChatMessage } from '../models/chat-message';
import * as sinon from 'sinon';
import { HubConnection, IStreamResult } from '@aspnet/signalr';

let settingServiceStub: Partial<SettingsService>;
settingServiceStub = {
  isSettingsSet: () => {
    return true;
  },
  loadSettings: () => {
    return { apiUrl: 'test.com', chatWindowHeader: 'test' };
  }
};
describe('ChatService', () => {
  let service: ChatService;
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    service = TestBed.get(ChatService);
    expect(service).toBeTruthy();
  });
  describe('when settings are set', async () => {
    let sendStub;
    beforeEach(() => {
      // @ts-ignore
      sendStub = sinon.stub(HubConnection.prototype, 'send');
      sendStub.returns(Promise.resolve());
      TestBed.configureTestingModule({
        providers: [
          {
            provide: SettingsService,
            useValue: settingServiceStub
          }
        ]
      });
      service = TestBed.get(ChatService);
    });
    afterEach(async () => {
      sinon.restore();
    });
    it('should run the constructor', async () => {
      const svc = new ChatService(settingServiceStub as SettingsService);
      expect(svc).toBeTruthy();
    });
    it('should send a message', async () => {
      const promise = service.userSays(new ChatMessage('test', null));
      expect(promise).toBeTruthy();
    });
    it('should fail to get botSays', async () => {
      expect(() => {
        service.botSays$();
      }).toThrowError(
        `Cannot send data if the connection is not in the 'Connected' State.`
      );
    });
  });
});
