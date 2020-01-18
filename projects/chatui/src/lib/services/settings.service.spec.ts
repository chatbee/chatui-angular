import { ChatSettings } from './../models/chat-settings';
import { TestBed } from '@angular/core/testing';
import * as sinon from 'sinon';
import { SettingsService } from './settings.service';

describe('SettingsService', () => {
  let saveStub;
  let loadStub;
  let service: SettingsService;
  beforeEach(() => TestBed.configureTestingModule({}));
  beforeEach(async () => {
    saveStub = sinon.stub(localStorage, 'setItem');
    loadStub = sinon.stub(localStorage, 'getItem');
    service = TestBed.get(SettingsService);
  });
  afterEach(async () => {
    sinon.restore();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should save settings', async () => {
    const settings = new ChatSettings('test.com');
    service.saveSettings(settings);
    expect(service.isSettingsSet()).toBeTruthy();
  });
  it('should load settings', async () => {
    const settings = new ChatSettings('test.com');

    loadStub.returns(JSON.stringify(settings));

    const result = service.loadSettings();
    expect(result.apiUrl).toEqual(settings.apiUrl);
  });
});
