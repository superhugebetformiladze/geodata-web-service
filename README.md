# Веб-сервис для разметки геоданных

Этот проект представляет собой веб-сервис для разметки геоданных с использованием Django и React.

## Описание

Проект включает в себя:

- **Django API**: Бекенд сервиса, реализованный с использованием Django REST framework.
- **React приложение**: Фронтенд сервиса, созданный с использованием кастомного webpack конфига.

## Требования

Перед запуском проекта убедиться, что установлены:

- `Python`
- `Node.js`
- `npm`

## Установка зависимостей для Django:

```bash
cd server
virtualenv venv
venv\Scripts\activate
pip install -r requirements.txt
```
## Установка зависимостей для React:

```bash
cd client
npm install
```

## Запуск

### Запуск Django сервера:

```bash
cd server
venv\Scripts\activate
python manage.py runserver
```

### Запуск React приложения:

```bash
cd client
npm run dev
```