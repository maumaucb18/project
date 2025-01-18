import { useState } from 'react';
import { Truck, Shield, ClipboardCheck, AlertTriangle, ChevronDown, Info, FileText } from 'lucide-react';

interface InspectionType {
  id: string;
  name: string;
  description: string;
  articles: {
    title: string;
    content: string[];
  }[];
}

interface Product {
  id: string;
  name: string;
  class: string;
  subclass?: string;
  requirements: string[];
  regulations: string[];
}

const inspectionTypes: InspectionType[] = [
  {
    id: 'vehicle',
    name: 'Inspeção Veicular',
    description: 'Verificação das condições do veículo e documentação',
    articles: [
      {
        title: '4.1 Documentação do Veículo',
        content: [
          'Certificado de Registro e Licenciamento do Veículo (CRLV)',
          'Certificado de Inspeção para o Transporte de Produtos Perigosos (CIPP) válido',
          'Certificado de Inspeção Veicular (CIV) válido',
          'Documento que comprove a realização de manutenção preventiva'
        ]
      },
      {
        title: '4.2 Condições do Veículo',
        content: [
          'Tacógrafo em funcionamento e aferido',
          'Pneus em bom estado de conservação',
          'Sistema de freios em perfeito funcionamento',
          'Ausência de vazamentos no sistema hidráulico',
          'Equipamentos de segurança obrigatórios',
          'Sistema elétrico em boas condições'
        ]
      },
      {
        title: '4.3 Sinalização',
        content: [
          'Rótulos de risco e painéis de segurança conforme NBR 7500',
          'Símbolos de manuseio conforme NBR 7500',
          'Identificação das unidades de transporte',
          'Sinalização refletiva conforme legislação de trânsito'
        ]
      }
    ]
  },
  {
    id: 'cargo',
    name: 'Inspeção de Carga',
    description: 'Verificação da carga e sua documentação',
    articles: [
      {
        title: '5.1 Documentação da Carga',
        content: [
          'Documento Fiscal com descrição dos produtos',
          'Ficha de Emergência conforme NBR 7503',
          'Envelope para Transporte conforme NBR 7503',
          'Declaração do Expedidor',
          'Autorização Especial de Trânsito (AET) quando aplicável'
        ]
      },
      {
        title: '5.2 Acondicionamento',
        content: [
          'Embalagens homologadas e dentro do prazo de validade',
          'Compatibilidade entre produtos transportados',
          'Amarração e estiva adequadas',
          'Estado de conservação das embalagens',
          'Identificação e rotulagem das embalagens'
        ]
      },
      {
        title: '5.3 Quantidades',
        content: [
          'Verificação das quantidades limitadas por unidade de transporte',
          'Respeito aos limites de isenção quando aplicável',
          'Quantidade compatível com a capacidade do veículo'
        ]
      }
    ]
  },
  {
    id: 'equipment',
    name: 'Equipamentos de Segurança',
    description: 'Verificação dos equipamentos de proteção e emergência',
    articles: [
      {
        title: '6.1 Equipamentos Obrigatórios',
        content: [
          'Conjunto de equipamentos para situações de emergência',
          'Extintores de incêndio adequados e dentro da validade',
          'Equipamento de Proteção Individual (EPI) para a equipe',
          'Equipamentos para sinalização de emergência'
        ]
      },
      {
        title: '6.2 Kit de Emergência',
        content: [
          'Material para sinalização: 4 cones, fita zebrada',
          'Calços de segurança dimensionados ao peso do veículo',
          'Lanternas de advertência ou sinalizadores luminosos',
          'Pá de material antifaiscante',
          'Material absorvente adequado ao produto'
        ]
      },
      {
        title: '6.3 EPIs Obrigatórios',
        content: [
          'Capacete de segurança',
          'Luvas de proteção adequadas ao produto',
          'Óculos de proteção',
          'Máscaras de proteção respiratória quando aplicável',
          'Vestimenta de proteção conforme o risco'
        ]
      }
    ]
  }
];

const products: Product[] = [
  {
    id: 'class1',
    name: 'Explosivos',
    class: 'Classe 1 - Explosivos',
    requirements: [
      'Verificar compatibilidade entre explosivos',
      'Conferir documentação específica para transporte de explosivos',
      'Verificar sinalização específica para explosivos',
      'Conferir isolamento da carga',
      'Verificar sistema de proteção contra descargas atmosféricas'
    ],
    regulations: [
      'Resolução ANTT 5.998/2022 - Capítulo 2.1',
      'Decreto 10.030/2019 - Produtos Controlados',
      'NBR 7500 - Sinalização para Explosivos'
    ]
  },
  {
    id: 'class2',
    name: 'Gases',
    class: 'Classe 2 - Gases',
    requirements: [
      'Verificar válvulas de segurança dos recipientes',
      'Conferir fixação dos cilindros',
      'Verificar data de teste hidrostático',
      'Conferir ventilação adequada',
      'Verificar presença de vazamentos'
    ],
    regulations: [
      'Resolução ANTT 5.998/2022 - Capítulo 2.2',
      'NBR 13720 - Cilindros para Gases',
      'NR 32 - Segurança com Gases'
    ]
  },
  {
    id: 'class3',
    name: 'Líquidos Inflamáveis',
    class: 'Classe 3 - Líquidos Inflamáveis',
    requirements: [
      'Verificar vedação das embalagens',
      'Conferir sistema de contenção de vazamentos',
      'Verificar aterramento do veículo',
      'Conferir equipamentos de combate a incêndio',
      'Verificar temperatura do compartimento de carga'
    ],
    regulations: [
      'Resolução ANTT 5.998/2022 - Capítulo 2.3',
      'NBR 7503 - Ficha de Emergência',
      'NR 20 - Líquidos Combustíveis e Inflamáveis'
    ]
  },
  {
    id: 'class4',
    name: 'Sólidos Inflamáveis',
    class: 'Classe 4 - Sólidos Inflamáveis',
    requirements: [
      'Verificar embalagens quanto a umidade',
      'Conferir isolamento térmico',
      'Verificar compatibilidade com outros produtos',
      'Conferir ventilação adequada',
      'Verificar temperatura do compartimento'
    ],
    regulations: [
      'Resolução ANTT 5.998/2022 - Capítulo 2.4',
      'NBR 14619 - Incompatibilidade Química',
      'NR 19 - Explosivos'
    ]
  },
  {
    id: 'class5',
    name: 'Substâncias Oxidantes',
    class: 'Classe 5 - Substâncias Oxidantes',
    requirements: [
      'Verificar segregação de materiais combustíveis',
      'Conferir embalagens quanto a contaminação',
      'Verificar sistema de controle de temperatura',
      'Conferir equipamentos de proteção específicos',
      'Verificar sinalização de risco'
    ],
    regulations: [
      'Resolução ANTT 5.998/2022 - Capítulo 2.5',
      'NBR 7500 - Identificação para Transporte',
      'NR 26 - Sinalização de Segurança'
    ]
  },
  {
    id: 'class6',
    name: 'Substâncias Tóxicas',
    class: 'Classe 6 - Substâncias Tóxicas',
    requirements: [
      'Verificar equipamentos de proteção respiratória',
      'Conferir sistema de contenção de vazamentos',
      'Verificar kit de descontaminação',
      'Conferir documentação específica',
      'Verificar isolamento da carga'
    ],
    regulations: [
      'Resolução ANTT 5.998/2022 - Capítulo 2.6',
      'NBR 14725 - FISPQ',
      'NR 15 - Atividades Insalubres'
    ]
  },
  {
    id: 'class7',
    name: 'Materiais Radioativos',
    class: 'Classe 7 - Materiais Radioativos',
    requirements: [
      'Verificar documentação da CNEN',
      'Conferir níveis de radiação',
      'Verificar blindagem específica',
      'Conferir sinalização radiológica',
      'Verificar equipamentos de monitoramento'
    ],
    regulations: [
      'Resolução ANTT 5.998/2022 - Capítulo 2.7',
      'CNEN NE 5.01 - Transporte de Materiais Radioativos',
      'NR 32 - Segurança Radiológica'
    ]
  },
  {
    id: 'class8',
    name: 'Substâncias Corrosivas',
    class: 'Classe 8 - Substâncias Corrosivas',
    requirements: [
      'Verificar resistência das embalagens',
      'Conferir sistema de neutralização',
      'Verificar equipamentos de proteção química',
      'Conferir compatibilidade de materiais',
      'Verificar sistema de contenção'
    ],
    regulations: [
      'Resolução ANTT 5.998/2022 - Capítulo 2.8',
      'NBR 14619 - Incompatibilidade Química',
      'NR 32 - Segurança Química'
    ]
  },
  {
    id: 'class9',
    name: 'Substâncias Perigosas Diversas',
    class: 'Classe 9 - Substâncias Perigosas Diversas',
    requirements: [
      'Verificar documentação específica',
      'Conferir condições especiais de transporte',
      'Verificar sinalização apropriada',
      'Conferir equipamentos de proteção',
      'Verificar procedimentos de emergência'
    ],
    regulations: [
      'Resolução ANTT 5.998/2022 - Capítulo 2.9',
      'NBR 7500 - Sinalização',
      'NR 31 - Segurança Química'
    ]
  }
];

function App() {
  const [selectedInspection, setSelectedInspection] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  const selectedProductData = products.find(p => p.id === selectedProduct);
  const selectedInspectionData = inspectionTypes.find(i => i.id === selectedInspection);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <header className="bg-blue-600 text-white p-4 shadow-lg">
        <div className="container mx-auto flex items-center gap-2">
          <Truck className="w-8 h-8" />
          <h1 className="text-2xl font-bold">Inspeção de Produtos Perigosos</h1>
        </div>
      </header>

      <main className="container mx-auto p-4 space-y-6">
        <section className="bg-white rounded-lg shadow-md p-6 transform transition-all hover:scale-[1.01]">
          <h2 className="text-xl font-semibold text-blue-800 flex items-center gap-2 mb-4">
            <Shield className="w-6 h-6" />
            Tipo de Inspeção
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {inspectionTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedInspection(type.id)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedInspection === type.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <h3 className="font-semibold text-blue-900">{type.name}</h3>
                <p className="text-sm text-gray-600">{type.description}</p>
              </button>
            ))}
          </div>
        </section>

        {selectedInspectionData && (
          <section className="bg-white rounded-lg shadow-md p-6 animate-fadeIn">
            <h2 className="text-xl font-semibold text-blue-800 flex items-center gap-2 mb-4">
              <FileText className="w-6 h-6" />
              Procedimentos de Inspeção
            </h2>
            <div className="space-y-6">
              {selectedInspectionData.articles.map((article, index) => (
                <div key={index} className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">{article.title}</h3>
                  <ul className="space-y-2">
                    {article.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center gap-2 text-blue-800">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {selectedInspection && (
          <section className="bg-white rounded-lg shadow-md p-6 animate-fadeIn transform transition-all hover:scale-[1.01]">
            <h2 className="text-xl font-semibold text-blue-800 flex items-center gap-2 mb-4">
              <AlertTriangle className="w-6 h-6" />
              Produto Perigoso
            </h2>
            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-4 rounded-lg border-2 border-gray-200 flex justify-between items-center"
              >
                <span>{selectedProduct ? products.find(p => p.id === selectedProduct)?.name : 'Selecione o produto'}</span>
                <ChevronDown className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              {isOpen && (
                <div className="absolute w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-96 overflow-y-auto">
                  {products.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => {
                        setSelectedProduct(product.id);
                        setIsOpen(false);
                      }}
                      className="w-full p-4 text-left hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0"
                    >
                      <div className="font-semibold text-blue-900">{product.name}</div>
                      <div className="text-sm text-gray-600">{product.class}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {selectedProductData && (
          <section className="bg-white rounded-lg shadow-md p-6 animate-fadeIn">
            <h2 className="text-xl font-semibold text-blue-800 flex items-center gap-2 mb-4">
              <ClipboardCheck className="w-6 h-6" />
              Requisitos de Inspeção
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-blue-700 mb-2 flex items-center gap-2">
                  <Info className="w-5 h-5" />
                  Itens a verificar
                </h3>
                <ul className="space-y-2">
                  {selectedProductData.requirements.map((req, index) => (
                    <li key={index} className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-blue-700 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Regulamentações
                </h3>
                <ul className="space-y-2">
                  {selectedProductData.regulations.map((reg, index) => (
                    <li key={index} className="flex items-center gap-2 p-2 bg-red-50 rounded-lg text-red-700">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      {reg}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;