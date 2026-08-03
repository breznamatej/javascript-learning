import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

export const deliveryOptions = [{
  id: '1', 
  deliveryDays: 7,
  priceCents: 0
}, {
  id: '2',
  deliveryDays: 3,
  priceCents: 499
}, {
  id: '3',
  deliveryDays: 1,
  priceCents: 999
}];

export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });

  return deliveryOption || deliveryOptions[0];
}

export function calculateDeliveryDate(deliveryOption) {
  let deliveryDate = dayjs();
  let i = 1;

  while (i <= deliveryOption.deliveryDays) {
    deliveryDate = deliveryDate.add(1, 'days');

    if (isWeekend(deliveryDate)) continue;
    i++;
  }
  
  return deliveryDate.format('dddd, MMMM D');
}

function isWeekend(deliveryDate) {
  if (deliveryDate.day() === 0 || deliveryDate.day() === 6) return true;
  else return false;
}