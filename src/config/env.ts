export const openaiApiKey = process.env.OPENAI_API_KEY!;

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing required environment variable');
}
