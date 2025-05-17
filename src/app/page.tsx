import { PromptField, Table } from '@/components';

export default function Home() {
  return (
    <main className="flex h-[100dvh]">
      <div className="relative flex w-full p-3">
        <PromptField />
        <Table />
      </div>
    </main>
  );
}
