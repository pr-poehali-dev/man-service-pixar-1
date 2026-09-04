import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from '@/components/ui/icon';

interface KnowledgeBaseProps {
  onClose: () => void;
}

const KnowledgeBase = ({ onClose }: KnowledgeBaseProps) => {
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedSection, setSelectedSection] = useState<string>('');

  const truckBrands = [
    {
      id: 'man',
      name: 'MAN',
      logo: '🚛',
      color: 'red-500',
      bgColor: 'red-50',
      description: 'Немецкое качество и надёжность'
    },
    {
      id: 'volvo',
      name: 'VOLVO',
      logo: '🔷',
      color: 'blue-600',
      bgColor: 'blue-50',
      description: 'Шведские технологии безопасности'
    },
    {
      id: 'scania',
      name: 'SCANIA',
      logo: '👑',
      color: 'yellow-500',
      bgColor: 'yellow-50',
      description: 'Король дорог из Швеции'
    },
    {
      id: 'daf',
      name: 'DAF',
      logo: '🟦',
      color: 'blue-700',
      bgColor: 'blue-50',
      description: 'Голландская инженерия'
    },
    {
      id: 'mercedes',
      name: 'MERCEDES',
      logo: '⭐',
      color: 'gray-600',
      bgColor: 'gray-50',
      description: 'Звезда среди грузовиков'
    },
    {
      id: 'sitrak',
      name: 'SITRAK',
      logo: '🐉',
      color: 'green-600',
      bgColor: 'green-50',
      description: 'Китайские инновации'
    }
  ];

  const knowledgeSections = {
    maintenance: {
      title: 'Техническое обслуживание',
      icon: 'Settings',
      emoji: '🔧',
      color: 'blue-500'
    },
    diagnostics: {
      title: 'Диагностика неисправностей',
      icon: 'Stethoscope',
      emoji: '🩺',
      color: 'green-500'
    },
    engine: {
      title: 'Двигатель и трансмиссия',
      icon: 'Cog',
      emoji: '⚙️',
      color: 'orange-500'
    },
    electrical: {
      title: 'Электрика и электроника',
      icon: 'Zap',
      emoji: '⚡',
      color: 'yellow-500'
    },
    parts: {
      title: 'Запчасти и расходники',
      icon: 'Package',
      emoji: '📦',
      color: 'purple-500'
    },
    troubleshooting: {
      title: 'Частые проблемы',
      icon: 'AlertTriangle',
      emoji: '⚠️',
      color: 'red-500'
    }
  };

  const getKnowledgeContent = (brandId: string, sectionId: string) => {
    const baseContent = {
      maintenance: {
        man: {
          title: "Техническое обслуживание MAN",
          content: [
            "🔧 Регламентное ТО каждые 15 000 км",
            "🛢️ Замена масла двигателя: 5W-30 или 10W-40",
            "🔍 Проверка системы AdBlue каждые 10 000 км", 
            "⚙️ Обслуживание коробки передач ZF каждые 150 000 км",
            "🛡️ Замена воздушного фильтра каждые 30 000 км"
          ]
        },
        volvo: {
          title: "Техническое обслуживание VOLVO",
          content: [
            "🔧 Регламентное ТО каждые 20 000 км",
            "🛢️ Замена масла двигателя: Volvo VDS-4.5",
            "🔍 Обслуживание системы I-Shift каждые 100 000 км",
            "⚙️ Проверка тормозной системы каждые 40 000 км",
            "🛡️ Замена топливного фильтра каждые 40 000 км"
          ]
        },
        scania: {
          title: "Техническое обслуживание SCANIA",
          content: [
            "🔧 Интервал ТО до 90 000 км (в зависимости от режима)",
            "🛢️ Замена масла: Scania LDF-4 или аналог",
            "🔍 Обслуживание Opticruise каждые 150 000 км",
            "⚙️ Проверка системы EMS каждые 20 000 км",
            "🛡️ Замена воздушного фильтра каждые 60 000 км"
          ]
        },
        daf: {
          title: "Техническое обслуживание DAF",
          content: [
            "🔧 Регламентное ТО каждые 30 000 км",
            "🛢️ Замена масла двигателя PACCAR: 5W-30",
            "🔍 Обслуживание TraXon каждые 200 000 км",
            "⚙️ Проверка системы DAVIE каждые 15 000 км",
            "🛡️ Замена салонного фильтра каждые 40 000 км"
          ]
        },
        mercedes: {
          title: "Техническое обслуживание MERCEDES",
          content: [
            "🔧 Регламентное ТО каждые 40 000 км",
            "🛢️ Замена масла: Mercedes MB 228.31",
            "🔍 Обслуживание PowerShift каждые 160 000 км",
            "⚙️ Проверка системы BlueTec каждые 20 000 км",
            "🛡️ Замена масляного фильтра каждые 40 000 км"
          ]
        },
        sitrak: {
          title: "Техническое обслуживание SITRAK",
          content: [
            "🔧 Регламентное ТО каждые 10 000 км",
            "🛢️ Замена масла двигателя MAN: 10W-40",
            "🔍 Обслуживание коробки ZF каждые 120 000 км",
            "⚙️ Проверка системы SCR каждые 15 000 км",
            "🛡️ Замена воздушного фильтра каждые 20 000 км"
          ]
        }
      },
      diagnostics: {
        man: {
          title: "Диагностика неисправностей MAN",
          content: [
            "🩺 Использование MAN-cats III для диагностики",
            "📊 Проверка кодов ошибок через EDC/MDC",
            "🔍 Диагностика AdBlue системы",
            "⚡ Проверка датчиков NOx и сажевого фильтра",
            "🛠️ Калибровка системы управления двигателем"
          ]
        },
        volvo: {
          title: "Диагностика неисправностей VOLVO",
          content: [
            "🩺 Использование VOLVO Tech Tool для диагностики",
            "📊 Проверка системы D13C/D16G двигателя",
            "🔍 Диагностика I-Shift автоматической КПП",
            "⚡ Проверка системы VEB+ торможения",
            "🛠️ Анализ работы системы экономии топлива"
          ]
        },
        scania: {
          title: "Диагностика неисправностей SCANIA",
          content: [
            "🩺 Использование Scania Diagnos & Programmer",
            "📊 Диагностика двигателей DC09/DC13/DC16",
            "🔍 Проверка Opticruise автоматизированной КПП",
            "⚡ Анализ работы системы EMS",
            "🛠️ Калибровка датчиков и актуаторов"
          ]
        },
        daf: {
          title: "Диагностика неисправностей DAF",
          content: [
            "🩺 Использование DAVIE для диагностики",
            "📊 Проверка двигателей PACCAR MX-11/MX-13",
            "🔍 Диагностика TraXon автоматизированной КПП",
            "⚡ Проверка системы управления VIC-3",
            "🛠️ Анализ работы системы EAS пневмоподвески"
          ]
        },
        mercedes: {
          title: "Диагностика неисправностей MERCEDES",
          content: [
            "🩺 Использование Mercedes STAR Diagnosis",
            "📊 Диагностика двигателей OM470/OM471",
            "🔍 Проверка PowerShift автоматизированной КПП",
            "⚡ Анализ системы BlueTec SCR",
            "🛠️ Калибровка системы Brake Assist"
          ]
        },
        sitrak: {
          title: "Диагностика неисправностей SITRAK",
          content: [
            "🩺 Использование диагностического сканера",
            "📊 Проверка двигателей MAN D20/D26",
            "🔍 Диагностика коробки передач ZF",
            "⚡ Проверка системы SCR и сажевого фильтра",
            "🛠️ Анализ работы системы EBS торможения"
          ]
        }
      }
    };

    const brandContent = baseContent[sectionId as keyof typeof baseContent];
    return brandContent?.[brandId as keyof typeof brandContent] || {
      title: `${knowledgeSections[sectionId as keyof typeof knowledgeSections]?.title} - ${truckBrands.find(b => b.id === brandId)?.name}`,
      content: ["📚 Информация находится в разработке...", "🔄 Скоро здесь будет подробное руководство!"]
    };
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-white shadow-2xl border-4 border-pixar-blue/20">
        <CardHeader className="bg-gradient-to-r from-pixar-blue to-pixar-green text-white relative">
          <div className="absolute top-4 right-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              <Icon name="X" size={20} />
            </Button>
          </div>
          <CardTitle className="text-3xl font-heading font-bold flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center animate-bounce-slow">
              <Icon name="BookOpen" size={24} className="text-pixar-blue" />
            </div>
            📚 База знаний ТТ Сервис
          </CardTitle>
          <p className="text-pixar-light opacity-90">
            Вся информация по обслуживанию и ремонту грузовиков! 🚛✨
          </p>
        </CardHeader>
        
        <CardContent className="p-8">
          {!selectedBrand ? (
            // Выбор марки
            <div>
              <h3 className="text-3xl font-heading font-bold text-pixar-dark mb-8 text-center">
                Выберите марку грузовика 🚛
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {truckBrands.map((brand) => (
                  <Card 
                    key={brand.id}
                    className={`cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-4 border-gray-100 hover:border-${brand.color}/30 group`}
                    onClick={() => setSelectedBrand(brand.id)}
                  >
                    <CardContent className={`p-8 text-center bg-gradient-to-br from-${brand.bgColor} to-white group-hover:from-${brand.bgColor} group-hover:to-${brand.bgColor}/50 transition-all duration-300`}>
                      <div className="text-6xl mb-4 group-hover:animate-bounce-slow">
                        {brand.logo}
                      </div>
                      <h4 className={`text-2xl font-heading font-bold mb-2 text-${brand.color} group-hover:scale-110 transition-transform duration-300`}>
                        {brand.name}
                      </h4>
                      <p className="text-gray-600 text-sm">{brand.description}</p>
                      <div className={`mt-4 w-full h-1 bg-${brand.color} rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300`}></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : !selectedSection ? (
            // Выбор раздела
            <div>
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-3xl font-heading font-bold text-pixar-dark flex items-center gap-3">
                  {truckBrands.find(b => b.id === selectedBrand)?.logo}
                  {truckBrands.find(b => b.id === selectedBrand)?.name} - Выберите раздел
                </h3>
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedBrand('')}
                  className="border-2 border-pixar-blue text-pixar-blue hover:bg-pixar-blue hover:text-white"
                >
                  <Icon name="ArrowLeft" size={16} className="mr-2" />
                  Назад
                </Button>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(knowledgeSections).map(([key, section]) => (
                  <Card 
                    key={key}
                    className={`cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-4 border-gray-100 hover:border-${section.color}/30 group`}
                    onClick={() => setSelectedSection(key)}
                  >
                    <CardContent className="p-6 text-center">
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-${section.color} flex items-center justify-center group-hover:animate-bounce-slow shadow-lg`}>
                        <Icon name={section.icon as any} size={24} className="text-white" />
                      </div>
                      <h4 className={`text-xl font-heading font-bold mb-2 text-pixar-dark group-hover:text-${section.color} transition-colors duration-300`}>
                        {section.emoji} {section.title}
                      </h4>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            // Содержимое раздела
            <div>
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-heading font-bold text-pixar-dark flex items-center gap-3">
                  {truckBrands.find(b => b.id === selectedBrand)?.logo}
                  {getKnowledgeContent(selectedBrand, selectedSection).title}
                </h3>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedSection('')}
                    className="border-2 border-pixar-blue text-pixar-blue hover:bg-pixar-blue hover:text-white"
                  >
                    <Icon name="ArrowLeft" size={16} className="mr-2" />
                    К разделам
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {setSelectedBrand(''); setSelectedSection('');}}
                    className="border-2 border-gray-400 text-gray-600 hover:bg-gray-400 hover:text-white"
                  >
                    <Icon name="Home" size={16} className="mr-2" />
                    Марки
                  </Button>
                </div>
              </div>
              
              <Card className="border-4 border-pixar-light/30">
                <CardContent className="p-8">
                  <div className="space-y-4">
                    {getKnowledgeContent(selectedBrand, selectedSection).content.map((item, index) => (
                      <div 
                        key={index} 
                        className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-pixar-light/20 transition-colors duration-300 group"
                      >
                        <div className="w-8 h-8 bg-pixar-blue rounded-full flex items-center justify-center text-white font-bold text-sm group-hover:animate-bounce-slow">
                          {index + 1}
                        </div>
                        <p className="text-gray-700 text-lg leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 p-6 bg-gradient-to-r from-pixar-orange/10 to-pixar-blue/10 rounded-xl border-2 border-pixar-orange/20">
                    <div className="flex items-center gap-3 mb-3">
                      <Icon name="Phone" size={20} className="text-pixar-orange" />
                      <h4 className="font-bold text-pixar-dark">Нужна помощь?</h4>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Наши механики-космонавты готовы помочь с любыми вопросами! 🚀
                    </p>
                    <div className="flex gap-3">
                      <Button className="bg-pixar-orange hover:bg-orange-600 text-white">
                        <Icon name="Phone" size={16} className="mr-2" />
                        Позвонить: +7 922 479-86-08
                      </Button>
                      <Button variant="outline" className="border-2 border-pixar-blue text-pixar-blue hover:bg-pixar-blue hover:text-white">
                        <Icon name="Mail" size={16} className="mr-2" />
                        info@tt-servis.ru
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default KnowledgeBase;