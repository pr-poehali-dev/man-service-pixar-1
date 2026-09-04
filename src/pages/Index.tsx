import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from '@/components/ui/icon';
import BookingCalendar from '@/components/BookingCalendar';
import KnowledgeBase from '@/components/KnowledgeBase';
import AdminPanel from '@/components/AdminPanel';
import func2url from '../../func2url.json';

const Index = () => {
  const [showBookingCalendar, setShowBookingCalendar] = useState(false);
  const [showKnowledgeBase, setShowKnowledgeBase] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [password, setPassword] = useState('');
  const [isChecking, setIsChecking] = useState(false);

  const handleAdminAccess = async () => {
    setIsChecking(true);
    try {
      const response = await fetch(func2url['admin-auth'], {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const data = await response.json();
      if (data.success) {
        setShowAdminPanel(true);
        setShowPasswordPrompt(false);
        setPassword('');
      } else {
        alert('Неверный пароль!');
      }
    } catch (error) {
      alert('Ошибка проверки пароля. Попробуйте ещё раз.');
    } finally {
      setIsChecking(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-pixar-light to-blue-50 overflow-x-hidden">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b-4 border-pixar-orange sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-pixar-orange to-red-500 rounded-full flex items-center justify-center shadow-lg animate-bounce-slow">
              <Icon name="Truck" size={28} className="text-white" />
            </div>
            <h1 className="text-3xl font-heading font-bold text-pixar-dark">
              АвтоСервис Мастер
            </h1>
            <div className="text-sm font-medium text-pixar-orange">
              "Техобслуживание и ремонт в Тюмени"
            </div>
          </div>
          <nav className="hidden md:flex space-x-6">
            {["Главная", "Услуги ТО", "Диагностика", "Ремонт", "Отзывы", "Контакты"].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`} 
                className="text-pixar-dark hover:text-pixar-orange transition-all duration-300 hover:scale-105 font-medium relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pixar-orange transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            <Button
              onClick={() => setShowPasswordPrompt(true)}
              className="bg-pixar-blue hover:bg-pixar-blue/80 text-white text-sm px-4 py-2"
            >
              <Icon name="Settings" size={16} className="mr-2" />
              Админ
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section - Pixar Magic */}
      <section id="главная" className="py-20 px-4 relative">
        <div className="container mx-auto text-center relative">
          {/* Floating Tools Characters */}
          <div className="absolute top-10 left-10 animate-float">
            <img 
              src="/img/dd3dee4c-d773-4617-a8f8-83e026798bba.jpg" 
              alt="Профессиональные инструменты для техобслуживания авто" 
              className="w-20 h-20 rounded-full shadow-lg hover:animate-wiggle cursor-pointer"
            />
          </div>
          
          <div className="absolute top-20 right-20 animate-float" style={{ animationDelay: '1s' }}>
            <img 
              src="/img/c984f0b1-54b0-4d71-97bc-752a2a1a4c23.jpg" 
              alt="Оборудование автосервиса для ремонта машин" 
              className="w-24 h-24 rounded-full shadow-lg hover:animate-bounce cursor-pointer"
            />
          </div>

          {/* Main Hero Content */}
          <div className="mb-12 relative">
            <img 
              src="/img/d3e51891-70db-425d-b1c8-66ccbad97401.jpg" 
              alt="Профессиональный автосервис в Тюмени - качественное ТО и ремонт" 
              className="mx-auto w-full max-w-3xl rounded-3xl shadow-2xl hover:scale-105 transition-transform duration-500 cursor-pointer"
            />
            
            {/* Wise Old Jeep in Corner */}
            <div className="absolute bottom-4 left-4 animate-wink">
              <img 
                src="/img/aa0bcdd6-9dcc-428f-9275-ecc3a6cdfc37.jpg" 
                alt="Опытные мастера по ремонту автомобилей" 
                className="w-20 h-20 rounded-lg shadow-lg hover:animate-pulse-slow cursor-pointer"
              />
            </div>
          </div>

          {/* Main Headlines with Pixar Style */}
          <div className="relative">
            <h1 className="text-6xl md:text-8xl font-heading font-bold mb-6 text-pixar-dark leading-tight">
              <span className="text-pixar-orange animate-pulse-slow">MAN сервис</span>{' '}
              <span className="text-pixar-blue">в Тюмени!</span>
            </h1>
            <p className="text-2xl md:text-3xl mb-8 text-pixar-dark font-medium relative">
              ТО и ремонт грузовиков MAN (70%), DAF, Volvo, Mercedes, Scania 🚚
              <span className="absolute -top-2 -right-2 text-4xl animate-bounce">🔧</span>
            </p>
          </div>

          {/* Pixar-Style Action Buttons */}
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <Button 
              onClick={() => {
                console.log('Главная кнопка ТО нажата, showBookingCalendar will be true');
                setShowBookingCalendar(true);
              }}
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-600 text-white text-xl px-10 py-8 rounded-full transform hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-green-500/50 animate-pulse-slow"
            >
              <Icon name="Wrench" size={24} className="mr-3" />
              🚛 ТО MAN грузовиков!
            </Button>
            <Button variant="outline" className="border-4 border-pixar-blue text-pixar-blue hover:bg-pixar-blue hover:text-white text-xl px-10 py-8 rounded-full transform hover:scale-110 transition-all duration-300 shadow-2xl">
              <Icon name="Settings" size={24} className="mr-3" />
              🚚 Ремонт DAF, Volvo
            </Button>
            <Button 
              onClick={() => setShowKnowledgeBase(true)}
              className="bg-gradient-to-r from-pixar-blue to-blue-600 hover:from-blue-600 hover:to-pixar-blue text-white text-xl px-10 py-8 rounded-full transform hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-blue-500/50 animate-float"
            >
              <Icon name="BookOpen" size={24} className="mr-3" />
              📚 База знаний
            </Button>
            <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-600 text-white text-xl px-10 py-8 rounded-full transform hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-green-500/50 animate-bounce-slow">
              <Icon name="Zap" size={24} className="mr-3" />
              🚚 Эвакуация грузовиков
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section - "Почему нам доверяют сердца... то есть моторы?" */}
      <section id="услуги" className="py-20 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-heading font-bold mb-6 text-pixar-dark">
              Почему нам доверяют сердца... 💝<br/>
              <span className="text-pixar-orange">то есть моторы?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Наши ожившие инструменты работают с душой и профессионализмом космического уровня! 🚀
            </p>
          </div>

          {/* Animated Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "Stethoscope",
                title: "Диагностика \"как в больнице\"",
                description: "Компьютерная диагностика с улыбкой и точностью до винтика",
                color: "pixar-blue",
                emoji: "🩺",
                animation: "animate-pulse-slow"
              },
              {
                icon: "Package",
                title: "Качественные запчасти",
                description: "Счастливые коробки с деталями прямо от производителя",
                color: "pixar-green",
                emoji: "📦",
                animation: "animate-bounce-slow"
              },
              {
                icon: "Heart",
                title: "Честные цены",
                description: "Прозрачность и дружелюбие в каждом счёте",
                color: "pixar-orange",
                emoji: "💰",
                animation: "animate-float"
              },
              {
                icon: "Wrench",
                title: "Ремонт двигателя",
                description: "Капитальный и текущий ремонт с заботой космонавта",
                color: "pixar-yellow",
                emoji: "🔧",
                animation: "animate-wiggle"
              },
              {
                icon: "Zap",
                title: "Электрика",
                description: "Искры радости в каждом проводе",
                color: "pixar-blue",
                emoji: "⚡",
                animation: "animate-pulse-slow"
              }
            ].map((service, index) => (
              <Card key={index} className="hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border-4 border-gray-100 hover:border-pixar-orange/30 group cursor-pointer relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-pixar-light/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="text-center relative z-10">
                  <div className={`w-20 h-20 mx-auto mb-6 rounded-full bg-${service.color} flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300 ${service.animation}`}>
                    <Icon name={service.icon as any} size={36} className="text-white" />
                  </div>
                  <CardTitle className="text-2xl font-heading font-bold text-pixar-dark group-hover:text-pixar-orange transition-colors duration-300">
                    {service.emoji} {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center text-lg leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <div className="text-center">
                    <Button
                      onClick={() => {
                        console.log('Кнопка записи нажата');
                        setShowBookingCalendar(true);
                      }}
                      className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-600 text-white px-6 py-3 rounded-full font-bold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-green-500/50"
                    >
                      <Icon name="Calendar" size={16} className="mr-2" />
                      Записаться
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section - Cosmic Theme */}
      <section id="о-нас" className="py-20 bg-gradient-to-r from-pixar-blue to-pixar-green text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMSIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC4xIi8+Cjwvc3ZnPgo=')] animate-pulse-slow"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-heading font-bold mb-8">
              О нас 🏆🚀
            </h2>
            <p className="text-xl md:text-2xl mb-8 leading-relaxed">
              Мы — команда профессиональных механиков-космонавтов с 15-летним опытом полётов... 
              то есть работы с грузовиками всех марок! Каждый наш специалист прошёл сертификацию 
              в космической академии сервиса.
            </p>

            {/* Animated Statistics */}
            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <div className="text-center group cursor-pointer">
                <div className="text-6xl md:text-7xl font-bold mb-4 text-pixar-orange animate-bounce-slow group-hover:animate-pulse-slow">
                  500+
                </div>
                <div className="text-xl md:text-2xl">Счастливых грузовиков 🚛</div>
                <div className="text-lg opacity-80">вернулись на дорогу с улыбкой</div>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="text-6xl md:text-7xl font-bold mb-4 text-pixar-yellow animate-float group-hover:animate-wiggle">
                  15
                </div>
                <div className="text-xl md:text-2xl">Лет магии 🪄</div>
                <div className="text-lg opacity-80">превращаем поломки в исправности</div>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="text-6xl md:text-7xl font-bold mb-4 text-white animate-pulse-slow group-hover:animate-bounce-slow">
                  24/7
                </div>
                <div className="text-xl md:text-2xl">Космическая поддержка 🛸</div>
                <div className="text-lg opacity-80">всегда на связи</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Parts Section with Happy Characters */}
      <section id="запчасти" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-6xl font-heading font-bold mb-8 text-pixar-dark">
            Счастливые запчасти 📦✨
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Только качественные запчасти для всех марок грузовиков, которые улыбаются и работают с радостью!
          </p>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { name: "Весёлые фильтры", icon: "Filter", emoji: "😊" },
              { name: "Надёжные тормоза", icon: "Disc", emoji: "🛡️" },
              { name: "Сильный двигатель", icon: "Cog", emoji: "💪" },
              { name: "Умная трансмиссия", icon: "Settings", emoji: "🧠" }
            ].map((part, index) => (
              <Card key={index} className="hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border-4 border-pixar-orange/20 hover:border-pixar-orange group cursor-pointer">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-pixar-orange to-red-500 flex items-center justify-center shadow-lg group-hover:animate-bounce-slow">
                    <Icon name={part.icon as any} size={28} className="text-white" />
                  </div>
                  <h3 className="font-heading font-bold text-pixar-dark text-lg mb-2 group-hover:text-pixar-orange transition-colors">
                    {part.emoji} {part.name}
                  </h3>
                  <p className="text-gray-600 text-sm">С гарантией счастья</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contacts Section - Magical */}
      <section id="контакты" className="py-20 bg-pixar-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pixar-dark via-pixar-blue/20 to-pixar-green/20"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-heading font-bold mb-12 text-center">
              Найти нас легко! 📞🗺️
            </h2>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <h3 className="text-3xl font-heading font-bold mb-6 text-pixar-orange">
                  Космическая база 🚀
                </h3>
                <div className="space-y-6">
                  {[
                    { icon: "MapPin", text: "г. Тюмень, ул. 50 лет октября, 199с5", color: "pixar-orange" },
                    { icon: "Phone", text: "+7 902 813-65-05", color: "pixar-blue" },
                    { icon: "Mail", text: "tts72@list.ru", color: "pixar-green" },
                    { icon: "Clock", text: "Пн-Пт: 8:00-20:00, Сб-Вс: 9:00-18:00", color: "pixar-yellow" }
                  ].map((contact, index) => (
                    <div key={index} className="flex items-center space-x-4 group cursor-pointer">
                      <div className={`w-12 h-12 bg-${contact.color} rounded-full flex items-center justify-center shadow-lg group-hover:animate-bounce-slow transition-all duration-300`}>
                        <Icon name={contact.icon as any} size={20} className="text-white" />
                      </div>
                      <span className="text-lg group-hover:text-pixar-orange transition-colors">
                        {contact.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-3xl font-heading font-bold mb-6 text-green-400">
                  SOS! Экстренный вызов 🆘
                </h3>
                <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 shadow-2xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-105 cursor-pointer animate-pulse-slow">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center animate-bounce-slow">
                      <Icon name="Zap" size={32} className="text-green-600" />
                    </div>
                    <div>
                      <span className="text-2xl font-bold">24/7 Спасательная служба</span>
                      <p className="text-green-100">Мы прилетим быстрее космического корабля!</p>
                    </div>
                  </div>
                  <p className="text-3xl font-bold mb-2">+7 902 813-65-05</p>
                  <p className="text-green-100">⚡ Выезд в течение 30 минут</p>
                  <p className="text-green-200 text-sm mt-2">🚀 В любую точку галактики... то есть Тюмени!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer with Playing Trucks */}
      <footer className="bg-gray-900 text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-pixar-dark/50 to-gray-900"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-pixar-orange to-red-500 rounded-full flex items-center justify-center animate-bounce-slow">
              <Icon name="Truck" size={24} className="text-white" />
            </div>
            <span className="text-3xl font-heading font-bold">ТТ Сервис</span>
            <div className="animate-float">🚛</div>
            <div className="animate-bounce-slow" style={{ animationDelay: '0.5s' }}>🔧</div>
            <div className="animate-wiggle" style={{ animationDelay: '1s' }}>⚡</div>
          </div>
          
          <p className="text-gray-400 text-lg mb-4">
            © 2024 ТТ Сервис. Мощь. Надёжность. Улыбка. 🚀
          </p>
          
          <p className="text-pixar-orange text-sm">
            Где каждый грузовик находит свое счастье! 💙✨
          </p>

          {/* Hidden Easter Eggs */}
          <div className="absolute bottom-4 left-4 opacity-20 hover:opacity-100 transition-opacity cursor-pointer">
            <div className="text-xs animate-pulse-slow">🚛💨 Zoom-zoom!</div>
          </div>
          <div className="absolute bottom-4 right-4 opacity-20 hover:opacity-100 transition-opacity cursor-pointer">
            <div className="text-xs animate-wiggle">🔧 Vroom-vroom!</div>
          </div>
        </div>
      </footer>

      {/* Booking Calendar Modal */}
      {showBookingCalendar && (
        <div>
          {console.log('Модальное окно календаря отображается')}
          <BookingCalendar onClose={() => setShowBookingCalendar(false)} />
        </div>
      )}

      {/* Knowledge Base Modal */}
      {showKnowledgeBase && (
        <KnowledgeBase onClose={() => setShowKnowledgeBase(false)} />
      )}

      {/* Password Prompt Modal */}
      {showPasswordPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-4">
            <h3 className="text-lg font-bold mb-4">Вход в админ-панель</h3>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль"
              className="w-full px-3 py-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-pixar-blue"
              onKeyPress={(e) => e.key === 'Enter' && handleAdminAccess()}
            />
            <div className="flex gap-2">
              <Button
                onClick={handleAdminAccess}
                disabled={isChecking}
                className="flex-1 bg-pixar-blue hover:bg-pixar-blue/80"
              >
                {isChecking ? 'Проверка...' : 'Войти'}
              </Button>
              <Button
                onClick={() => {
                  setShowPasswordPrompt(false);
                  setPassword('');
                }}
                variant="outline"
                disabled={isChecking}
                className="flex-1"
              >
                Отмена
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Booking Calendar Modal */}
      {showBookingCalendar && (
        <BookingCalendar onClose={() => setShowBookingCalendar(false)} />
      )}

      {/* Admin Panel Modal */}
      {showAdminPanel && (
        <AdminPanel onClose={() => setShowAdminPanel(false)} />
      )}
    </div>
  );
};

export default Index;