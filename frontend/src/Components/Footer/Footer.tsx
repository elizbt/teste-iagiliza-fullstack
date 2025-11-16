import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white text-gray-700 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-16 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">AgiliChat</h2>
            <p className="mt-4 text-sm text-gray-500">
              Automação que entende seu cliente e liberta sua equipe para focar
              no que realmente importa: expandir seus negócios.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900">Legal</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/terms-of-service"
                  className="text-sm text-gray-700 hover:text-[#B388EB] transition-colors"
                >
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link
                  href="privacy-policy"
                  className="text-sm text-gray-700 hover:text-[#B388EB] transition-colors"
                >
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900">Navegação</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="#features"
                  className="text-sm text-gray-700 hover:text-[#B388EB] transition-colors"
                >
                  Funcionalidades
                </Link>
              </li>
              <li>
                <Link
                  href="#testimonials"
                  className="text-sm text-gray-700 hover:text-[#B388EB] transition-colors"
                >
                  Depoimentos
                </Link>
              </li>
              <li>
                <Link
                  href="#pricings"
                  className="text-sm text-gray-700 hover:text-[#B388EB] transition-colors"
                >
                  Planos
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900">Contato</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="mailto:agilichat@gmail.com"
                  className="text-sm text-gray-700 hover:text-[#B388EB] transition-colors"
                >
                  agilichat@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+5533990909090"
                  className="text-sm text-gray-700 hover:text-[#B388EB] transition-colors"
                >
                  (33) 9 9090-9090
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-gray-200 pt-8 flex flex-col items-center justify-between md:flex-row">
          <p className="text-sm text-gray-500 order-2 md:order-1 mt-4 md:mt-0">
            © 2025 AgiliChat. Todos os direitos reservados.
          </p>
          <div className="flex space-x-6 order-1 md:order-2">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-500 hover:text-[#B388EB] transition-colors"
            >
              Facebook
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-500 hover:text-[#B388EB] transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-500 hover:text-[#B388EB] transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}