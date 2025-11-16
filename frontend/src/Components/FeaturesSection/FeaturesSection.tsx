import {
  Card,
  CardContent,
  CardTitle,
} from "../ui/card";

import { BsClockHistory, BsDatabaseCheck, BsGraphUp } from "react-icons/bs";
import { FaBrain } from "react-icons/fa6";
import { ReactNode } from "react";

interface Feature {
  icon: ReactNode; 
  title: string;
  items: string[];
}

const featuresList: Feature[] = [
  {
    icon: <FaBrain className="h-8 w-8 text-[#B388EB]" />,
    title: "Compreensão avançada",
    items: [
      "Entende intenções, não só palavras",
      "Mantém contexto em longos diálogos",
      "Respostas fluídas, precisas e naturais",
    ],
  },
  {
    icon: <BsClockHistory className="h-8 w-8 text-[#B388EB]" />,
    title: "Assistente proativo 24/7",
    items: [
      "Resolve problemas de suporte 24/7",
      "Qualifica leads em tempo real",
      "Automatiza agendamentos e tarefas repetitivas",
    ],
  },
  {
    icon: <BsDatabaseCheck className="h-8 w-8 text-[#B388EB]" />,
    title: "Conhecimento personalizado",
    items: [
      "Integrado aos seus documentos, FAQs e APIs",
      "Respostas 100% alinhadas ao seu negócio",
      "Fornece respostas precisas e confiáveis",
    ],
  },
  {
    icon: <BsGraphUp className="h-8 w-8 text-[#B388EB]" />,
    title: "Compreenda seus clientes",
    items: [
      "Veja quais são as dúvidas mais comuns",
      "Descubra o que as pessoas mais procuram",
      "Receba relatórios fáceis de entender",
    ],
  },
];

export function Features () {
    return (
        <section id="features" className="bg-[#F8FAFC] pt-20 pb-24">

            <div className="container mx-auto px-6">

                <div className="text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"> 
                        Tudo que você precisa, e mais!
                    </h2>
                    <p className="text-lg text-muted-foreground mb-14 max-w-2xl mx-auto">
                        Conheça os recursos que tornam nosso chat o mais poderoso do mercado
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 items-stretch">
                    {featuresList.map((feature: Feature) => ( 
                        <Card
                            key={feature.title}
                            className="bg-white shadow-md rounded-2xl flex flex-col"
                        >
                            <CardContent className="p-8 flex flex-col items-center grow">
                                <div className="mb-5">{feature.icon}</div>

                                <CardTitle className="text-lg font-semibold text-gray-900 text-center mb-6 min-h-14 flex items-center justify-center">
                                {feature.title}
                                </CardTitle>

                                <ul className="text-gray-600 list-inside space-y-4 text-sm text-left">
                                    {feature.items.map((item: string) => ( 
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    ))}
                </div>

            </div>

        </section>
    )
}