import { ChatSettings } from './../models/chat-settings';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private settings: ChatSettings = null;
  private readonly SETTINGS_KEY = 'chatbee.settings';
  public saveSettings(setting: ChatSettings) {
    this.settings = setting;
    localStorage.setItem(this.SETTINGS_KEY, JSON.stringify(setting));
  }
  public isSettingsSet(): boolean {
    if (!this.settings) {
      const settingsStr = localStorage.getItem(this.SETTINGS_KEY);
      this.settings = JSON.parse(settingsStr) as ChatSettings;
    }
    return this.settings ? true : false;
  }
  public loadSettings(): ChatSettings | null {
    if (!this.settings) {
      const settingsStr = localStorage.getItem(this.SETTINGS_KEY);
      this.settings = JSON.parse(settingsStr) as ChatSettings;
    }
    return this.settings;
  }
}
