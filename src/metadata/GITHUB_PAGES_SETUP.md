# Настройка GitHub Pages для Privacy Policy

## 📋 Что нужно сделать

### 1. Создать репозиторий на GitHub

1. Перейти на [GitHub](https://github.com)
2. Нажать "New repository" (зеленая кнопка)
3. Назвать репозиторий, например: `free-notes-privacy`
4. Выбрать "Public" (обязательно для GitHub Pages)
5. Создать репозиторий

### 2. Загрузить файл privacy-policy.html

**Вариант А: Через веб-интерфейс GitHub**
1. В созданном репозитории нажать "Add file" → "Upload files"
2. Загрузить файл `privacy-policy.html` из корня проекта
3. Написать commit message: "Add privacy policy"
4. Нажать "Commit changes"

**Вариант Б: Через Git (если уже используете Git)**
```bash
# В корне вашего проекта MyNotes
cd D:\my-note\MyNotes

# Добавить privacy-policy.html в коммит
git add privacy-policy.html
git commit -m "Add privacy policy HTML"

# Создать новый репозиторий и запушить
# (замените YOUR_USERNAME на ваш GitHub username)
git remote add privacy https://github.com/YOUR_USERNAME/free-notes-privacy.git
git push privacy main
```

### 3. Включить GitHub Pages

1. В репозитории перейти в **Settings** (⚙️)
2. В левом меню найти **Pages**
3. В разделе "Source" выбрать:
   - Branch: `main`
   - Folder: `/ (root)`
4. Нажать **Save**
5. Подождать 1-2 минуты

### 4. Получить URL

После включения GitHub Pages вы увидите сообщение:
```
Your site is published at https://YOUR_USERNAME.github.io/free-notes-privacy/
```

**URL для Privacy Policy будет:**
```
https://YOUR_USERNAME.github.io/free-notes-privacy/privacy-policy.html
```

Этот URL нужно вставить в Google Play Console!

---

## 🎨 Альтернатива: Использовать основной репозиторий

Если у вас уже есть репозиторий MyNotes на GitHub:

1. Скопировать `privacy-policy.html` в корень репозитория
2. Закоммитить и запушить
3. Включить GitHub Pages для основного репозитория
4. URL будет: `https://YOUR_USERNAME.github.io/MyNotes/privacy-policy.html`

---

## 📝 Обновление email в Privacy Policy

**Важно!** Перед загрузкой на GitHub, обновите email в файле `privacy-policy.html`:

1. Открыть файл `privacy-policy.html`
2. Найти (Ctrl+F): `your-email@example.com`
3. Заменить на ваш реальный email (2 раза - для EN и UK версий)
4. Сохранить файл
5. Загрузить обновленный файл на GitHub

Или использовать команду:
```bash
# Замените YOUR_EMAIL на ваш email
$email = "your.email@gmail.com"
(Get-Content privacy-policy.html) -replace 'your-email@example.com', $email | Set-Content privacy-policy.html
```

---

## ✅ Проверка

После публикации:

1. Открыть URL в браузере
2. Проверить, что страница загружается
3. Проверить переключение языков (EN/UK)
4. Убедиться, что email корректный
5. Скопировать URL для Google Play Console

---

## 🔗 Что делать дальше

1. Получить URL вашей Privacy Policy
2. Открыть файл `src/metadata/app_info.md`
3. В разделе "Privacy Policy URL" вставить ваш URL
4. При публикации в Google Play Console указать этот URL

**Пример:**
```
Privacy Policy URL: https://yourusername.github.io/free-notes-privacy/privacy-policy.html
```

---

## 💡 Полезные советы

### Кастомный домен (опционально)
Если у вас есть свой домен, можно настроить:
- `privacy.yourdomain.com`
- `yourdomain.com/privacy`

Инструкция в документации GitHub Pages.

### HTTPS обязателен
GitHub Pages автоматически предоставляет HTTPS.
Google Play Store **требует** HTTPS для Privacy Policy URL.

### Обновление политики
Просто обновите файл на GitHub - изменения появятся через 1-2 минуты.

---

## 🆘 Проблемы?

**404 ошибка:**
- Подождите 5-10 минут после включения Pages
- Проверьте, что файл называется `privacy-policy.html`
- Убедитесь, что репозиторий Public

**Страница не обновляется:**
- Очистите кэш браузера (Ctrl+Shift+R)
- Подождите несколько минут

**Email не обновился:**
- Убедитесь, что сохранили файл перед загрузкой
- Перезагрузите файл на GitHub

---

## 📧 Пример готового URL

```
https://yourusername.github.io/free-notes-privacy/privacy-policy.html
```

Этот URL готов к использованию в:
- ✅ Google Play Console
- ✅ App Store (если планируете iOS)
- ✅ Маркетинговых материалах
- ✅ FAQ и поддержке

---

**Готово! Теперь у вас есть профессиональная Privacy Policy для публикации приложения! 🎉**

