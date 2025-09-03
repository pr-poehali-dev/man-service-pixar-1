import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from '@/components/ui/icon';

interface Booking {
  id: string;
  date: string;
  time: string;
  service: string;
  customer: {
    name: string;
    phone: string;
    truck: string;
  };
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

interface AdminPanelProps {
  onClose: () => void;
}

const AdminPanel = ({ onClose }: AdminPanelProps) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  // Демо данные записей
  const mockBookings: Booking[] = [
    {
      id: '1',
      date: '2024-09-05',
      time: '09:00',
      service: 'Техническое обслуживание',
      customer: {
        name: 'Иванов Сергей',
        phone: '+7 (999) 123-45-67',
        truck: 'MAN TGX'
      },
      status: 'confirmed',
      createdAt: '2024-09-03T14:30:00Z'
    },
    {
      id: '2',
      date: '2024-09-06',
      time: '11:00',
      service: 'Диагностика и ремонт',
      customer: {
        name: 'Петров Александр',
        phone: '+7 (999) 987-65-43',
        truck: 'Volvo FH'
      },
      status: 'pending',
      createdAt: '2024-09-03T16:15:00Z'
    },
    {
      id: '3',
      date: '2024-09-07',
      time: '14:00',
      service: 'Ремонт двигателя',
      customer: {
        name: 'Сидоров Михаил',
        phone: '+7 (999) 555-33-22',
        truck: 'Scania R-series'
      },
      status: 'confirmed',
      createdAt: '2024-09-03T18:45:00Z'
    },
    {
      id: '4',
      date: '2024-09-08',
      time: '10:00',
      service: 'Техническое обслуживание',
      customer: {
        name: 'Козлов Дмитрий',
        phone: '+7 (999) 777-88-99',
        truck: 'MAN TGS'
      },
      status: 'pending',
      createdAt: '2024-09-04T09:20:00Z'
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'Все записи', icon: 'List' },
    { value: 'to', label: 'Техническое обслуживание', icon: 'Settings' },
    { value: 'repair', label: 'Диагностика и ремонт', icon: 'Wrench' },
    { value: 'engine', label: 'Ремонт двигателя', icon: 'Cog' },
  ];

  const statusMap = {
    pending: { label: 'Ожидает', color: 'bg-yellow-100 text-yellow-800', icon: 'Clock' },
    confirmed: { label: 'Подтверждено', color: 'bg-green-100 text-green-800', icon: 'CheckCircle' },
    completed: { label: 'Выполнено', color: 'bg-blue-100 text-blue-800', icon: 'Check' },
    cancelled: { label: 'Отменено', color: 'bg-red-100 text-red-800', icon: 'X' }
  };

  const filteredBookings = mockBookings.filter(booking => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'to') return booking.service.includes('Техническое обслуживание');
    if (selectedFilter === 'repair') return booking.service.includes('Диагностика и ремонт');
    if (selectedFilter === 'engine') return booking.service.includes('Ремонт двигателя');
    return true;
  });

  const updateStatus = (bookingId: string, newStatus: Booking['status']) => {
    // В реальном приложении здесь будет обновление на сервере
    console.log(`Статус записи ${bookingId} изменён на ${newStatus}`);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-7xl max-h-[90vh] overflow-hidden bg-white shadow-2xl border-4 border-pixar-blue/20">
        <CardHeader className="bg-gradient-to-r from-pixar-blue to-blue-600 text-white relative">
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
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <Icon name="Settings" size={24} className="text-pixar-blue" />
            </div>
            🛠️ Админ-панель ТТ Сервиса
          </CardTitle>
          <p className="text-blue-100">
            Управление записями на техническое обслуживание и ремонт грузовиков
          </p>
        </CardHeader>
        
        <CardContent className="p-6">
          {/* Фильтры */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-3">
              {filterOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={selectedFilter === option.value ? "default" : "outline"}
                  className={`transition-all duration-300 ${
                    selectedFilter === option.value 
                      ? 'bg-pixar-blue hover:bg-pixar-blue/80 text-white' 
                      : 'hover:border-pixar-blue hover:bg-pixar-blue/5'
                  }`}
                  onClick={() => setSelectedFilter(option.value)}
                >
                  <Icon name={option.icon as any} size={16} className="mr-2" />
                  {option.label}
                  <span className="ml-2 text-xs bg-white/20 px-2 py-1 rounded-full">
                    {option.value === 'all' 
                      ? mockBookings.length 
                      : mockBookings.filter(b => {
                          if (option.value === 'to') return b.service.includes('Техническое обслуживание');
                          if (option.value === 'repair') return b.service.includes('Диагностика и ремонт');
                          if (option.value === 'engine') return b.service.includes('Ремонт двигателя');
                          return false;
                        }).length
                    }
                  </span>
                </Button>
              ))}
            </div>
          </div>

          {/* Статистика */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardContent className="p-4 text-center">
                <Icon name="CheckCircle" size={24} className="mx-auto text-green-600 mb-2" />
                <div className="text-2xl font-bold text-green-800">
                  {mockBookings.filter(b => b.status === 'confirmed').length}
                </div>
                <div className="text-sm text-green-600">Подтверждено</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
              <CardContent className="p-4 text-center">
                <Icon name="Clock" size={24} className="mx-auto text-yellow-600 mb-2" />
                <div className="text-2xl font-bold text-yellow-800">
                  {mockBookings.filter(b => b.status === 'pending').length}
                </div>
                <div className="text-sm text-yellow-600">Ожидает</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-4 text-center">
                <Icon name="Check" size={24} className="mx-auto text-blue-600 mb-2" />
                <div className="text-2xl font-bold text-blue-800">
                  {mockBookings.filter(b => b.status === 'completed').length}
                </div>
                <div className="text-sm text-blue-600">Выполнено</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-pixar-orange/10 to-pixar-orange/20 border-pixar-orange/30">
              <CardContent className="p-4 text-center">
                <Icon name="Truck" size={24} className="mx-auto text-pixar-orange mb-2" />
                <div className="text-2xl font-bold text-pixar-dark">
                  {filteredBookings.length}
                </div>
                <div className="text-sm text-pixar-orange">Всего записей</div>
              </CardContent>
            </Card>
          </div>

          {/* Список записей */}
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {filteredBookings.length === 0 ? (
              <Card className="p-8 text-center">
                <Icon name="Calendar" size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-bold text-gray-600">Записей не найдено</h3>
                <p className="text-gray-500">Попробуйте изменить фильтр или проверьте позже</p>
              </Card>
            ) : (
              filteredBookings.map((booking) => (
                <Card key={booking.id} className="hover:shadow-lg transition-shadow duration-300 border-2 hover:border-pixar-blue/30">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="grid md:grid-cols-4 gap-4">
                          <div>
                            <div className="text-sm text-gray-500">Дата и время</div>
                            <div className="font-bold text-lg text-pixar-dark">
                              {new Date(booking.date).toLocaleDateString('ru-RU', { 
                                day: 'numeric', 
                                month: 'short',
                                weekday: 'short'
                              })}
                            </div>
                            <div className="text-pixar-blue font-semibold">{booking.time}</div>
                          </div>
                          
                          <div>
                            <div className="text-sm text-gray-500">Клиент</div>
                            <div className="font-bold text-pixar-dark">{booking.customer.name}</div>
                            <div className="text-sm text-gray-600">{booking.customer.phone}</div>
                            <div className="text-xs text-pixar-orange">{booking.customer.truck}</div>
                          </div>
                          
                          <div>
                            <div className="text-sm text-gray-500">Услуга</div>
                            <div className="font-semibold text-pixar-dark">{booking.service}</div>
                            <div className="text-xs text-gray-500">
                              Создано: {new Date(booking.createdAt).toLocaleDateString('ru-RU')}
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-sm text-gray-500">Статус</div>
                              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${statusMap[booking.status].color}`}>
                                <Icon name={statusMap[booking.status].icon as any} size={14} />
                                {statusMap[booking.status].label}
                              </span>
                            </div>
                            
                            <div className="flex gap-2 ml-4">
                              {booking.status === 'pending' && (
                                <Button
                                  size="sm"
                                  className="bg-green-500 hover:bg-green-600 text-white"
                                  onClick={() => updateStatus(booking.id, 'confirmed')}
                                >
                                  <Icon name="Check" size={14} className="mr-1" />
                                  Подтвердить
                                </Button>
                              )}
                              {booking.status === 'confirmed' && (
                                <Button
                                  size="sm"
                                  className="bg-blue-500 hover:bg-blue-600 text-white"
                                  onClick={() => updateStatus(booking.id, 'completed')}
                                >
                                  <Icon name="CheckCircle" size={14} className="mr-1" />
                                  Выполнено
                                </Button>
                              )}
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-red-600 border-red-300 hover:bg-red-50"
                                onClick={() => updateStatus(booking.id, 'cancelled')}
                              >
                                <Icon name="X" size={14} className="mr-1" />
                                Отменить
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPanel;