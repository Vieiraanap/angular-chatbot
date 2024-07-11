import { TestBed } from '@angular/core/testing';
import { MarkdownService } from './markdown.service';

describe('Service: Markdown', () => {
  let service: MarkdownService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MarkdownService]
    });
    service = TestBed.inject(MarkdownService);
  });

  it('deve criar o serviço', () => {
    expect(service).toBeTruthy();
  });

  it('deve converter markdown para html', () => {
    const markdown = '# Olá mundo!';
    const html = service.convertMarkdownText(markdown);
    expect(html).toBe('<h1>Olá mundo!</h1>\n');
  })
});
