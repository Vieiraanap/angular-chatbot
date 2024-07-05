import { Component, ElementRef, ViewChild } from '@angular/core';
import { Prompt } from '../interfaces/chat-prompt.interface';
import { ApiService } from '../services/llm.service';
import { AssistantName, ChatRoles } from '../enums/chat-roles.enum';
import { Api } from '../enums/llm.enum';
import { MarkdownService } from '../services/markdown.service';
import { marked } from 'marked';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent {

  userPrompt!: string;
  chatMessages: Prompt[] = [];
  showTypingIndicator: boolean = false;
  api: Api = Api.GEMINI;
  apiName: AssistantName = AssistantName.model;

  @ViewChild('chatContainer', { static: false })
  chatContainer!: ElementRef;

  constructor(
    private apiService: ApiService,
    private markdownService: MarkdownService
  ) { }

  sendPrompt(): void {
    if (this.userPrompt !== '' && this.userPrompt) {
      this.addMessageToChat(ChatRoles.USER, this.userPrompt)
      this.showTypingIndicator = true;
      this.apiService.post(this.api, this.chatMessages, this.userPrompt).subscribe(
        res => {
          const assistantReply: string = this.markdownService.convertMarkdownText(res.reply);
          this.addMessageToChat(this.api == 0 ? ChatRoles.MODEL : ChatRoles.ASSISTANT, assistantReply)
          this.showTypingIndicator = false;
        }
      );
      this.userPrompt = '';
    }
  }

  showMessage(prompt: Prompt): string {
    if ('parts' in prompt) {
      return prompt.parts[0].text;
    } else {
      return prompt.content;
    }
  }

  showRole(role: string): string {
    if (role === ChatRoles.USER) {
      return role;
    }
    return AssistantName[role as keyof typeof AssistantName];
  }

  changeApi(): void {
    this.api = this.api === 0 ? 1 : 0;
    this.apiName = this.api === 0 ? AssistantName.model : AssistantName.assistant;
    this.chatMessages = [];
    this.userPrompt = '';
  }

  private addMessageToChat(role: ChatRoles, message: string): void {
    this.chatMessages.push(this.getMessage(role, message));
    this.scrollToBottom();
  }

  private getMessage(role: ChatRoles, promptText: string): Prompt {
    if (this.api == 0) {
      return { role: role, parts: [{ text: promptText }] };
    } else {
      return { role: role, content: promptText };
    }
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    }, 0);
  }
}

// {role: 'user', content: 'hi'}, {role: 'assistant', content: 'hello'}
