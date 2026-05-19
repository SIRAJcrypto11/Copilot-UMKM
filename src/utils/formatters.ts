// src/utils/formatters.ts

export const formatCurrency = (value: number | undefined | null): string => {
  if (value === undefined || value === null) return 'Rp 0';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatPercent = (value: number | undefined | null): string => {
  if (value === undefined || value === null) return '0%';
  return new Intl.NumberFormat('id-ID', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value / 100);
};

export const formatDate = (dateValue: string | number | Date | undefined | null): string => {
  if (!dateValue) return '-';
  const d = new Date(dateValue);
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(d);
};

export const formatNumber = (value: number | undefined | null): string => {
  if (value === undefined || value === null) return '0';
  return new Intl.NumberFormat('id-ID').format(value);
};
