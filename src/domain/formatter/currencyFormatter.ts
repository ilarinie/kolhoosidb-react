import { parseLocale } from './localeParser';

export const currencyFormatter = new Intl.NumberFormat(parseLocale(), {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
});