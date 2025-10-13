# Android Build Configuration

## Setup for Release Build

Для сборки релизной версии приложения необходимо настроить конфигурацию подписи.

### Шаги настройки:

1. **Скопируйте пример конфигурации:**
   ```bash
   cp gradle.properties.example gradle.properties
   ```

2. **Получите файл ключа подписи:**
   - Запросите файл `my-upload-key.keystore` у владельца проекта
   - Поместите его в директорию `android/app/`

3. **Заполните `gradle.properties`:**
   - Откройте файл `android/gradle.properties`
   - Замените `your_password_here` на реальные пароли
   - **НЕ** коммитьте этот файл в git!

### Структура конфигурации:

```properties
MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore
MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
MYAPP_UPLOAD_STORE_PASSWORD=ваш_пароль
MYAPP_UPLOAD_KEY_PASSWORD=ваш_пароль
```

### Безопасность:

⚠️ **ВАЖНО:**
- Файл `gradle.properties` добавлен в `.gitignore`
- Файл `*.keystore` добавлен в `.gitignore`
- **НИКОГДА** не коммитьте файлы с паролями!
- Храните резервную копию keystore в безопасном месте

### Сборка релиза:

```bash
# AAB для Google Play
./gradlew bundleRelease

# APK для прямой установки
./gradlew assembleRelease
```

Файлы будут в:
- AAB: `android/app/build/outputs/bundle/release/app-release.aab`
- APK: `android/app/build/outputs/apk/release/`

