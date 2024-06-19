import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Prompt } from '../interfaces/chat-prompt.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Llm } from '../enums/llm.enum';

@Injectable({
  providedIn: 'root'
})
export class LlmService {

  constructor(
    private http: HttpClient
  ) { }

  post(currentPrompt: string, previousPrompts: Prompt[], llm: Llm): Observable<{ reply: string }> {
    if (llm == 0) {
      return this.http.post<{ reply: string }>(`${environment.apiUrl}/chat/gemini`, { currentPrompt, previousPrompts });
    } else {
      return this.http.post<{ reply: string }>(`${environment.apiUrl}/chat/openai`, { previousPrompts });
    }
  }

}
