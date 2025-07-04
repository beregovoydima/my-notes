import {Share, ShareContent} from 'react-native';
import uuid from 'react-native-uuid';
import {HighlightedPart, NotesListItem} from '../interfaces';

export const getUuid = () => {
  return uuid.v4().toString();
};

export const parseNoteLabel = (htmlString: string) => {
  // Заменяем <div> на новую строку
  const stringWithLineBreaks = htmlString.replace(/<div>/g, '\n');

  // Заменяем <li> на перенос строки с табуляцией
  const stringWithTabs = stringWithLineBreaks.replace(/<li>/g, '\n\t');

  // Заменяем <b> на жирный текст
  const stringWithBoldText = stringWithTabs
    .replace(/<b>/g, '**')
    .replace(/<\/b>/g, '**');

  // Заменяем <i> на курсив
  const stringWithItalicText = stringWithBoldText
    .replace(/<i>/g, '*')
    .replace(/<\/i>/g, '*');

  // Заменяем <strike> на перечеркнутый текст
  const stringWithStrikeText = stringWithItalicText
    .replace(/<strike>/g, '~~')
    .replace(/<\/strike>/g, '~~');

  // Заменяем <u> на подчеркнутый текст
  const stringWithUnderlineText = stringWithStrikeText
    .replace(/<u>/g, '__')
    .replace(/<\/u>/g, '__');

  // Заменяем &nbsp; на пробелы
  const stringWithSpaces = stringWithUnderlineText.replace(/&nbsp;/g, ' ');

  // Удаляем все остальные HTML-теги
  const stringWithoutTags = stringWithSpaces.replace(/<[^>]*>/g, '');

  return stringWithoutTags;
};

export const parseList = (list: NotesListItem): string => {
  let listItem = list.title + '\n';
  list.items.forEach(el => {
    listItem =
      listItem +
      '\n\t' +
      el.text +
      (el.isChecked ? ' ' + '\u2713' : '') +
      el.children
        .map(
          item =>
            '\n\t\t' +
            ' ' +
            '\u2022' +
            item.text +
            (item.isChecked ? ' ' + '\u2713' : ''),
        )
        .join('');
  });

  return listItem;
};

export const handleShare = async (options: ShareContent) => {
  try {
    await Share.share(options);
  } catch (error) {
    console.log(error);
  }
};

export const getHighlightedParts = (
  text: string,
  query: string,
): HighlightedPart[] => {
  if (!query || query.trim() === '') {
    return [{text, highlight: false}];
  }
  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  if (escapedQuery === '') {
    return [{text, highlight: false}];
  }
  const parts = text.split(new RegExp(`(${escapedQuery})`, 'gi'));

  return parts
    .filter(part => part)
    .map(part => ({
      text: part,
      highlight: part.toLowerCase() === query.toLowerCase(),
    }));
};

export const getAppVersion = (): string => {
  // В React Native можно использовать react-native-device-info
  // или получить версию из нативных модулей
  // Пока возвращаем статичную версию
  return '1.0.0';
};
