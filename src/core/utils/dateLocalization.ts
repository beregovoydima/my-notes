import moment from 'moment';
import {SupportedLocale} from '@/core/i18n';

// Локали для moment.js
const momentLocales = {
  uk: {
    months:
      'січень_лютий_березень_квітень_травень_червень_липень_серпень_вересень_жовтень_листопад_грудень'.split(
        '_',
      ),
    monthsShort:
      'січ._лют._бер._квіт._трав._черв._лип._серп._вер._жовт._лист._груд.'.split(
        '_',
      ),
    monthsParseExact: true,
    weekdays: "неділя_понеділок_вівторок_середа_четвер_п'ятниця_субота".split(
      '_',
    ),
    weekdaysShort: 'нд._пн._вт._ср._чт._пт._сб.'.split('_'),
    weekdaysMin: 'нд_пн_вт_ср_чт_пт_сб'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD.MM.YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY HH:mm',
      LLLL: 'dddd, D MMMM YYYY HH:mm',
    },
    calendar: {
      sameDay: '[сьогодні в] LT',
      nextDay: '[завтра в] LT',
      nextWeek: 'dddd [в] LT',
      lastDay: '[вчора в] LT',
      lastWeek: 'dddd [в] LT',
      sameElse: 'L',
    },
    relativeTime: {
      future: 'через %s',
      past: '%s тому',
      s: 'кілька секунд',
      ss: '%d секунд',
      m: 'хвилина',
      mm: '%d хвилин',
      h: 'година',
      hh: '%d годин',
      d: 'день',
      dd: '%d днів',
      w: 'тиждень',
      ww: '%d тижнів',
      M: 'місяць',
      MM: '%d місяців',
      y: 'рік',
      yy: '%d років',
    },
  },
  ru: {
    months:
      'январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь'.split(
        '_',
      ),
    monthsShort:
      'янв._февр._март_апр._май_июнь_июль_авг._сент._окт._нояб._дек.'.split(
        '_',
      ),
    monthsParseExact: true,
    weekdays:
      'воскресенье_понедельник_вторник_среда_четверг_пятница_суббота'.split(
        '_',
      ),
    weekdaysShort: 'вс._пн._вт._ср._чт._пт._сб.'.split('_'),
    weekdaysMin: 'Вс_Пн_Вт_Ср_Чт_Пт_Сб'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD.MM.YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY HH:mm',
      LLLL: 'dddd, D MMMM YYYY HH:mm',
    },
    calendar: {
      sameDay: '[сегодня в] LT',
      nextDay: '[завтра в] LT',
      nextWeek: 'dddd [в] LT',
      lastDay: '[вчера в] LT',
      lastWeek: 'dddd [в] LT',
      sameElse: 'L',
    },
    relativeTime: {
      future: 'через %s',
      past: '%s назад',
      s: 'несколько секунд',
      ss: '%d секунд',
      m: 'минута',
      mm: '%d минут',
      h: 'час',
      hh: '%d часов',
      d: 'день',
      dd: '%d дней',
      w: 'неделя',
      ww: '%d недель',
      M: 'месяц',
      MM: '%d месяцев',
      y: 'год',
      yy: '%d лет',
    },
  },
  en: {
    // Английский использует стандартные настройки moment
  },
};

// Инициализация локалей moment
Object.entries(momentLocales).forEach(([locale, config]) => {
  if (config) {
    moment.updateLocale(locale, config);
  }
});

// Функция для установки локали moment
export const setMomentLocale = (locale: SupportedLocale): void => {
  moment.locale(locale);
};

// Функция для форматирования даты
export const formatDate = (
  date: Date | string,
  format: string = 'L',
  locale: SupportedLocale = 'en',
): string => {
  setMomentLocale(locale);
  return moment(date).format(format);
};

// Функция для форматирования относительного времени
export const formatRelativeTime = (
  date: Date | string,
  locale: SupportedLocale = 'en',
): string => {
  setMomentLocale(locale);
  return moment(date).fromNow();
};

// Функция для получения названия месяца
export const getMonthName = (
  month: number,
  locale: SupportedLocale = 'en',
  short: boolean = false,
): string => {
  setMomentLocale(locale);
  const date = moment().month(month);
  return short ? date.format('MMM') : date.format('MMMM');
};

// Функция для получения названия дня недели
export const getWeekdayName = (
  day: number,
  locale: SupportedLocale = 'en',
  short: boolean = false,
): string => {
  setMomentLocale(locale);
  const date = moment().day(day);
  return short ? date.format('ddd') : date.format('dddd');
};

// Функция для проверки, является ли дата сегодняшней
export const isToday = (date: Date | string): boolean => {
  return moment(date).isSame(moment(), 'day');
};

// Функция для проверки, является ли дата завтрашней
export const isTomorrow = (date: Date | string): boolean => {
  return moment(date).isSame(moment().add(1, 'day'), 'day');
};

// Функция для проверки, является ли дата вчерашней
export const isYesterday = (date: Date | string): boolean => {
  return moment(date).isSame(moment().subtract(1, 'day'), 'day');
};

// Функция для получения человекочитаемой даты
// export const getHumanReadableDate = (
//   date: Date | string,
//   locale: SupportedLocale = 'en',
// ): string => {
//   setMomentLocale(locale);

//   if (isToday(date)) {
//     return moment.localeData().calendar().sameDay;
//   }

//   if (isTomorrow(date)) {
//     return moment.localeData().calendar().nextDay;
//   }

//   if (isYesterday(date)) {
//     return moment.localeData().calendar().lastDay;
//   }

//   return formatDate(date, 'L', locale);
// };
