import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      <h1 className="text-6xl font-semibold mb-4">404</h1>
      <h2 className="text-2xl font-medium mb-2">Página não encontrada</h2>
      <p className="text-gray-600 mb-6">
        A página que você está procurando não existe ou foi removida.
      </p>
      <Link
        href="/"
        className="text-[#8093F1] font-medium"
      >
        Voltar para o início
      </Link>
    </div>
  );
}

