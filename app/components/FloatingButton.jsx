import { useRouter } from 'next/navigation';

export default function FloatingButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push('/create-quote')}
      className="fixed bottom-8 right-8 bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl shadow-lg hover:bg-blue-600"
    >
      +
    </button>
  );
}
