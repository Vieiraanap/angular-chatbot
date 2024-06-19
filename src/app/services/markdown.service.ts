import { Injectable } from '@angular/core';
import { marked } from 'marked';

@Injectable({
  providedIn: 'root'
})
export class MarkdownService {

  constructor() { }

  convertMarkdownText(markdown: string): string {
    return marked(markdown).toString();
  }

}
