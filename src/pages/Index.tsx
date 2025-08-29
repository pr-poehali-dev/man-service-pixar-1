import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from '@/components/ui/icon';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pixar-light to-blue-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b-2 border-pixar-orange sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-pixar-orange rounded-full flex items-center justify-center">
              <Icon name="Truck" size={24} className="text-white" />
            </div>
            <h1 className="text-2xl font-heading font-bold text-pixar-dark">
              MAN Service
            </h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#home" className="text-pixar-dark hover:text-pixar-orange transition-colors">Главная</a>
            <a href="#services" className="text-pixar-dark hover:text-pixar-orange transition-colors">Услуги</a>
            <a href="#about" className="text-pixar-dark hover:text-pixar-orange transition-colors">О нас</a>
            <a href="#parts" className="text-pixar-dark hover:text-pixar-orange transition-colors">Запчасти</a>
            <a href="#gallery" className="text-pixar-dark hover:text-pixar-orange transition-colors">Галерея</a>
            <a href="#contacts" className="text-pixar-dark hover:text-pixar-orange transition-colors">Контакты</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="mb-12 relative">
            <img 
              src="/img/d3e51891-70db-425d-b1c8-66ccbad97401.jpg" 
              alt="Дружелюбный грузовик MAN в сервисе" 
              className="mx-auto w-full max-w-2xl rounded-3xl shadow-2xl hover:scale-105 transition-transform duration-300"
            />
          </div>
          <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 text-pixar-dark leading-tight">
            Вернём <span className="text-pixar-orange">Мощь</span> и{' '}
            <span className="text-pixar-blue">Надёжность!</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-pixar-dark font-medium">
            С заботой о вашем MAN'е 🚛
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <Button className="bg-pixar-orange hover:bg-orange-600 text-white text-lg px-8 py-6 rounded-full transform hover:scale-105 transition-all duration-200 shadow-lg">
              <Icon name="Wrench" size={20} className="mr-2" />
              Записаться на ТО!
            </Button>
            <Button variant="outline" className="border-2 border-pixar-blue text-pixar-blue hover:bg-pixar-blue hover:text-white text-lg px-8 py-6 rounded-full transform hover:scale-105 transition-all duration-200">
              <Icon name="Settings" size={20} className="mr-2" />
              Узнать о ремонте
            </Button>
            <Button className="bg-red-500 hover:bg-red-600 text-white text-lg px-8 py-6 rounded-full transform hover:scale-105 transition-all duration-200 shadow-lg">
              <Icon name="Zap" size={20} className="mr-2" />
              Экстренная помощь
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-pixar-dark">
              Наши Услуги 🔧
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Профессиональное обслуживание грузовиков MAN с улыбкой и гарантией качества
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "Stethoscope",
                title: "Диагностика",
                description: "Компьютерная диагностика всех систем вашего MAN",
                color: "pixar-blue"
              },
              {
                icon: "Wrench",
                title: "Ремонт двигателя",
                description: "Капитальный и текущий ремонт двигателей MAN",
                color: "pixar-orange"
              },
              {
                icon: "Settings",
                title: "Техобслуживание",
                description: "Плановое ТО согласно регламенту производителя",
                color: "pixar-green"
              },
              {
                icon: "Cog",
                title: "Трансмиссия",
                description: "Ремонт и обслуживание КПП и мостов",
                color: "pixar-yellow"
              },
              {
                icon: "Zap",
                title: "Электрика",
                description: "Диагностика и ремонт электрических систем",
                color: "pixar-blue"
              },
              {
                icon: "Truck",
                title: "Кузовной ремонт",
                description: "Восстановление кабины и рамы грузовика",
                color: "pixar-orange"
              }
            ].map((service, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-gray-100">
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-${service.color} flex items-center justify-center shadow-lg`}>
                    <Icon name={service.icon as any} size={32} className="text-white" />
                  </div>
                  <CardTitle className="text-xl font-heading font-bold text-pixar-dark">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-r from-pixar-blue to-pixar-green text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-8">
              О нас 🏆
            </h2>
            <p className="text-xl mb-8 leading-relaxed">
              Мы — команда профессиональных механиков с 15-летним опытом работы с грузовиками MAN. 
              Каждый наш специалист прошёл сертификацию и регулярно повышает квалификацию.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">500+</div>
                <div className="text-lg">Отремонтированных грузовиков</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">15</div>
                <div className="text-lg">Лет опыта</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">24/7</div>
                <div className="text-lg">Экстренная поддержка</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Parts Section */}
      <section id="parts" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-8 text-pixar-dark">
            Оригинальные запчасти 📦
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Только оригинальные запчасти MAN с гарантией качества и быстрой доставкой
          </p>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { name: "Фильтры", icon: "Filter" },
              { name: "Тормозная система", icon: "Disc" },
              { name: "Двигатель", icon: "Cog" },
              { name: "Трансмиссия", icon: "Settings" }
            ].map((part, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow border-2 border-pixar-orange/20">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-pixar-orange flex items-center justify-center">
                    <Icon name={part.icon as any} size={24} className="text-white" />
                  </div>
                  <h3 className="font-heading font-bold text-pixar-dark">{part.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-12 text-pixar-dark">
            Галерея работ 📸
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="bg-gray-200 rounded-lg aspect-square flex items-center justify-center hover:shadow-lg transition-shadow">
                <Icon name="Camera" size={48} className="text-gray-400" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contacts Section */}
      <section id="contacts" className="py-20 bg-pixar-dark text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-12 text-center">
              Контакты 📞
            </h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-heading font-bold mb-6">Как нас найти</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Icon name="MapPin" size={24} className="text-pixar-orange" />
                    <span>г. Москва, ул. Грузовая, д. 15</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Icon name="Phone" size={24} className="text-pixar-orange" />
                    <span>+7 (495) 123-45-67</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Icon name="Mail" size={24} className="text-pixar-orange" />
                    <span>info@man-service.ru</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Icon name="Clock" size={24} className="text-pixar-orange" />
                    <span>Пн-Пт: 8:00-20:00, Сб-Вс: 9:00-18:00</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-heading font-bold mb-6">Экстренная помощь</h3>
                <div className="bg-red-500 rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Icon name="Zap" size={32} className="text-white" />
                    <span className="text-xl font-bold">24/7 Аварийная служба</span>
                  </div>
                  <p className="text-lg">+7 (495) 911-22-33</p>
                  <p className="text-sm mt-2">Выезд в течение 30 минут</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-pixar-orange rounded-full flex items-center justify-center">
              <Icon name="Truck" size={20} className="text-white" />
            </div>
            <span className="text-xl font-heading font-bold">MAN Service</span>
          </div>
          <p className="text-gray-400">© 2024 MAN Service. Мощь. Надёжность. Улыбка.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;