import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from '@/components/ui/icon';

interface BookingCalendarProps {
  onClose: () => void;
}

const BookingCalendar = ({ onClose }: BookingCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [serviceType, setServiceType] = useState<string>('');
  const [customerData, setCustomerData] = useState({
    name: '',
    phone: '',
    truck: ''
  });

  const timeSlots = [
    "08:00", "09:00", "10:00", "11:00", 
    "13:00", "14:00", "15:00", "16:00", "17:00"
  ];

  const services = [
    { id: 'to', name: 'Техническое обслуживание', emoji: '🔧', duration: '2-3 часа' },
    { id: 'repair', name: 'Диагностика и ремонт', emoji: '🩺', duration: '1-4 часа' },
    { id: 'engine', name: 'Ремонт двигателя', emoji: '⚙️', duration: '4-8 часов' }
  ];

  // Генерация дат на следующие 30 дней
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Пропускаем воскресенье
      if (date.getDay() !== 0) {
        dates.push({
          date: date.toISOString().split('T')[0],
          display: date.toLocaleDateString('ru-RU', { 
            day: 'numeric', 
            month: 'short',
            weekday: 'short'
          }),
          isWeekend: date.getDay() === 6
        });
      }
    }
    return dates;
  };

  const handleSubmit = () => {
    if (!selectedDate || !selectedTime || !serviceType || !customerData.name || !customerData.phone) {
      alert('Пожалуйста, заполните все поля! 😊');
      return;
    }
    
    // Здесь будет отправка на сервер
    alert(`🎉 Спасибо, ${customerData.name}!\nВы записаны на ${selectedDate} в ${selectedTime}\nТип услуги: ${services.find(s => s.id === serviceType)?.name}\nМы перезвоним для подтверждения! 🚛`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white shadow-2xl border-4 border-pixar-orange/20">
        <CardHeader className="bg-gradient-to-r from-pixar-orange to-red-500 text-white relative">
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
              <Icon name="Calendar" size={24} className="text-pixar-orange" />
            </div>
            🚛 Запись в ТТ Сервис
          </CardTitle>
          <p className="text-pixar-light opacity-90">
            Выберите удобные дату и время для визита наших механиков-космонавтов! 🚀
          </p>
        </CardHeader>
        
        <CardContent className="p-8 space-y-8">
          {/* Тип услуги */}
          <div>
            <h3 className="text-2xl font-heading font-bold text-pixar-dark mb-4 flex items-center gap-2">
              <Icon name="Settings" size={20} className="text-pixar-orange" />
              Выберите услугу
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {services.map((service) => (
                <Card 
                  key={service.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg border-2 ${
                    serviceType === service.id 
                      ? 'border-pixar-orange bg-pixar-light/20' 
                      : 'border-gray-200 hover:border-pixar-orange/30'
                  }`}
                  onClick={() => setServiceType(service.id)}
                >
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl mb-2">{service.emoji}</div>
                    <h4 className="font-bold text-pixar-dark">{service.name}</h4>
                    <p className="text-sm text-gray-600">{service.duration}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Выбор даты */}
          <div>
            <h3 className="text-2xl font-heading font-bold text-pixar-dark mb-4 flex items-center gap-2">
              <Icon name="Calendar" size={20} className="text-pixar-blue" />
              Выберите дату
            </h3>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3 max-h-60 overflow-y-auto">
              {generateDates().map((dateInfo) => (
                <Button
                  key={dateInfo.date}
                  variant={selectedDate === dateInfo.date ? "default" : "outline"}
                  className={`p-4 h-auto flex flex-col items-center transition-all duration-300 ${
                    selectedDate === dateInfo.date 
                      ? 'bg-pixar-blue hover:bg-pixar-blue/80 text-white' 
                      : dateInfo.isWeekend 
                        ? 'border-pixar-yellow text-pixar-yellow hover:bg-pixar-yellow/10'
                        : 'hover:border-pixar-blue hover:bg-pixar-blue/5'
                  }`}
                  onClick={() => setSelectedDate(dateInfo.date)}
                >
                  <span className="text-xs opacity-80">{dateInfo.display.split(' ')[0]}</span>
                  <span className="font-bold">{dateInfo.display.split(' ')[1]}</span>
                  <span className="text-xs">{dateInfo.display.split(' ')[2]}</span>
                  {dateInfo.isWeekend && <span className="text-xs">🌟</span>}
                </Button>
              ))}
            </div>
          </div>

          {/* Выбор времени */}
          {selectedDate && (
            <div>
              <h3 className="text-2xl font-heading font-bold text-pixar-dark mb-4 flex items-center gap-2">
                <Icon name="Clock" size={20} className="text-pixar-green" />
                Выберите время
              </h3>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    className={`transition-all duration-300 ${
                      selectedTime === time 
                        ? 'bg-pixar-green hover:bg-pixar-green/80 text-white' 
                        : 'hover:border-pixar-green hover:bg-pixar-green/5'
                    }`}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Контактные данные */}
          {selectedTime && (
            <div>
              <h3 className="text-2xl font-heading font-bold text-pixar-dark mb-4 flex items-center gap-2">
                <Icon name="User" size={20} className="text-pixar-yellow" />
                Ваши данные
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ваше имя *
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-pixar-orange focus:outline-none transition-colors"
                    placeholder="Иван Иванович"
                    value={customerData.name}
                    onChange={(e) => setCustomerData({...customerData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Телефон *
                  </label>
                  <input
                    type="tel"
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-pixar-orange focus:outline-none transition-colors"
                    placeholder="+7 (999) 123-45-67"
                    value={customerData.phone}
                    onChange={(e) => setCustomerData({...customerData, phone: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Марка грузовика
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-pixar-orange focus:outline-none transition-colors"
                    placeholder="MAN, Volvo, Scania..."
                    value={customerData.truck}
                    onChange={(e) => setCustomerData({...customerData, truck: e.target.value})}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Кнопки действий */}
          {customerData.name && customerData.phone && (
            <div className="flex gap-4 pt-6 border-t-2 border-gray-100">
              <Button 
                onClick={handleSubmit}
                className="flex-1 bg-gradient-to-r from-pixar-orange to-red-500 hover:from-red-500 hover:to-pixar-orange text-white text-lg py-6 font-bold shadow-2xl hover:shadow-pixar-orange/50 transition-all duration-300 hover:scale-105 animate-pulse-slow"
              >
                <Icon name="CheckCircle" size={24} className="mr-3" />
                🎉 Записаться!
              </Button>
              <Button 
                variant="outline" 
                onClick={onClose}
                className="px-8 py-6 border-2 border-gray-300 hover:border-gray-400"
              >
                <Icon name="X" size={20} className="mr-2" />
                Отмена
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingCalendar;