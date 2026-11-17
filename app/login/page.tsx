import Link from "next/link";
import { AuthForm } from "@/components/AuthForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#09090b] px-4 py-10 text-white">
      <div className="w-full max-w-md">
        <div className="mb-5 text-center">
          <Link href="/" className="text-sm text-zinc-400 transition hover:text-white">← Zurück zu VYRO</Link>
        </div>
        <AuthForm />
      </div>
    </main>
  );
}
