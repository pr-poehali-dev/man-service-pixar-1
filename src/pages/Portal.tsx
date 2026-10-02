import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Company, PORTAL_CATEGORIES, getPortalUrl } from '@/lib/portal';
import PortalSubmitForm from '@/components/PortalSubmitForm';

const Portal = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const url = getPortalUrl();
    if (!url) {
      setLoading(false);
      return;
    }
    fetch(url)
      .then((r) => r.json())
      .then((d) => setCompanies(d.companies || []))
      .catch(() => setCompanies([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = companies.filter((c) => {
    if (category !== 'all' && c.category !== category) return false;
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return [c.name, c.address, c.description].some((v) => v.toLowerCase().includes(q));
  });

  const catInfo = (value: string) => PORTAL_CATEGORIES.find((c) => c.value === value);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pixar-light to-blue-50">
      <header className="bg-white/90 border-b-4 border-pixar-orange shadow-lg">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-3xl font-heading font-bold text-pixar-dark flex items-center gap-3">
            <Icon name="Truck" size={32} className="text-pixar-orange" />
            Грузовой портал
          </h1>
          <div className="flex gap-3">
            <Button onClick={() => setShowForm(true)} className="bg-pixar-orange text-white hover:bg-pixar-orange/80">
              <Icon name="Plus" size={16} className="mr-2" />
              Добавить компанию
            </Button>
            <Link to="/">
              <Button variant="outline" className="border-2 border-pixar-blue text-pixar-blue">
                <Icon name="ArrowLeft" size={16} className="mr-2" />
                На главную
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10">
        <p className="text-xl text-gray-600 mb-6 max-w-3xl">
          Адреса и контакты мастеров, магазинов запчастей, СТО, шиномонтажей и эвакуаторов для грузового транспорта.
        </p>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Поиск по названию, адресу или марке"
          className="w-full max-w-xl px-4 py-3 border-2 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-pixar-blue"
        />

        <div className="flex flex-wrap gap-3 mb-8">
          <Button
            onClick={() => setCategory('all')}
            variant={category === 'all' ? 'default' : 'outline'}
            className={category === 'all' ? 'bg-pixar-blue text-white hover:bg-pixar-blue/80' : ''}
          >
            Все
          </Button>
          {PORTAL_CATEGORIES.map((c) => (
            <Button
              key={c.value}
              onClick={() => setCategory(c.value)}
              variant={category === c.value ? 'default' : 'outline'}
              className={category === c.value ? 'bg-pixar-blue text-white hover:bg-pixar-blue/80' : ''}
            >
              <Icon name={c.icon as any} size={16} className="mr-2" />
              {c.label}
            </Button>
          ))}
        </div>

        {loading ? (
          <p className="text-gray-500">Загрузка...</p>
        ) : filtered.length === 0 ? (
          <Card className="p-8 text-center">
            <Icon name="SearchX" size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-bold text-gray-600">Пока ничего не найдено</h3>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((c) => (
              <Card key={c.id} className="hover:shadow-2xl transition-shadow border-2 hover:border-pixar-orange/40">
                <CardHeader>
                  <div className="text-sm text-pixar-orange font-medium flex items-center gap-2">
                    <Icon name={(catInfo(c.category)?.icon || 'Building') as any} size={14} />
                    {catInfo(c.category)?.label}
                  </div>
                  <CardTitle className="text-xl font-heading text-pixar-dark">{c.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-gray-700">
                  {c.address && (
                    <div className="flex items-start gap-2">
                      <Icon name="MapPin" size={16} className="mt-1 text-pixar-orange" />
                      <span>{c.address}</span>
                    </div>
                  )}
                  {c.phone && (
                    <div className="flex items-center gap-2">
                      <Icon name="Phone" size={16} className="text-pixar-blue" />
                      <a href={`tel:${c.phone.replace(/[^+\d]/g, '')}`} className="hover:text-pixar-orange">
                        {c.phone}
                      </a>
                    </div>
                  )}
                  {c.work_hours && (
                    <div className="flex items-center gap-2">
                      <Icon name="Clock" size={16} className="text-pixar-blue" />
                      <span>{c.work_hours}</span>
                    </div>
                  )}
                  {c.description && <p className="text-sm text-gray-600 pt-2">{c.description}</p>}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      {showForm && <PortalSubmitForm onClose={() => setShowForm(false)} />}
    </div>
  );
};

export default Portal;