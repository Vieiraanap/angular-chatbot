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
  // {role: 'user', content: 'hi'}, {role: 'assistant', content: 'hello'}
  chatMessages: Prompt[] = [{role: 'user', content: 'hi'}, {role: 'assistant', content: 'hello'}];
  llm: Llm = Llm.GEMINI;

  @ViewChild('chatContainer', { static: false })
  chatContainer!: ElementRef;

  constructor(
    private llmService: LlmService,
    private markdownService: MarkdownService
  ) { }

  sendPrompt(): void {
    if (this.userPrompt !== '' && this.userPrompt) {
      const userPrompt: Prompt = this.getPromptByUserRole(ChatRoles.USER, this.userPrompt);
      this.chatMessages.push(userPrompt);
      this.scrollToBottom();

      this.llmService.post(this.userPrompt, this.chatMessages, this.llm).subscribe(res => {
        const assistantReply: string = this.markdownService.convertMarkdownText(res.reply);
        this.chatMessages.push(this.getPromptByUserRole(this.llm == 0 ? ChatRoles.MODEL : ChatRoles.ASSISTANT, assistantReply));
        this.scrollToBottom();
      });
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

  getPromptByUserRole(role: ChatRoles, promptText: string): Prompt {
    if (this.llm == 0) {
      return { role: role, parts: [{ text: promptText }] };
    } else {
      return { role: role, content: promptText };
    }
  }

  scrollToBottom(): void {
    setTimeout(() => {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    }, 0);
  }

  changeLlm(): void {
    this.llm = this.llm === 0 ? 1 : 0;
    this.chatMessages = [];
    this.userPrompt = '';
  }
}
