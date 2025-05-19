import { NextResponse, NextRequest } from 'next/server';
import { openaiApiKey } from '@/config';
import { tableFunction } from '@/data';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: openaiApiKey });

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages,
      temperature: 0.6,
      max_tokens: 4096,
      tools: tableFunction,
      tool_choice: { type: 'function', function: { name: 'tableFunction' } },
    });

    const toolCalls = completion.choices[0].message.tool_calls;

    if (!toolCalls || toolCalls.length === 0) {
      return NextResponse.json(
        { error: 'Something went wrong. Please try again.' },
        { status: 400 },
      );
    }

    const parsed = JSON.parse(toolCalls[0].function.arguments);

    return NextResponse.json({ table: parsed }, { status: 200 });
  } catch (err: unknown) {
    console.error(err);
    const errMsg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}
