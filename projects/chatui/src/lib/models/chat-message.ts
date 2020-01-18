export class ChatMessage {
  public from: 'user' | 'bot';
  constructor(public message: string, public instanceId: string) {}
}
