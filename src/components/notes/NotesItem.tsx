import React, {useMemo} from 'react';
import {Text} from 'react-native-paper';
import {NotesItems, NotesSortType, SortDirection} from '@/core/interfaces';
import {NoteCard} from './card/NoteCard';
import {FlashList} from '@shopify/flash-list';
import {useSelector} from 'react-redux';
import {notesService, appService} from '@/core/services';
import {StyleSheet} from 'react-native';
import {useTranslation} from '@/core/i18n';

interface Props {
  sortedType: NotesSortType;
  sortDirection: SortDirection;
}

const keyExtractor = (item: NotesItems) => item?.id;
const renderItem = ({item}: {item: NotesItems}) => <NoteCard item={item} />;

export const NotesItem = ({sortedType, sortDirection}: Props) => {
  const notes = useSelector(() => notesService.storeGetCollectionNote());
  const storeColors = useSelector(() => appService.getStoreColors());
  const {t} = useTranslation();
  const sortedNotes = useMemo(() => {
    if (sortedType === 'created') {
      return [...notes].sort((a, b) => {
        return new Date(a.created) < new Date(b.created) ? 1 : -1;
      });
    }

    if (sortedType === 'updated') {
      return [...notes].sort((a, b) => {
        return new Date(a.updated ? a.updated : a.created) <
          new Date(b.updated ? b.updated : b.created)
          ? 1
          : -1;
      });
    }

    if (sortedType === 'title') {
      return [...notes].sort((a, b) => a.title.localeCompare(b.title));
    }

    if (sortedType === 'color') {
      const colors: Record<string, number> = storeColors.reduce(
        (acc: Record<string, number>, cur, i) => {
          acc[cur] = i;
          return acc;
        },
        {},
      );

      return [...notes].sort((a, b) => {
        const colorA = colors[a.color as keyof typeof colors] ?? 999;
        const colorB = colors[b.color as keyof typeof colors] ?? 999;

        // Сначала сортируем по цветам
        if (colorA !== colorB) {
          return colorA > colorB ? 1 : -1;
        }

        // Если цвета одинаковые, сортируем по дате создания
        return new Date(a.created) < new Date(b.created) ? 1 : -1;
      });
    }

    return notes;
  }, [notes, sortedType, storeColors]);

  const sortedListWithDiraction = useMemo(() => {
    if (sortDirection === 'asc') {
      return [...sortedNotes];
    }
    return [...sortedNotes].reverse();
  }, [sortDirection, sortedNotes]);

  return (
    <FlashList
      data={sortedListWithDiraction}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      estimatedItemSize={110}
      ListEmptyComponent={
        <Text style={styles.emptyText}>{t('notes.emptyNotesList')}</Text>
      }
    />
  );
};

const styles = StyleSheet.create({
  emptyText: {
    textAlign: 'center',
    marginTop: 8,
  },
});
