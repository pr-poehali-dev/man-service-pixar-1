import func2url from '../../backend/func2url.json';

export interface Company {
  id: number;
  category: string;
  name: string;
  address: string;
  phone: string;
  work_hours: string;
  description: string;
}

export const PORTAL_CATEGORIES = [
  { value: 'master', label: 'Мастера', icon: 'Wrench' },
  { value: 'parts', label: 'Магазины запчастей', icon: 'Package' },
  { value: 'sto', label: 'СТО', icon: 'Warehouse' },
  { value: 'tire', label: 'Шиномонтаж', icon: 'Disc' },
  { value: 'tow', label: 'Эвакуаторы', icon: 'Truck' },
];

export const getPortalUrl = (): string =>
  (func2url as Record<string, string>)['portal'] || '';
