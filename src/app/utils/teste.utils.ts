import { ChatbotComponent } from "../chatbot/chatbot.component";
import { ChatRoles } from "../enums/chat-roles.enum";

export class TesteUtils {
  static promptValue(component: ChatbotComponent): string {
    if ('parts' in component.chatMessages[0]) {
      return component.chatMessages[0].parts[0].text;
    } else {
      return component.chatMessages[0].content;
    }
  }
}
