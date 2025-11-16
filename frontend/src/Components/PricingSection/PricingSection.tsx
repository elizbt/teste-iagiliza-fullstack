import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { BsCheckCircleFill } from "react-icons/bs";
import Link from 'next/link';


interface Plan {
  name: string;
  description: string;
  price: string;
  features: string[];
  isPopular: boolean;
}

const plans: Plan[] = [
  {
    name: "Básico",
    description: "Para começar",
    price: "49,90",
    features: [
      "Chatbot",
      "Até 1.000 mensagens/mês",
      "Treinamento com FAQs",
      "Suporte via email",
    ],
    isPopular: false,
  },
  {
    name: "Profissional",
    description: "Para escalar",
    price: "199,90",
    features: [
      "5 Chatbot",
      "10.000 mensagens/mês",
      "Treinamento ilimitado (Docs)",
      "Suporte prioritário",
    ],
    isPopular: true,
  },
  {
    name: "Empresa",
    description: "Para grandes empresas",
    price: "299,90",
    features: [
      "Chatbots ilimitados",
      "Mensagens ilimitadas",
      "Gerente de conta dedicado",
      "Segurança e SLA avançados",
    ],
    isPopular: false,
  },
];

export default function PricingSection() {

  return (
    <section id="pricings" className="w-full py-16 md:py-24 bg-[#F8FAFC]">
      <div className="container mx-auto max-w-7xl px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-20 text-gray-900">
          Escolha o plano perfeito para você:
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan: Plan) => (
            <Card
              key={plan.name}
              className={`flex flex-col relative ${
                plan.isPopular
                  ? "border-[#B388EB] bg-[#B388EB35] border-2 shadow-xl"
                  : "bg-white shadow-lg"
              }`}
            >
              {plan.isPopular && (
                <Badge
                  className="absolute -top-5 left-1/2 -translate-x-1/2 px-6 py-2 text-base font-medium bg-[#B388EB] text-white"
                >
                  Mais Popular
                </Badge>
              )}

              <CardHeader className="pt-10 text-center">
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <CardDescription className="text-base">
                  {plan.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="grow text-center">
                <div className="text-4xl font-bold mb-6">
                  R$ {plan.price}
                  <span className="text-lg font-normal text-muted-foreground">
                    {" "}
                    /mês
                  </span>
                </div>

                <ul className="space-y-3 inline-block text-left">
                  {plan.features.map((feature: string) => ( 
                    <li
                      key={feature}
                      className="flex items-center text-gray-700"
                    >
                      <BsCheckCircleFill
                        className={`mr-2 h-5 w-5 ${
                          plan.isPopular ? "text-[#7C3AED]" : "text-gray-500"
                        }`}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="pb-8">
                  <Button size="lg" 
                      asChild
                      className={`mx-auto text-base font-semibold rounded-full py-6 w-3/4 transition-all duration-300
                        ${
                          plan.isPopular
                            ? "bg-[#7C3AED] hover:bg-[#6D28D9] text-white shadow-lg scale-105 active:scale-100"
                            : "bg-[#8093F1] hover:bg-[#5C66C0] text-white active:scale-95"
                        }`}
                    >
                      <Link href="/login">
                        Escolher Plano
                      </Link>
                  </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

