import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonFooter,
  IonInput,
  IonButton,
  IonList,
  IonText,
  IonSpinner,
  IonChip,
  IonIcon,
} from '@ionic/react';
import React, { useState, useEffect, useRef } from 'react';
import { openaiClient } from '../../services/openaiClient';
import { Keyboard, KeyboardResize } from '@capacitor/keyboard';
import './modalChatbot.css';
import { PluginListenerHandle } from '@capacitor/core';

interface Props {
  messages: { role: 'user' | 'assistant'; content: string }[];
  setMessages: React.Dispatch<
    React.SetStateAction<
      {
        role: 'user' | 'assistant';
        content: string;
      }[]
    >
  >;
}

const ModalPageChatbot: React.FC<Props> = ({ messages, setMessages }) => {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const contentRef = useRef<HTMLIonContentElement>(null);

  useEffect(() => {
    contentRef.current?.scrollToBottom(300);
  }, [messages, isTyping]);

  // Subir a caixa de texto quando o telcado aparecer no ecrã no mobile
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  useEffect(() => {
    let showListenerHandle: any;
    let hideListenerHandle: any;

    const setupKeyboardListeners = async () => {
      showListenerHandle = await Keyboard.addListener('keyboardWillShow', (info) => {
        setKeyboardHeight(info.keyboardHeight - 68);
      });

      hideListenerHandle = await Keyboard.addListener('keyboardWillHide', () => {
        setKeyboardHeight(0);
      });
    };

    setupKeyboardListeners();

    return () => {
      if (showListenerHandle) showListenerHandle.remove();
      if (hideListenerHandle) hideListenerHandle.remove();
    };
  }, []);

  const sendMessage = async (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim() || isTyping) return;

    const userMsg = { role: 'user' as const, content: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await openaiClient.responses.create({
        model: 'gpt-4o-mini',
        prompt: {
          id: 'pmpt_69a602da74508197b9d5780831d08ad605c62581dcc3e361',
          version: '8',
        },
        input: userMsg.content, // só a mensagem do utilizador
      });
      // Obter o texto da resposta
      const content = res.output_text || '';

      setMessages((prev) => [...prev, { role: 'assistant', content }]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ textAlign: 'center' }}>
          <IonTitle style={{ color: '#272727' }}>Chatbot – Inteligência Artificial</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent ref={contentRef} style={{ '--background': '#f7f9fb' }}>
        <IonList lines="none" style={{ background: 'transparent', paddingBottom: '20px' }}>
          {messages.map((m, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start',
                margin: '12px 16px',
              }}
            >
              <div
                style={{
                  padding: '14px 18px',
                  borderRadius: m.role === 'user' ? '18px 18px 2px 18px' : '18px 18px 18px 2px',
                  background: m.role === 'user' ? 'rgb(0, 109, 9)' : '#ffffff',
                  color: m.role === 'user' ? 'white' : '#333',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  maxWidth: '85%',
                  whiteSpace: 'pre-wrap',
                  fontSize: '15px',
                }}
              >
                <span dangerouslySetInnerHTML={{ __html: m.content }} />
              </div>
            </div>
          ))}
          {isTyping && (
            <div style={{ margin: '12px 16px', display: 'flex', alignItems: 'center' }}>
              <div style={{ background: '#ffffff', padding: '10px 15px', borderRadius: '15px' }}>
                <IonText color="medium" style={{ fontSize: '13px' }}>
                  A escrever <IonSpinner name="dots" style={{ width: '20px', verticalAlign: 'middle' }} />
                </IonText>
              </div>
            </div>
          )}
        </IonList>
      </IonContent>

      <IonFooter
        className="ion-no-border"
        style={{ background: '#f7f9fb', transform: `translateY(-${keyboardHeight}px)`, transition: '0.1s' }}
      >
        <IonToolbar style={{ '--background': '#ffffff', padding: '8px' }}>
          <div
            style={{
              display: 'flex',
              background: '#f0f2f5',
              borderRadius: '25px',
              padding: '4px 15px',
              alignItems: 'center',
            }}
          >
            <IonInput
              value={input}
              placeholder="Escreve aqui..."
              onIonInput={(e) => setInput(e.detail.value!)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              style={{ '--padding-start': '10px', '--highlight-color-focused': 'rgb(0, 109, 9)' }}
            />
            <IonButton
              fill="clear"
              onClick={() => {
                sendMessage();
                console.log(messages);
              }}
              style={{ '--color': 'rgb(0, 109, 9)' }}
            >
              <b>ENVIAR</b>
            </IonButton>
          </div>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default ModalPageChatbot;
