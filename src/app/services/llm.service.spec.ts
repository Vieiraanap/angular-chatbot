import { Api } from './../enums/llm.enum';
import { TestBed, inject } from '@angular/core/testing';
import { ApiService } from './llm.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Prompt } from '../interfaces/chat-prompt.interface';
import { ChatRoles } from '../enums/chat-roles.enum';
import { environment } from 'src/environments/environment';

describe('Service: Api', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve criar o serviço', () => {
    expect(service).toBeTruthy();
  });

  it('deve enviar as mensagens para o LLM via POST', () => {
    const chatMessages: Prompt[] = [{ role: ChatRoles.MODEL, content: 'Olá!' }];
    const userPrompt: string = 'Olá!';
    const assistantReply: string = 'Olá, usuário!';
    service.post(Api.GEMINI, chatMessages, userPrompt).subscribe(res => {
      expect(res.reply).toEqual(assistantReply);
    });

    const request = httpMock.expectOne(`${environment.apiUrl}/chat/gemini`);
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({message: userPrompt, messages: chatMessages});
    request.flush(chatMessages);
  });
});
