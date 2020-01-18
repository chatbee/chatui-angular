import { ThemePalette } from '@angular/material/core';

export class ChatMsg {
  constructor(
    public msg: string,
    public date: Date,
    public color: string,
    public align: 'left' | 'right'
  ) {}
}
