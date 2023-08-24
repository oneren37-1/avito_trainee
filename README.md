# Тестовое задание для стажёра Frontend

Разработать интерфейс для сайта [Free-To-Play Games](https://www.freetogame.com/), состоящий из двух страниц.

## Запуск

```
npm ci
npm start
```

## Продуктовые требования
### Главная страница
- Показывает игры
    - Игры можно отфильтровать по платформе и жанру (например, шутер)
    - Игры можно отсортировать по дате релиза, популярности и тд
- Каждая игра в списке содержит:
    - название
    - дата релиза (в российском формате)
    - издатель
    - жанр
    - картинка
- По клику на игру происходит переход на страницу игры
- На загрузку игр показывать индикатор загрузки
- Если не получилось получить данные, необходимо сообщить пользователю
### Страница игры
- Должна содержать (в любом порядке/виде):
    - название
    - дата релиза (в российском формате)
    - издатель
    - разработчик
    - жанр
    - картинка/постер
    - карусель скриншотов
    - системные требования
- На странице должна быть кнопка для возврата к списку игр
- На загрузку игры показывать индикатор загрузки
- Если не получилось получить данные, необходимо сообщить пользователю

## Технические требования

- С приложением должно быть удобно работать, как с мобильного экрана, так и с десктопа (адаптивный интерфейс)
- Приложение разработано с помощью React 18+ и Redux / Redux Toolkit
- Использован [Free-To-Play Games API](https://www.freetogame.com/api-doc) (не важно с или без CORS). Вызовы API и обработка данных от него производятся напрямую с фронтенда (кроме случая, если вы сделаете опциональное задание про Node.JS).
- Роутинг выполнен с использованием [React Router v6](https://reactrouter.com/en/main)
- Фреймворк UI любой на ваше усмотрение (например, [Ant Design](https://ant.design/), [Semantic UI](https://react.semantic-ui.com/), [Element UI](http://elemental-ui.com/))
- Пакетный менеджер `npm`
- Приложение должно запускаться по адресу `localhost:3001` командой `npm start`
- При переходах по ссылкам страница не перезагружается
- Если карточка игры была открыта, то она должна быть доступна при последующих открытиях (перезагрузках) страницы без дополнительного запроса в течение 5 минут
- Исходный код решения должен быть выложен с вашего аккаунта на [Github](http://github.com/)

## Опциональные задания
- Использование TypeScript
- Учитывать, что список игр может содержать тысячи тайтлов
- При неудачном запросе должно быть три попытки повторного запроса
- При переходе со страницы на страницу запросы, относящиеся к старой странице, должны прерываться (отменяться/прекращаться)
- Бэкенд для хостинга статики и API для инкапсуляции внешних запросов на Node.JS
- Покрытие кода юнит-тестами