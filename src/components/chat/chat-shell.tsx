import { useState, useEffect, useCallback } from 'react';
import { MessageSquare, User, ClipboardList } from 'lucide-react';
import { MessageList } from './message-list';
import { Composer, type AIModel } from './composer';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import LoadingComponent from '../loading-component/LoadingComponent';

// Data model for messages
export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: Date;
  imageData?: string;
}

// localStorage key for persisting messages
const STORAGE_KEY = 'chat-messages';
const MODEL_STORAGE_KEY = 'chat-selected-model';

// Generates a unique ID for messages
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

export function ChatShell() {
  const [onlineImage, setOnlineImage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [abortController, setAbortController] = useState<AbortController | null>(null);
  const [selectedModel, setSelectedModel] = useState<AIModel>('casual_chat');
  const [isLoaded, setIsLoaded] = useState(false);
  const [componentPrompt, setComponentPrompt] = useState('');

  // Load messages from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        const messagesWithDates = parsed.map((msg: Message) => ({
          ...msg,
          createdAt: new Date(msg.createdAt),
        }));
        setMessages(messagesWithDates);
      }
      const savedModel = localStorage.getItem(MODEL_STORAGE_KEY) as AIModel | null;
      if (savedModel) {
        setSelectedModel(savedModel);
      }
    } catch (e) {
      console.error('Failed to load from localStorage:', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Persist messages to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch (e) {
      console.error('Failed to save messages to localStorage:', e);
    }
  }, [messages]);

  const handleModelChange = useCallback((model: AIModel) => {
    setSelectedModel(model);
    localStorage.setItem(MODEL_STORAGE_KEY, model);
  }, []);

  // Send a message to the AI
  const sendMessage = useCallback(
    async (content: string, imageData?: string) => {
      if ((!content.trim() && !imageData) || isStreaming) return;

      setError(null);

      setIsLoading(true);

      const userMessage: Message = {
        id: generateId(),
        role: 'user',
        content: content.trim() || 'Describe this image',
        createdAt: new Date(),
        imageData,
      };

      const assistantMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content: '',
        createdAt: new Date(),
      };

      const newMessages = [...messages, userMessage, assistantMessage];
      setMessages(newMessages);
      setIsStreaming(true);

      const controller = new AbortController();
      setAbortController(controller);

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages: [...messages, userMessage].map((m) => ({
              role: m.role,
              content: m.content,
              imageData: m.imageData,
            })),
            model: selectedModel,
          }),
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();

        if (!reader) {
          throw new Error('No response body');
        }

        let accumulatedContent = '';

        while (true) {
          const { done, value } = await reader.read();

          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          accumulatedContent += chunk;

          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessage.id ? { ...msg, content: accumulatedContent } : msg
            )
          );
        }
      } catch (e) {
        if (e instanceof Error && e.name === 'AbortError') {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessage.id
                ? { ...msg, content: msg.content || '[Cancelled]' }
                : msg
            )
          );
        } else {
          console.error('Error sending message:', e);
          setError(e instanceof Error ? e.message : 'An error occurred');
          setMessages((prev) => prev.filter((msg) => msg.id !== assistantMessage.id));
        }
      } finally {
        setIsStreaming(false);
        setAbortController(null);
        setIsLoading(false);
      }
    },
    [messages, isStreaming, selectedModel]
  );

  const retry = useCallback(() => {
    if (messages.length === 0) return;
    const lastUserMessage = [...messages].reverse().find((m) => m.role === 'user');
    if (lastUserMessage) {
      const index = messages.findIndex((m) => m.id === lastUserMessage.id);
      setMessages(messages.slice(0, index));
      setError(null);
      setTimeout(() => sendMessage(lastUserMessage.content, lastUserMessage.imageData), 100);
    }
  }, [messages, sendMessage]);

  const stopStreaming = useCallback(() => {
    if (abortController) {
      abortController.abort();
    }
  }, [abortController]);

  const clearChat = useCallback(() => {
    setMessages([]);
    setError(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <div
      className="relative bg-stone-50 h-dvh"
      style={{
        boxShadow:
          'rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px, rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px',
      }}
    >
      <Button
        onClick={clearChat}
        variant="ghost"
        size="icon"
        className="absolute z-20 w-10 h-10 text-white transition-all rounded-full cursor-pointer top-4 left-4 hover:text-white hover:scale-105 gradient-red-purple"
        aria-label="Reset chat"
      >
        <MessageSquare className="w-5 h-5" />
      </Button>
      
      <Link to='/tasks'>
        <Button
          variant="ghost"
          size="icon"
          className="absolute z-20 w-10 h-10 text-white transition-all rounded-full cursor-pointer top-16 left-4 hover:text-white hover:scale-105 gradient-red-purple"
          aria-label="Reset chat"
        >
          <ClipboardList className="w-5 h-5" />
        </Button>
      </Link>

      {isLoading && <LoadingComponent />}

      <div className="absolute z-20 flex gap-2 top-4 right-4">
        <Link to="/profile">
          <Button
            onClick={clearChat}
            variant="ghost"
            size="icon"
            className="w-10 h-10 text-white transition-all rounded-full cursor-pointer hover:text-white hover:scale-105 gradient-red-purple"
            aria-label="Reset chat"
          >
            <User className="w-5 h-5" />
          </Button>
        </Link>
      </div>

      <MessageList
        messages={messages}
        isStreaming={isStreaming}
        error={error}
        onRetry={retry}
        isLoaded={isLoaded}
      />

      {selectedModel === 'component_generator' && (
        <div
          className={cn(
            'right-0 bottom-35 left-0 z-10 fixed px-4 pointer-events-none composer-intro'
          )}
        >
          <div className="relative max-w-2xl mx-auto pointer-events-auto">
            <div
              className={cn(
                'relative flex flex-col gap-3 bg-white p-4 border-0 border-stone-200 border-none rounded-3xl overflow-hidden transition-all duration-200',
                'focus-within:border-stone-300 focus-within:ring-2 focus-within:ring-stone-200'
              )}
              style={{
                boxShadow:
                  'rgba(14, 63, 126, 0.06) 0px 0px 0px 1px, rgba(42, 51, 69, 0.06) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.06) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.06) 0px 6px 6px -3px, rgba(14, 63, 126, 0.06) 0px 12px 12px -6px, rgba(14, 63, 126, 0.06) 0px 24px 24px -12px',
              }}
            >
              <div className="flex items-center gap-2">
                <textarea
                  value={onlineImage}
                  onChange={(e) => {
                    setOnlineImage(e.target.value);
                  }}
                  rows={1}
                  placeholder='Type your online accessible image url....'
                  className={cn(
                    'flex-1 bg-transparent px-2 py-1.5 text-stone-800 placeholder:text-stone-400 text-sm resize-none',
                    'focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed',
                    'max-h-[56px] overflow-y-auto'
                  )}
                  aria-label="Message input"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <Composer
        onSend={(content, imageData) => {
          const finalContent =
            selectedModel === 'component_generator' ? `${componentPrompt}\n${content}` : content;
          sendMessage(finalContent, imageData);
        }}
        onStop={stopStreaming}
        isStreaming={isStreaming}
        disabled={!!error}
        selectedModel={selectedModel}
        onModelChange={handleModelChange}
        onlineImage={onlineImage}
        setOnlineImage={setOnlineImage}
        setIsLoading={setIsLoaded}
      />
    </div>
  );
}
