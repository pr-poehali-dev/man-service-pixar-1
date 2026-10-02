import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Company, PORTAL_CATEGORIES, getPortalUrl } from '@/lib/portal';

interface PortalAdminProps {
  adminPassword: string;
}

const emptyForm = { id: 0, category: 'sto', name: '', address: '', phone: '', work_hours: '', description: '' };

const PortalAdmin = ({ adminPassword }: PortalAdminProps) => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const url = getPortalUrl();
    if (!url) return;
    const res = await fetch(url);
    const data = await res.json();
    setCompanies(data.companies || []);
  };

  useEffect(() => {
    load();
  }, []);

  const send = async (method: string, payload: object) => {
    const res = await fetch(getPortalUrl(), {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, password: adminPassword })
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      alert(data.error || 'Не удалось сохранить');
      return false;
    }
    return true;
  };

  const save = async () => {
    if (!form.name.trim()) {
      alert('Укажите название');
      return;
    }
    setSaving(true);
    const ok = await send(form.id ? 'PUT' : 'POST', form);
    setSaving(false);
    if (ok) {
      setForm(emptyForm);
      load();
    }
  };

  const remove = async (id: number) => {
    if (!confirm('Удалить компанию из портала?')) return;
    if (await send('DELETE', { id })) load();
  };

  const field = 'w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-pixar-blue';

  return (
    <div className="space-y-6">
      <Card className="border-2 border-pixar-blue/20">
        <CardContent className="p-4 grid md:grid-cols-2 gap-3">
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

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {companies.length === 0 && <p className="text-gray-500">Компаний пока нет</p>}
        {companies.map((c) => (
          <Card key={c.id}>
            <CardContent className="p-4 flex items-center justify-between gap-4">
              <div>
                <div className="text-xs text-pixar-orange">
                  {PORTAL_CATEGORIES.find((x) => x.value === c.category)?.label}
                </div>
                <div className="font-bold text-pixar-dark">{c.name}</div>
                <div className="text-sm text-gray-600">{c.address} {c.phone && `· ${c.phone}`}</div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => setForm(c)}>
                  <Icon name="Pencil" size={14} />
                </Button>
                <Button size="sm" variant="outline" className="text-red-600 border-red-300" onClick={() => remove(c.id)}>
                  <Icon name="Trash2" size={14} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PortalAdmin;
