// Локализация Penny: русские форматы дат и денежных сумм.
export const locale = "ru-RU";
export const currency = "RUB";

export function formatMoney(value) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 2
  }).format(Number(value) || 0);
}

export function formatDate(isoDate) {
  return new Date(`${isoDate}T12:00:00`).toLocaleDateString(locale, {
    day: "numeric",
    month: "short"
  });
}
