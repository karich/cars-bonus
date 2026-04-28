// seoHelper.js
import { useAppStore } from '/stores/AppStore.js';
import { useNewStore } from '/stores/NewStore.js';
import { useNewCarStore } from '/stores/NewCarStore.js';
import { useRoute } from 'vue-router';

// Константы для плейсхолдеров
const PLACEHOLDERS = {
    BRAND_RUS: '%brand_name_rus%',
    BRAND_ENG: '%brand_name_eng%',
    MODEL_RUS: '%model_name_rus%',
    MODEL_ENG: '%model_name_eng%',
    CAR_ID: '%car_id%',
    CAR_MINPRICE: '%car_minprice%',
    SITE_NAME_ENG: '%site_name_eng%',
    SITE_NAME_RUS: '%site_name_rus%',
    SITE_CREDIT_PERCENT: '%site_credit_percent%',
    MODIFICATION_ENG: '%modification_name_eng%',
    MODIFICATION_RUS: '%modification_name_rus%',
    COMPLECTATION_ENG: '%complectation_name_eng%',
    COMPLECTATION_RUS: '%complectation_name_rus%'
};

// Инициализация хранилищ
const initializeStores = () => {
    return {
        appStore: useAppStore(),
        newCarStore: useNewCarStore(),
        newStore: useNewStore(),
        route: useRoute()
    };
};

// Инициализация реактивных переменных
const initializeRefs = () => {
    return {
        car_id: ref(''),
        car_minprice: ref(''),
        brand_name_rus: ref(''),
        brand_name_eng: ref(''),
        model_name_rus: ref(''),
        model_name_eng: ref(''),
        model_minprice: ref(''),
        modification_name_eng: ref(''),
        modification_name_rus: ref(''),
        complectation_name_eng: ref(''),
        complectation_name_rus: ref('')
    };
};

// Функция для замены плейсхолдеров в строке
const replaceSEO = (string, refs, appStore) => {
    if (string == null) return '';
    
    return string
        .replaceAll(PLACEHOLDERS.BRAND_RUS, refs.brand_name_rus.value || refs.brand_name_eng.value)
        .replaceAll(PLACEHOLDERS.MODEL_ENG, refs.model_name_eng.value || refs.model_name_rus.value)
        .replaceAll(PLACEHOLDERS.BRAND_ENG, refs.brand_name_eng.value || refs.brand_name_rus.value)
        .replaceAll(PLACEHOLDERS.MODEL_RUS, refs.model_name_rus.value || refs.model_name_eng.value)
        .replaceAll(PLACEHOLDERS.CAR_ID, refs.car_id.value)
        .replaceAll(PLACEHOLDERS.CAR_MINPRICE, makeSpaces(refs.car_minprice.value))
        .replaceAll(PLACEHOLDERS.SITE_NAME_ENG, appStore.siteName)
        .replaceAll(PLACEHOLDERS.SITE_NAME_RUS, appStore.siteName)
        .replaceAll(PLACEHOLDERS.SITE_CREDIT_PERCENT, appStore.creditPercent)
        .replaceAll(PLACEHOLDERS.MODIFICATION_ENG, refs.modification_name_eng.value)
        .replaceAll(PLACEHOLDERS.MODIFICATION_RUS, refs.modification_name_rus.value)
        .replaceAll(PLACEHOLDERS.COMPLECTATION_ENG, refs.complectation_name_eng.value)
        .replaceAll(PLACEHOLDERS.COMPLECTATION_RUS, refs.complectation_name_rus.value);
};

// Обработка данных для автомобилей
const processCarData = (refs, stores) => {
    const { appStore, newCarStore, newStore, route } = stores;
    
    if (route.path.includes('cars')) {
        // Обработка бренда
        if (route.params.brand) {
            const brand = appStore.newBrands?.find(brand => brand.url_brand === route.params.brand);
            refs.brand_name_rus.value = brand?.ru_brand?.toUpperCase() || '';
            refs.brand_name_eng.value = brand?.brand?.toUpperCase() || '';
        }

        // Обработка модели
        if (route.params.model) {
            refs.model_name_rus.value = newStore.model?.model?.toUpperCase() || '';
            refs.model_name_eng.value = newStore.model?.model?.toUpperCase() || '';
            refs.model_minprice.value = newStore.model?.min_price || '';
        }

        // Обработка конкретного автомобиля
        if (route.params.car) {
            refs.car_id.value = newCarStore.car?.id || '';
            refs.car_minprice.value = newCarStore.car?.price - newCarStore.car?.sale || '';
            refs.modification_name_eng.value = newCarStore.car?.modification?.modification || '';
            refs.modification_name_rus.value = newCarStore.car?.modification?.modification || '';
            refs.complectation_name_eng.value = newCarStore.car?.complectation?.complectation || '';
            refs.complectation_name_rus.value = newCarStore.car?.complectation?.complectation || '';
        }
    }
};

export function setSeo(seoField) {
    try {
        if (!seoField) {
            throw new Error('SEO field is required');
        }

        const stores = initializeStores();
        const refs = initializeRefs();
        
        processCarData(refs, stores);
        
        const seoData = stores.appStore.newSeo[stores.route.name];
        return seoData ? replaceSEO(seoData[seoField], refs, stores.appStore) : '';
        
    } catch (error) {
        console.error('SEO Error:', error);
        return '';
    }
}