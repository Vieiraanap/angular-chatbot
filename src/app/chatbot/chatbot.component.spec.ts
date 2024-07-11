import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatbotComponent } from './chatbot.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { TesteUtils } from '../utils/teste.utils';

describe('ChatbotComponent', () => {
  let component: ChatbotComponent;
  let fixture: ComponentFixture<ChatbotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatbotComponent ],
      imports: [ HttpClientTestingModule, FormsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatbotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve inicializar com uma lista vazia de mensagens', () => {
    expect(component.chatMessages.length).toBe(0);
  });

  it('deve adicionar uma mensagem do usuário ao enviar', () => {
    component.userPrompt = 'Olá, IA!';
    component.sendPrompt();
    const prompt = TesteUtils.promptValue(component);
    expect(component.chatMessages.length).toBe(1);
    expect(prompt).toBe('Olá, IA!');
    expect(component.chatMessages[0].role).toBe('user');
  });

  it('deve limpar o campo de nova mensagem após enviar', () => {
    component.userPrompt = 'Olá, IA!';
    component.sendPrompt();
    expect(component.userPrompt).toBe('');
  });

  it('deve exibir a mensagem do usuário na interface', () => {
    component.userPrompt = 'Olá, IA!';
    component.sendPrompt();
    fixture.detectChanges();
    const messageElements = fixture.debugElement.queryAll(By.css('.user-msg'));
    expect(messageElements.length).toBe(1);
    expect(messageElements[0].nativeElement.textContent).toContain('Olá, IA!');
  });

  it('deve receber uma resposta da IA após enviar uma mensagem', () => {
    component.getAssistantResponse('Olá, usuário!');
    fixture.detectChanges();
    const messageElements = fixture.debugElement.queryAll(By.css('.model-msg'));
    expect(messageElements.length).toBe(1);
    expect(messageElements[0].nativeElement.textContent).toContain('Olá, usuário!');
  });
});
