import axios from 'axios'
import { useAppStore } from '/stores/AppStore.js'
import { apiFormNew, blackList } from "@/constants/";

axios.defaults.withCredentials = true

export default function postForm(data, appType, car, category) {
  const appStore = useAppStore()

  const ip = useCookie('ip')
  ip.value = appStore.ip

  const domain = useCookie('domain')
  domain.value = window.location.hostname

  const formData = Object.keys(data).reduce((acc, key) => {
    if (key === 'name' || key === 'phone' || key === 'app') {
      acc[key] = data[key];
    } else {
      acc.comment[key] = data[key];
    }
    return acc;
  }, { comment: {} });

  let clearPhone = formData.phone.replaceAll(' ', '').replaceAll('+', '').replaceAll('(', '').replaceAll(')', '').replaceAll('-', '');

  let comment = ref('');

  if (formData.comment?.credit) {
    comment.value = `Первоначальный взнос: ${formData.comment.credit.RangePercent} %. Срок: ${formData.comment.credit.RangeTime == 0 ? '6 мес' : `${formData.comment.credit.RangeTime} лет`}`
  } else {
    comment.value = Object.values(formData.comment).some(value => value)
      ? Object.keys(formData.comment)
        .filter(key => formData.comment[key])
        .map(key => `${formData.comment[key]}`)
        .join(', ')
      : '';
  }

  console.log({
    category: category,
    car: car,
    appType: appType,
    formData: formData,
    comment: comment.value
  })

  appStore.formLoading = true

  if (blackList.some(blackListed => clearPhone.startsWith(blackListed)) || appStore.reffer.includes('dsp.yandex.ru') || formData.app?.length > 0) {
    navigateTo('/thank');
    appStore.formLoading = false
  } else {
    axios.post(`${apiFormNew}`, {
      phone_number: clearPhone,
      full_name: formData.name ? formData.name : null,
      comment: comment.value ? comment.value : null,

      car_id: car ? car.id : null,
      brand: car ? car.brand : null,
      model: car ? car.model : null,
      price: car ? (car?.price ?? 0) - (car?.sale ?? 0) : null,

      send_form: 1,
      send_page: window.location.origin + window.location.pathname,
      source: `https://cars-bonus.ru/`, // обязательно должен быть / на конце url

      referrer: window.location.origin + window.location.pathname + (appStore.reffer ? appStore.reffer : ''),
      entry: appStore.entry ? appStore.entry : null,
      ip: appStore.ip,
      dealer_id: 56,

      application_type_id: appType,
    }, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Domain': `https://cars-bonus.ru`,
      },
      withCredentials: true
    })
      .then(res => {
        appStore.orderId = res.data
        car ? yandexEcommercePurchase(appStore.orderId, car) : null;
        appStore.formLoading = false;
      })
      .catch(err => {
        appStore.formLoading = false
        console.log('неудача')
        console.log(err)
      })
      .finally(() => {
        appStore.formLoading = false
      })

    navigateTo('/success-cars-bonus');
  }
}