import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Prompt } from '../interfaces/chat-prompt.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Api } from '../enums/llm.enum';
import { ApiResponse } from '../interfaces/api-response';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  post(api: Api, messages: Prompt[], message?: string): Observable<ApiResponse> {
    const url = `${environment.apiUrl}/chat`;
    if (api == 0) {
      return this.http.post<ApiResponse>(
        `${url}/gemini`, { message, messages }
      );
    }
    return this.http.post<ApiResponse>(
      `${url}/openai`, { messages }
    );
  }

}
