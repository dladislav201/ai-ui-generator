import { useState } from 'react';
import { Message, ChatError } from '@/models';
import { isValidPrompt, asStringContent } from '@/utils';
import axios from 'axios';

export function useChat(systemPrompt: string) {
  const [history, setHistory] = useState<Message[]>([
    {
      role: 'system',
      content: systemPrompt,
    },
  ]);
  const [error, setError] = useState<ChatError | null>(null);
  const [loading, setLoading] = useState(false);

  async function send(prompt: string) {
    if (!isValidPrompt(prompt)) {
      const ce = new ChatError(
        'Your request is too short or unclear. Please use at least two clear words.',
      );
      setError(ce);
      throw ce;
    }

    setError(null);
    setLoading(true);

    const userMsg: Message = { role: 'user', content: prompt };
    const updatedHistory = [...history, userMsg];

    try {
      const safeHistory = updatedHistory.map(asStringContent);

      const { data } = await axios.post('/api/table', {
        messages: safeHistory,
      });

      if (data.error) {
        throw new Error(data.error);
      }

      const assistantMsg: Message = { role: 'assistant', content: data.table };
      setHistory((prev) => [...prev, userMsg, assistantMsg]);

      return data.table;
    } catch (err: unknown) {
      console.error(err);
      let ce: ChatError;

      if (axios.isAxiosError(err)) {
        const msg = err.response?.data?.error ?? err.message;
        ce = new ChatError(msg, err.response?.status);
      } else {
        ce = new ChatError((err as Error).message);
      }

      setError(ce);
      throw ce;
    } finally {
      setLoading(false);
    }
  }

  return { history, error, loading, send };
}
