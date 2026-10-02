import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Company, PORTAL_CATEGORIES, getPortalUrl } from '@/lib/portal';

interface PortalAdminProps {
  adminPassword: string;
}

const emptyForm = { id: 0, category: 'sto', name: '', address: '', phone: '', work_hours: '', description: '', status: 'approved' };

const PortalAdmin = ({ adminPassword }: PortalAdminProps) => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const send = async (method: string, payload: object) => {
    const res = await fetch(getPortalUrl(), {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, password: adminPassword })
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      alert(data.error || 'Не удалось выполнить действие');
      return null;
    }
    return res.json();
  };

  const load = async () => {
    if (!getPortalUrl()) return;
    const data = await send('POST', { action: 'list' });
    if (data) setCompanies(data.companies || []);
  };

  useEffect(() => {
    load();
  }, []);

  const save = async () => {
    if (!form.name.trim()) {
      alert('Укажите название');
      return;
    }
    setSaving(true);
    const result = await send(form.id ? 'PUT' : 'POST', form);
    setSaving(false);
    if (result) {
      setForm(emptyForm);
      load();
    }
  };

  const approve = async (c: Company) => {
    if (await send('PUT', { ...c, status: 'approved' })) load();
  };

  const remove = async (id: number, pending: boolean) => {
    const text = pending ? 'Отклонить заявку и удалить её?' : 'Удалить компанию из портала?';
    if (!confirm(text)) return;
    if (await send('DELETE', { id })) load();
  };

  const field = 'w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-pixar-blue';
  const pending = companies.filter((c) => c.status === 'pending');
  const approved = companies.filter((c) => c.status !== 'pending');
  const catLabel = (v: string) => PORTAL_CATEGORIES.find((x) => x.value === v)?.label;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-pixar-dark mb-3 flex items-center gap-2">
          <Icon name="Inbox" size={18} className="text-pixar-orange" />
          Заявки на согласование
          <span className="text-xs bg-pixar-orange text-white px-2 py-1 rounded-full">{pending.length}</span>
        </h3>
        <div className="space-y-3">
          {pending.length === 0 && <p className="text-gray-500">Новых заявок нет</p>}
          {pending.map((c) => (
            <Card key={c.id} className="border-2 border-yellow-300 bg-yellow-50">
              <CardContent className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-pixar-orange">{catLabel(c.category)}</div>
                  <div className="font-bold text-pixar-dark">{c.name}</div>
                  <div className="text-sm text-gray-700">{c.address} {c.phone && `· ${c.phone}`}</div>
                  {c.work_hours && <div className="text-sm text-gray-600">{c.work_hours}</div>}
                  {c.description && <div className="text-sm text-gray-600">{c.description}</div>}
                  {c.contact_name && <div className="text-xs text-gray-500 mt-1">Контакт: {c.contact_name}</div>}
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button size="sm" className="bg-green-600 text-white hover:bg-green-700" onClick={() => approve(c)}>
                    <Icon name="Check" size={14} className="mr-1" />
                    Одобрить
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setForm({ ...emptyForm, ...c })}>
                    <Icon name="Pencil" size={14} />
                  </Button>
                  <Button size="sm" variant="outline" className="text-red-600 border-red-300" onClick={() => remove(c.id, true)}>
                    <Icon name="X" size={14} className="mr-1" />
                    Отклонить
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card className="border-2 border-pixar-blue/20">
        <CardContent className="p-4 grid md:grid-cols-2 gap-3">
          <div className="md:col-span-2 font-bold text-pixar-dark">
            {form.id ? 'Редактирование компании' : 'Добавить компанию вручную'}
          </div>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className={field}
          >
            {PORTAL_CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
          <input className={field} placeholder="Название" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input className={field} placeholder="Адрес" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
          <input className={field} placeholder="Телефон" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <input className={field} placeholder="Часы работы" value={form.work_hours} onChange={(e) => setForm({ ...form, work_hours: e.target.value })} />
          <input className={field} placeholder="Описание и марки грузовиков" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <div className="flex gap-2 md:col-span-2">
            <Button onClick={save} disabled={saving} className="bg-pixar-blue text-white hover:bg-pixar-blue/80">
              <Icon name={form.id ? 'Save' : 'Plus'} size={16} className="mr-2" />
              {form.id ? 'Сохранить' : 'Добавить'}
            </Button>
            {form.id !== 0 && (
              <Button variant="outline" onClick={() => setForm(emptyForm)}>Отмена</Button>
            )}
          </div>
        </CardContent>
      </Card>

      <div>
        <h3 className="text-lg font-bold text-pixar-dark mb-3">Опубликованные компании ({approved.length})</h3>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {approved.length === 0 && <p className="text-gray-500">Компаний пока нет</p>}
          {approved.map((c) => (
            <Card key={c.id}>
              <CardContent className="p-4 flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-pixar-orange">{catLabel(c.category)}</div>
                  <div className="font-bold text-pixar-dark">{c.name}</div>
                  <div className="text-sm text-gray-600">{c.address} {c.phone && `· ${c.phone}`}</div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => setForm({ ...emptyForm, ...c })}>
                    <Icon name="Pencil" size={14} />
                  </Button>
                  <Button size="sm" variant="outline" className="text-red-600 border-red-300" onClick={() => remove(c.id, false)}>
                    <Icon name="Trash2" size={14} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortalAdmin;
