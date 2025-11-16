import Image from "next/image";
import { FaQuoteLeft } from "react-icons/fa";
import { Card, CardContent, CardFooter } from "../ui/card";

interface Testimonial {
  text: string;
  name: string;
  role: string;
  image: string;
}

export default function TestimonialsSection() {
  const testimonials : Testimonial[] = [
    {
      text: "O AgiliChat transformou nosso atendimento! Respostas rápidas e precisas que impressionaram nossos clientes. Essencial!",
      name: "Maria Silva",
      role: "CEO, Startup X",
      image: "/mariaIcone.jpg",
    },
    {
      text: "A eficiência que o AgiliChat trouxe ao nosso suporte é inigualável. Reduzimos custos e aumentamos a satisfação!",
      name: "João Pedro",
      role: "Gerente de Suporte, Grande Empresa",
      image: "/joao.jpg",
    },
    {
      text: "Nosso workflow melhorou drasticamente com o AgiliChat. Clientes mais felizes e nossa equipe mais produtiva. Recomendamos!",
      name: "Ana Paula",
      role: "Diretora de Operações, Consultoria Z",
      image: "/ana.jpg",
    },
  ];

  return (
    <section id="testimonials" className="bg-white py-20 mb-10">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-20">
          O que nossos clientes dizem:
        </h2>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((t: Testimonial, i: number) => (
            <Card
              key={i}
              className="bg-[#F8FAFC] shadow-lg flex flex-col relative"
            >
            
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-[#F8FAFC]">
                <FaQuoteLeft size={24} className="text-[#8093F1]" />
              </div>

              <CardContent className="pt-12 pb-6 text-center grow">
                  <p className="text-sm text-gray-700 mt-2 mb-4 text-center leading-relaxed">
                    {t.text}
                  </p>
              </CardContent>

            

                <CardFooter className="flex flex-col lg:flex-row lg:items-center lg:justify-start items-center w-full">
                  <div className="w-12 h-12 rounded-full overflow-hidden mb-3 lg:mb-0 lg:mr-3">
                    <Image
                      src={t.image}
                      alt={t.name}
                      width={50}
                      height={50}
                      className="object-cover w-full h-full"
                    />
                  </div>
                
                  <div className="flex flex-col items-center lg:items-start">
                    <p className="font-semibold text-sm text-[#6B7FE4]">{t.name}</p>
                    <p className="text-xs text-gray-700">{t.role}</p>
                  </div>
                </CardFooter>

            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
