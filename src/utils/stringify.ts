import { Message } from '@/models';

export function asStringContent(m: Message): Message {
  return typeof m.content === 'string'
    ? m
    : { ...m, content: JSON.stringify(m.content) };
}
