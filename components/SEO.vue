<script setup>
import { useAppStore } from '/stores/AppStore.js';
import { useNewStore } from '/stores/NewStore.js';
import { useNewCarStore } from '/stores/NewCarStore.js';
import { useRoute } from 'vue-router';

const appStore = useAppStore();
const NewCarStore = useNewCarStore();
const newStore = useNewStore();
const $route = useRoute();

function makeSeo() {
    try {
        // Функция для создания breadcrumbs
        const generateBreadcrumbs = (path) => {
            const segments = path.split('/').filter(segment => segment !== '') // Разбиваем путь на сегменты
            const breadcrumbs = []

            let currentPath = ''
            segments.forEach((segment, index) => {
                currentPath += `/${segment}`

                // Имитация названий для каждого сегмента (замените на реальные данные)
                const name = getNameForSegment(segment)

                breadcrumbs.push({
                    "@type": "ListItem",
                    "position": index, // Позиция начинается с 1
                    "name": name,
                    "item": {
                        "@type": "Thing",
                        "@id": currentPath
                    }
                })
            })

            // Добавляем "Главная" как первый элемент
            if (breadcrumbs.length >= 0) {
                breadcrumbs.unshift({
                    "@type": "ListItem",
                    "position": 0,
                    "name": "Главная",
                    "item": {
                        "@type": "Thing",
                        "@id": "/"
                    }
                })

                // Корректируем позиции после добавления "Главная"
                breadcrumbs.forEach((item, idx) => {
                    item.position = idx + 1
                })
            }

            return breadcrumbs
        }

        // Функция для получения имени сегмента (замените на логику вашего приложения)
        const getNameForSegment = (segment) => {
            const namesMap = {
                "credit": "Кредит",
                "leasing": "Лизинг",
                "installment": "Рассрочка",
                "trade-in": "Trade-in",
                "contact": "Контакты",
                "redemption": "Выкуп",
                "politics": "Политика конфиденциальности",
                "cars": "Каталог автомобилей",
                "banks": "Банки-партнеры",
                "reviews": "Отзывы",
                "comparison": "Сравнение",
                "favorites": "Избранное",
                "about": "О компании",
            }
            return namesMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1)
        }

        // Информация о компании
        const schemaInfo = ref(`     
            {
                "@context": "http:\/\/schema.org",
                "@type": "AutoDealer",
                "telephone": "${appStore.phone}",
                "name": "${appStore.siteName}",
                "url": "${appStore.siteUrl}",
                "logo": "/svg/logo.svg",
                "image": "/og.png",
                "description": "${setSeo('description')}",
                "openingHours": "Mo, Tu, We, Th, Fr, Sa, Su 09:00-20:00",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "${appStore.address}",
                    "addressLocality": "${appStore.siteCity}",
                    "addressRegion": "${appStore.siteCity}",
                    "postalCode": "",
                    "addressCountry": {
                        "@type": "Country",
                        "name": "Россия"
                    }
                },
                "contactPoint": {
                    "@type": "ContactPoint",
                    "contactType": "Shop",
                    "telephone": "${appStore.phone}"
                }
            }
`)

        // Информация об организации
        const schemaOrg = ref(`
            {
                "@context": "http:\/\/schema.org",
                "@type": "Organization",
                "url": "${appStore.siteUrl}",
                "name": "${appStore.siteName}",
                "sponsor": {
                    "@type": "Organization",
                    "url": "${appStore.siteUrl}",
                    "name": "${appStore.siteName}"
                }
            }`)

        // Хлебные крошки
        const schemaBread = ref(JSON.stringify({
            "@context": "http://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": generateBreadcrumbs($route.path)
        }));

        // Информация о продукте
        const schemaProduct = computed(() => {
            if ($route.name == 'car') {
                return (`{
            "@context": "http:\/\/schema.org",
            "@type": "Product",
            "name": "${NewCarStore.car?.brand} ${NewCarStore.car?.model} ${NewCarStore.car?.modification?.modification} ${NewCarStore.car?.complectation?.complectation} id: ${NewCarStore.car?.id}",
            "image": "${NewCarStore.car?.preview}",
            "description": "${setSeo('description')}",
            "sku": "${NewCarStore.car?.id}",
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5",
                "reviewCount": "3"
            },
            "review": [
                {
                    "@type": "Review",
                    "author": {
                        "@type": "Person",
                        "name": "Gosha"
                        },
                    "datePublished": "2024-3-25",
                    "reviewBody": "Купил у данного продавца ${NewCarStore.car?.brand} ${NewCarStore.car?.model} ${NewCarStore.car?.modification?.modification} ${NewCarStore.car?.complectation?.complectation}. Езжу уже пару недель, машина работает без нареканий, работает так, как и обещали ее тех. характеристик и менеджеры салона. К слову о менеджерах. Их работа мне понравилась, парни знают свое дело. Отдельную благодарность хочу выразить Кириллу, который помог мне не только с выбором авто и комплектации, но и вел переговоры с руководством автосалона, чтобы мне сделали скидочку) Цена автомобиля полностью себя оправдывает. Рад, что купил авто именно здесь.",
                    "reviewRating": {
                    "@type": "Rating",
                    "bestRating": "5",
                    "ratingValue": "5",
                    "worstRating": "5"
                    }
                },
                {
                    "@type": "Review",
                    "author": {
                        "@type": "Person",
                        "name": "Maksim"
                        },
                    "datePublished": "2024-05-22",
                    "reviewBody": "Месяц назад купила себе ${NewCarStore.car?.brand} ${NewCarStore.car?.model} ${NewCarStore.car?.modification?.modification} ${NewCarStore.car?.complectation?.complectation}. Машиной довольна, цена оправдывает свои ожидания. Перед покупкой разговаривала с менеджером, он помог зарезервировать такую красотку. Сотрудники обращаются доброжелательно и выполняют свою работу профессионально. Рекомендую.",
                    "reviewRating": {
                    "@type": "Rating",
                    "bestRating": "5",
                    "ratingValue": "5",
                    "worstRating": "5"
                    }
                },
                {
                    "@type": "Review",
                    "author": {
                        "@type": "Person",
                        "name": "Sasha"
                        },
                    "datePublished": "2024-06-19",
                    "reviewBody": "Выбирал автомобиль ${NewCarStore.car?.brand} ${NewCarStore.car?.model} ${NewCarStore.car?.modification?.modification} ${NewCarStore.car?.complectation?.complectation} жене. Встретили доброжелательно. Менеджеры профессионалы своего дела. Выбрал, как и мечтала жена. Проконсультировали во всём, рассказали плюсы и минусы машины. Оформили довольно быстро. Жена счастлива. Автосалон один из лучших по городу (субъективно, конечно же).",
                    "reviewRating": {
                    "@type": "Rating",
                    "bestRating": "5",
                    "ratingValue": "5",
                    "worstRating": "5"
                    }
                }
            ],
            "offers": {
                "@type": "AggregateOffer",
                "priceCurrency": "RUB",
                "lowPrice": "${NewCarStore.car.price - NewCarStore.car?.sale}",
                "highPrice": "${NewCarStore.car.price}",
                "offerCount": "1",
                "availability": "https://schema.org/InStock",
                "itemCondition": "https://schema.org/NewCondition"
                },
            "brand": {
                "@type": "brand",
                "name": "${NewCarStore.car.brand}"
            }
        }
        `)
            } else if ($route.name == 'model') {
                return (`{
            "@context": "http:\/\/schema.org",
            "@type": "Product",
            "name": "${newStore.model.model} ${newStore.model.brand} ${newStore.model?.modifications[0].modification} ${newStore.model?.modifications[0].car_complectations[0].complectation}",
            "image": "${newStore.model?.preview ? newStore.model.preview : newStore.model.galleries[0].url}",
            "sku": "${newStore.model.id}",
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5",
                "reviewCount": "3"
            },
            "review": [
                {
                    "@type": "Review",
                    "author": {
                        "@type": "Person",
                        "name": "Gosha"
                        },
                    "datePublished": "2024-3-25",
                    "reviewBody": "Купил у данного продавца ${newStore.model.model} ${newStore.model.brand} ${newStore.model?.modifications[0].modification} ${newStore.model?.modifications[0].car_complectations[0].complectation}. Езжу уже пару недель, машина работает без нареканий, работает так, как и обещали ее тех. характеристик и менеджеры салона. К слову о менеджерах. Их работа мне понравилась, парни знают свое дело. Отдельную благодарность хочу выразить Кириллу, который помог мне не только с выбором авто и комплектации, но и вел переговоры с руководством автосалона, чтобы мне сделали скидочку) Цена автомобиля полностью себя оправдывает. Рад, что купил авто именно здесь.",
                    "reviewRating": {
                    "@type": "Rating",
                    "bestRating": "5",
                    "ratingValue": "5",
                    "worstRating": "5"
                    }
                },
                {
                    "@type": "Review",
                    "author": {
                        "@type": "Person",
                        "name": "Maksim"
                        },
                    "datePublished": "2024-05-22",
                    "reviewBody": "Месяц назад купила себе ${newStore.model.model} ${newStore.model.brand} ${newStore.model?.modifications[0].modification} ${newStore.model?.modifications[0].car_complectations[0].complectation}. Машиной довольна, цена оправдывает свои ожидания. Перед покупкой разговаривала с менеджером, он помог зарезервировать такую красотку. Сотрудники обращаются доброжелательно и выполняют свою работу профессионально. Рекомендую.",
                    "reviewRating": {
                    "@type": "Rating",
                    "bestRating": "5",
                    "ratingValue": "5",
                    "worstRating": "5"
                    }
                },
                {
                    "@type": "Review",
                    "author": {
                        "@type": "Person",
                        "name": "Sasha"
                        },
                    "datePublished": "2024-06-19",
                    "reviewBody": "Выбирал автомобиль ${newStore.model.model} ${newStore.model.brand} ${newStore.model?.modifications[0].modification} ${newStore.model?.modifications[0].car_complectations[0].complectation} жене. Встретили доброжелательно. Менеджеры профессионалы своего дела. Выбрал, как и мечтала жена. Проконсультировали во всём, рассказали плюсы и минусы машины. Оформили довольно быстро. Жена счастлива. Автосалон один из лучших по городу (субъективно, конечно же).",
                    "reviewRating": {
                    "@type": "Rating",
                    "bestRating": "5",
                    "ratingValue": "5",
                    "worstRating": "5"
                    }
                }
            ],
            "description": "${setSeo('description')}",
            "offers": {
                "@type": "AggregateOffer",
                "priceCurrency": "RUB",
                "lowPrice": "${newStore.model.min_price}",
                "highPrice": "${newStore.model.min_price + newStore.model?.sale}",
                "offerCount": "${newStore.model.cars_count > 0 ? newStore.model.cars_count : 1}",
                "availability": "https://schema.org/InStock",
                "itemCondition": "https://schema.org/NewCondition"
            }
        },
        "brand": {
                "@type": "brand",
                "name": "${newStore.model.brand}"
            }
        `)
            }
        })

        useHead({
            title: `${setSeo('title')}`,
            meta: [
                { name: 'description', content: `${setSeo('description')}` },
                { name: 'og:title', content: `${setSeo('title')}` },
                { name: 'og:description', content: `${setSeo('description')}` },
                { name: 'og:url', content: `${appStore.siteUrl}${$route.path}` },
                { name: 'og:url', content: `${appStore.siteUrl}${$route.path}` },
                { name: 'canonical', content: `${appStore.siteUrl}${$route.path}` }
            ],
            script: [
                {
                    type: 'application/ld+json',
                    innerHTML: schemaOrg.value,
                },
                {
                    type: 'application/ld+json',
                    innerHTML: schemaInfo.value,
                },
                {
                    type: 'application/ld+json',
                    innerHTML: schemaBread.value,
                },
                schemaProduct.value ? {
                    type: 'application/ld+json',
                    innerHTML: schemaProduct.value,
                } : '',
            ],
        })
    } catch (error) {
        console.log(error)
    }
}
makeSeo()
</script>

<template>
    <div />
</template>

<style lang="scss" scoped></style>