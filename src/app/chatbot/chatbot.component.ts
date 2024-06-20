import { Component, ElementRef, ViewChild } from '@angular/core';
import { Prompt } from '../interfaces/chat-prompt.interface';
import { LlmService } from '../services/llm.service';
import { AssistantName, ChatRoles } from '../enums/chat-roles.enum';
import { Llm } from '../enums/llm.enum';
import { MarkdownService } from '../services/markdown.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent {

  userPrompt!: string;
  chatMessages: Prompt[] = [];
  llm: Llm = Llm.GEMINI;
  llmName: AssistantName = AssistantName.model;
  showTypingIndicator: boolean = false;

  @ViewChild('chatContainer', { static: false })
  chatContainer!: ElementRef;

  constructor(
    private llmService: LlmService,
    private markdownService: MarkdownService
  ) { }

  sendPrompt(): void {
    if (this.userPrompt !== '' && this.userPrompt) {
      const userPrompt: Prompt = this.getPrompt(ChatRoles.USER, this.userPrompt);
      this.chatMessages.push(userPrompt);
      this.scrollToBottom();
      this.showTypingIndicator = true;
      this.llmService.post(this.userPrompt, this.chatMessages, this.llm).subscribe(
        res => {
          this.getAssistantReply(res.reply)
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

  changeLlm(): void {
    this.llm = this.llm === 0 ? 1 : 0;
    this.llmName = this.llm === 0 ? AssistantName.model : AssistantName.assistant;
    this.chatMessages = [];
    this.userPrompt = '';
  }

  private getAssistantReply(reply: string): void {
    const assistantReply: string = this.markdownService.convertMarkdownText(reply);
    this.chatMessages.push(this.getPrompt(this.llm == 0 ? ChatRoles.MODEL : ChatRoles.ASSISTANT, assistantReply));
    this.scrollToBottom();
    this.showTypingIndicator = false;
  }

  private getPrompt(role: ChatRoles, promptText: string): Prompt {
    if (this.llm == 0) {
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
