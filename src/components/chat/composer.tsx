import type React from 'react';
import { useState, useRef, useCallback, type KeyboardEvent, useEffect, type Dispatch } from 'react';
import { Square, Mic, MicOff, Brain, Paperclip, X, MessageSquare, Puzzle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuPortal,
} from '@/components/ui/dropdown-menu';
import { AudioWaveform } from './audio-waveform';
import { generateComponentOnVercel } from '@/api/genai/genai.service';
import { useAlert } from '@/hooks/useAlert';
import useLocalStorage from '@/hooks/useLocalStorage';
import { createTask } from '@/api/tasks/tasks.service';

export type AIModel = 'casual_chat' | 'component_generator';

export const AI_MODELS: { id: AIModel; name: string; icon: React.ReactElement }[] = [
  { id: 'casual_chat', name: 'Casual Chat', icon: <MessageSquare className="w-4 h-4" /> },
  { id: 'component_generator', name: 'Component Generator', icon: <Puzzle className="w-4 h-4" /> },
];

interface ComposerProps {
  onSend: (content: string, imageData?: string) => void;
  onStop: () => void;
  isStreaming: boolean;
  onlineImage: string;
  disabled?: boolean;
  setIsLoading: Dispatch<React.SetStateAction<boolean>>;
  setOnlineImage: Dispatch<React.SetStateAction<string>>;
  selectedModel: AIModel;
  onModelChange: (model: AIModel) => void;
}

export function Composer({
  setIsLoading,
  setOnlineImage,
  onSend,
  onStop,
  isStreaming,
  disabled,
  selectedModel,
  onModelChange,
  onlineImage,
}: ComposerProps) {
  const [value, setValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [showImageBounce, setShowImageBounce] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);
  const baseTextRef = useRef('');
  const finalTranscriptsRef = useRef('');

  const { getLocalStorageItem } = useLocalStorage();
  const { addAlert } = useAlert();

  const handleGenerateComponent = async () => {
    const userId = getLocalStorageItem('user-id');
    const taskId = await createTask({
      setIsLoading: setIsLoading,
      addAlert: addAlert,
      image: onlineImage,
      userId: userId,
      prompt: value,
    });
    if (!taskId) return; // handle failure
    await generateComponentOnVercel({
      prompt: value,
      addAlert: addAlert,
      image: onlineImage,
      userId: userId,
      setIsLoading: setIsLoading,
      taskId: taskId
    });
    setValue('');
    setOnlineImage('');
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = 'en-US';

        recognitionRef.current.onresult = (event: any) => {
          let newFinalText = '';

          for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
              const transcript = event.results[i][0].transcript;
              newFinalText += transcript + ' ';
            }
          }

          if (newFinalText) {
            finalTranscriptsRef.current += newFinalText;
            setValue(baseTextRef.current + finalTranscriptsRef.current);
            setTimeout(() => handleInput(), 0);
          }
        };

        recognitionRef.current.onerror = (event: any) => {
          console.error('[v0] Speech recognition error:', event.error);
          setIsRecording(false);
        };

        recognitionRef.current.onend = () => {
          setIsRecording(false);
        };
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  useEffect(() => {
    // Trigger intro animation after mount
    setHasAnimated(true);
  }, []);

  const playClickSound = useCallback(() => {
    const audio = new Audio('/sounds/click.mp3');
    audio.volume = 0.5;
    audio.play().catch(() => {});
  }, []);

  const playRecordSound = useCallback(() => {
    const audio = new Audio('/sounds/record.mp3');
    audio.volume = 0.5;
    audio.play().catch(() => {});
  }, []);

  const toggleRecording = useCallback(() => {
    playClickSound();

    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in your browser');
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
        setMediaStream(null);
      }
    } else {
      playRecordSound();
      baseTextRef.current = value;
      finalTranscriptsRef.current = '';
      recognitionRef.current.start();
      setIsRecording(true);

      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          setMediaStream(stream);
        })
        .catch((err) => {
          console.error('[v0] Error getting microphone stream:', err);
        });
    }
  }, [isRecording, value, playClickSound, playRecordSound, mediaStream]);

  const handleInput = useCallback(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  }, []);

  const handleSend = useCallback(() => {
    if ((!value.trim() && !uploadedImage) || isStreaming || disabled) return;
    playClickSound();

    if (isRecording && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
    onSend(value || 'Describe this image', uploadedImage || undefined);
    setValue('');
    setUploadedImage(null);
    baseTextRef.current = '';
    finalTranscriptsRef.current = '';
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  }, [value, uploadedImage, isStreaming, disabled, onSend, isRecording, playClickSound]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      playClickSound();

      const file = e.target.files?.[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setUploadedImage(event.target?.result as string);
          setShowImageBounce(true);
          setTimeout(() => setShowImageBounce(false), 400);
        };
        reader.readAsDataURL(file);
      }
      e.target.value = '';
    },
    [playClickSound]
  );

  const removeImage = useCallback(() => {
    setUploadedImage(null);
  }, []);

  const currentModel = AI_MODELS.find((m) => m.id === selectedModel) || AI_MODELS[0];

  return (
    <div
      className={cn(
        'right-0 bottom-4 left-0 z-10 fixed px-4 pointer-events-none',
        hasAnimated && 'composer-intro'
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
            {uploadedImage && (
              <div className={cn('relative shrink-0', showImageBounce && 'image-bounce')}>
                <div className="w-12 h-12 overflow-hidden border rounded-lg border-stone-200">
                  <img
                    src={uploadedImage || '/placeholder.svg'}
                    alt="Uploaded image"
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                  />
                </div>
                <button
                  onClick={removeImage}
                  className="-top-1.5 -right-1.5 absolute flex justify-center items-center bg-stone-800 hover:bg-stone-900 rounded-full w-5 h-5 text-white transition-colors"
                  aria-label="Remove image"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}

            <textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                handleInput();
              }}
              onKeyDown={handleKeyDown}
              placeholder={
                isRecording ? 'Listening...' : 'Type a message... (Shift+Enter for new line)'
              }
              disabled={isStreaming || disabled}
              rows={1}
              className={cn(
                'flex-1 bg-transparent px-2 py-1.5 text-stone-800 placeholder:text-stone-400 text-sm resize-none',
                'focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed',
                'max-h-[56px] overflow-y-auto'
              )}
              aria-label="Message input"
            />

            {isRecording && (
              <div className="w-24 shrink-0">
                <AudioWaveform isRecording={isRecording} stream={mediaStream} />
              </div>
            )}

            {isStreaming ? (
              <button
                onClick={() => {
                  playClickSound();
                  onStop();
                }}
                className="relative flex items-center justify-center transition-all rounded-full cursor-pointer w-9 h-9 hover:scale-105 shrink-0"
                aria-label="Stop generating"
              >
                <div className="flex items-center justify-center w-full h-full rounded-full gradient-red-purple">
                  <Square
                    className="w-4 h-4 text-white drop-shadow-md"
                    fill="white"
                    aria-hidden="true"
                  />
                </div>
              </button>
            ) : (
              <button
                onClick={handleGenerateComponent}
                disabled={(!value.trim() && !uploadedImage) || disabled}
                className={cn(
                  'relative flex justify-center items-center rounded-full w-9 h-9 transition-all shrink-0',
                  (!value.trim() && !uploadedImage) || disabled
                    ? 'opacity-50 cursor-not-allowed'
                    : 'cursor-pointer hover:scale-105'
                )}
                aria-label="Send message"
              >
                <div className="flex items-center justify-center w-full h-full rounded-full gradient-red-purple">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="white"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.41,22.99 3.50612381,23.1 4.13399899,22.8429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 L4.13399899,1.16346272 C3.34915502,0.9 2.40734225,1.00636533 1.77946707,1.4776575 C0.994623095,2.10604706 0.837654326,3.0486314 1.15159189,3.99721575 L3.03521743,10.4382088 C3.03521743,10.5953061 3.34915502,10.7524035 3.50612381,10.7524035 L16.6915026,11.5378905 C16.6915026,11.5378905 17.1624089,11.5378905 17.1624089,12.0091827 C17.1624089,12.4744748 16.6915026,12.4744748 16.6915026,12.4744748 Z" />
                  </svg>
                </div>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              aria-label="Upload image"
            />

            <div className="relative">
              <Button
                onClick={toggleRecording}
                disabled={isStreaming || disabled}
                size="icon"
                className={cn(
                  'z-10 relative rounded-full w-9 h-9 transition-all shrink-0',
                  isRecording
                    ? 'gradient-red-purple text-white animate-bounce-subtle'
                    : 'bg-zinc-100 hover:bg-zinc-200 text-stone-700'
                )}
                aria-label={isRecording ? 'Stop recording' : 'Start voice input'}
              >
                {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </Button>
            </div>

            <Button
              onClick={() => {
                playClickSound();
                fileInputRef.current?.click();
              }}
              disabled={isStreaming || disabled}
              size="icon"
              className="transition-all rounded-full bg-zinc-100 hover:bg-gradient-red-purple w-9 h-9 text-stone-700 hover:text-white shrink-0"
              aria-label="Attach image"
            >
              <Paperclip className="w-4 h-4" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger className="bg-zinc-100" asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  disabled={isStreaming || disabled}
                  className="transition-all rounded-full bg-zinc-100 hover:bg-gradient-red-purple w-9 h-9 text-stone-700 hover:text-white shrink-0"
                  aria-label="Select AI model"
                  onClick={playClickSound}
                >
                  <Brain className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuPortal>
                <DropdownMenuContent
                  align="start"
                  side="top"
                  sideOffset={8}
                  className="z-[9999] px-2 py-2 rounded-2xl w-40"
                >
                  {AI_MODELS.map((model) => (
                    <DropdownMenuItem
                      key={model.id}
                      onClick={() => {
                        playClickSound();
                        onModelChange(model.id);
                      }}
                      className={cn(
                        'flex items-center gap-3 rounded-lg cursor-pointer',
                        selectedModel === model.id && 'bg-stone-100'
                      )}
                    >
                      <div>{model.icon}</div>
                      <span className="text-sm">{model.name}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenuPortal>
            </DropdownMenu>

            <span className="text-xs text-stone-400">{currentModel.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
