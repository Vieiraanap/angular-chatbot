# AngularChatbot

Este é um projeto de um chatbot desenvolvido com Angular. Seu objetivo é fornecer uma interface de chatbot interativa integrada a diferentes serviços de backend, utilizando ChatGPT e Gemini.

# Recursos

* Interface de Chatbot
* Consumo da Gemini API
* Consumo da OpenAI API
* Formatação das respostas do LLM

# Interface

A interface segue o padrão visual atual, bem como o comportamento padrão de uma estrutura de chat. Toda sua estilização e estruturação lógica e visual estão presentes no componente `<app-chatbot></app-chatbot>` para fins de simplificação do projeto.

# Consumo das API's

Para consumir os serviços, foi criado o arquivo `server.js` compondo as lógicas necessárias de configuração e conexão, tanto com a API da OpenAI, quanto com a do Google Gemini.

# Servidor Angular

Para iniciar o servidor de desenvolvimento, execute:

```bash 
ng serve
```

# Servidor Express

Para executar o servidor express, execute no diretório do arquivo que contém a configuração de conexão com as API's: `node nome-do-arquivo.js`

**Exemplo:**
```bash 
node server.js
```

# Formatação das Respostas do LLM

Formatar as respostas é algo importante, haja vista que são retornadas em formato markdown, portanto, é necessário convertê-las em formato html. Para isso utilizamos a biblioteca marked, através do arquivo `markdown.service.ts`, que contém a lógica necessária para conversão do formato de texto, bem como retorno dos valores ao componente de exibição.
Vale ressaltar que deve-se, ainda, definir em um arquivo de estilo para cada tipo de estrutura do documento formatado. Nesse projeto os estilos foram definidos no arquivo `styles.scss`.

# Dependências

* "@google/generative-ai": "^0.13.0",
* "dotenv": "^16.4.5",
* "express": "^4.19.2",
* "marked": "^13.0.0",
* "openai": "^4.50.0",

[Guia passo a passo do projeto]()
