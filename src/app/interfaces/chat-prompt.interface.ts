interface ChatPrompt {
  role: string;
}

//in case using OpenAI
export interface ChatPromptOpenAI extends ChatPrompt {
  content: string;
}

//in case using Gemini
export interface ChatPromptGemini extends ChatPrompt {
  parts: Part[];
}

interface Part {
  text: string;
}

export type Prompt = ChatPromptGemini | ChatPromptOpenAI;
