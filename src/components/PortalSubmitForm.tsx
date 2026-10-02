import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { PORTAL_CATEGORIES, getPortalUrl } from '@/lib/portal';

interface PortalSubmitFormProps {
  onClose: () => void;
}

const emptyForm = {
  category: 'sto',
  name: '',
  address: '',
  phone: '',
  work_hours: '',
  description: '',
  contact_name: ''
};

const PortalSubmitForm = ({ onClose }: PortalSubmitFormProps) => {
  const [form, setForm] = useState(emptyForm);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const field = 'w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-pixar-blue';

  const submit = async () => {
    if (!form.name.trim() || !form.phone.trim()) {
      setError('Укажите название и телефон');
      return;
    }
    setError('');
    setSending(true);
    try {
      const res = await fetch(getPortalUrl(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, action: 'submit' })
      });
      if (res.ok) {
        setSent(true);
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || 'Не удалось отправить заявку');
      }
    } catch {
      setError('Не удалось отправить заявку. Попробуйте ещё раз.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
        <CardHeader className="bg-gradient-to-r from-pixar-orange to-red-500 text-white relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute top-3 right-3 text-white hover:bg-white/20"
          >
            <Icon name="X" size={20} />
          </Button>
          <CardTitle className="text-2xl font-heading">Добавить компанию на портал</CardTitle>
          <p className="text-white/90 text-sm">Заявка появится на сайте после проверки администратором</p>
        </CardHeader>
        <CardContent className="p-6">
          {sent ? (
            <div className="text-center py-8">
              <Icon name="CheckCircle" size={56} className="mx-auto text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-pixar-dark mb-2">Заявка отправлена</h3>
              <p className="text-gray-600 mb-6">
                Администратор проверит данные, и компания появится в каталоге.
              </p>
              <Button onClick={onClose} className="bg-pixar-blue text-white hover:bg-pixar-blue/80">
                Закрыть
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-3">
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className={field}
              >
                {PORTAL_CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
              <input className={field} placeholder="Название *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <input className={field} placeholder="Адрес" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
              <input className={field} placeholder="Телефон *" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              <input className={field} placeholder="Часы работы" value={form.work_hours} onChange={(e) => setForm({ ...form, work_hours: e.target.value })} />
              <input className={field} placeholder="Ваше имя (для связи)" value={form.contact_name} onChange={(e) => setForm({ ...form, contact_name: e.target.value })} />
              <textarea
                className={`${field} md:col-span-2`}
                rows={3}
                placeholder="Описание и марки грузовиков, с которыми работаете"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
              {error && <p className="text-red-600 text-sm md:col-span-2">{error}</p>}
              <div className="flex gap-2 md:col-span-2">
                <Button onClick={submit} disabled={sending} className="bg-pixar-orange text-white hover:bg-pixar-orange/80">
                  <Icon name="Send" size={16} className="mr-2" />
                  {sending ? 'Отправка...' : 'Отправить на проверку'}
                </Button>
                <Button variant="outline" onClick={onClose} disabled={sending}>Отмена</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PortalSubmitForm;
