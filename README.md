# Penny — персональный финансовый дневник

Статический веб-сервис: HTML/CSS/JS + Firebase Authentication + Cloud Firestore.

## 1. Создай Firebase-проект
1. Открой https://console.firebase.google.com/ и создай проект.
2. Добавь Web app (значок `</>`).
3. Скопируй Firebase config в `firebase-config.js`.
4. Authentication → Sign-in method → включи Google.
5. Authentication → Settings → Authorized domains: добавь домен GitHub Pages, например `username.github.io`.
6. Firestore Database → Create database. Выбери подходящий регион.

## 2. Примени правила Firestore
В Firebase Console → Firestore Database → Rules вставь содержимое `firestore.rules` и нажми Publish.
Либо установи Firebase CLI и выполни `firebase deploy --only firestore:rules`.

## 3. Локальный запуск
ES modules не следует открывать через `file://`. Запусти локальный сервер, например:
- VS Code → расширение Live Server → Open with Live Server;
- или `python -m http.server 8000`, затем http://localhost:8000/login.html.

Добавь `localhost` в Authentication → Authorized domains, если Firebase этого требует.

## 4. Публикация на GitHub Pages
1. Создай приватный или публичный репозиторий и загрузи все файлы проекта.
2. GitHub → Settings → Pages → Deploy from a branch → main / root.
3. Добавь `username.github.io` в Firebase Authorized domains.
4. Открой `https://username.github.io/repository-name/login.html`.

Если используешь URL вида `username.github.io/repository-name`, доменом авторизации остаётся `username.github.io`, а не полный URL.

## Структура
- `login.html` — отдельная страница входа Google.
- `index.html` — закрытая панель финансов.
- `styles.css` — адаптивный интерфейс и анимации.
- `auth.js` — вход через Google.
- `app.js` — операции, категории, аналитика, CSV.
- `firebase-config.js` — конфигурация твоего Firebase Web App.
- `firestore.rules` — правила доступа к данным.
- `firebase.json` — конфигурация Firebase CLI.

## Как устроено хранение
Операции пользователя хранятся по пути:
`users/{uid}/transactions/{transactionId}`

`uid` берётся из Firebase Authentication. Клиентский интерфейс не может получить чужие записи: Firestore Rules проверяют UID на каждом чтении и изменении.

## Важные замечания
- Категория определяется простым словарём ключевых слов в `app.js`. Это локальная эвристика, а не ИИ. Неопознанные операции получают категорию «Другое»; категорию можно изменить вручную.
- Переводы исключены из расчёта доходов и расходов. Текущий баланс — сумма доходов минус расходы. Переводы между счетами не меняют общий баланс.
- Пока баланс общий, а поле «Счёт» — метка, а не полноценный учёт остатков по нескольким счетам.
- Не вводи номера карт, пароли, CVV, банковские логины или другие секреты.
- Google-вход не анонимен: Firebase видит UID и базовые данные профиля, если они предоставлены провайдером. Финансовые записи приватны, но не являются end-to-end encrypted.
- Firebase Web API key не является секретом доступа. Безопасность обеспечивают Authentication и Firestore Rules. Не публикуй service account keys.
- Перед использованием на реальных данных проверь правила в Firebase Rules Playground / Emulator Suite и настрой бюджетные уведомления Firebase/Google Cloud, чтобы избежать неожиданных расходов.

## Обновление интерфейса Penny
- Рабочая область оформлена как отдельная карточка с закруглёнными углами и внешними отступами.
- Обновлён знак Penny, добавлены анимированный экран приветствия и плавное появление приложения.
- Добавлено переключение светлой и тёмной темы с сохранением выбора в браузере.
- Улучшены состояния полей и выпадающих списков; системное меню `<select>` по-прежнему отрисовывается самим браузером.
- Исправлено отображение списка операций (лишняя запятая), добавлены метки «Доход», «Расход» и «Перевод».
- Поле суммы принимает только цифры; график движения денег анимирует появление линий при смене периода.
- На странице входа добавлено мягкое движение фоновых световых элементов.
