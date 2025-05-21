export function isValidPrompt(prompt: string) {
  const t = prompt.trim();
  return (
    t.length > 5 && t.split(/\s+/).length >= 2 && /[aeiouyаеиоуяиюєії]/i.test(t)
  );
}
