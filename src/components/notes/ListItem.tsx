import React, {memo, useMemo} from 'react';
import {StyleSheet, Text} from 'react-native';
import {NotesListItem, NotesSortType, SortDirection} from '@/core/interfaces';
import {ListCard} from './card/ListCard';
import {notesService, appService} from '@/core/services';
import {useSelector} from 'react-redux';
import {FlashList} from '@shopify/flash-list';
import {useTranslation} from '@/core/i18n';

interface Props {
  sortedType: NotesSortType;
  sortDirection: SortDirection;
}

const keyExtractor = (item: NotesListItem) => item?.id;
const renderItem = ({item}: {item: NotesListItem}) => <ListCard list={item} />;

export const ListItem = memo(({sortedType, sortDirection}: Props) => {
  const allList = useSelector(() => notesService.storeGetListCollection());
  const storeColors = useSelector(() => appService.getStoreColors());
  const {t} = useTranslation();

  const sortedList = useMemo(() => {
    if (sortedType === 'created') {
      return [...allList].sort((a, b) => {
        return new Date(a.created) < new Date(b.created) ? 1 : -1;
      });
    }

    if (sortedType === 'updated') {
      return [...allList].sort((a, b) => {
        return new Date(a.updated ? a.updated : a.created) <
          new Date(b.updated ? b.updated : b.created)
          ? 1
          : -1;
      });
    }

    if (sortedType === 'title') {
      return [...allList].sort((a, b) => a.title.localeCompare(b.title));
    }

    if (sortedType === 'folder') {
      return [...allList].sort((a, b) => {
        return (a.folder?.name || '').localeCompare(b.folder?.name || '');
      });
    }

    if (sortedType === 'color') {
      const colors: Record<string, number> = storeColors.reduce(
        (acc: Record<string, number>, cur, i) => {
          acc[cur] = i;
          return acc;
        },
        {},
      );

      return [...allList].sort((a, b) => {
        return colors[a.color as keyof typeof colors] >
          colors[b.color as keyof typeof colors]
          ? 1
          : -1;
      });
    }

    return allList;
  }, [allList, sortedType, storeColors]);

  const sortedListWithDiraction = useMemo(() => {
    if (sortDirection === 'asc') {
      return [...sortedList];
    }
    return [...sortedList].reverse();
  }, [sortDirection, sortedList]);

  return (
    <FlashList
      data={sortedListWithDiraction}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      estimatedItemSize={114}
      ListEmptyComponent={
        <Text style={styles.emptyText}>{t('notes.emptyNotesList')}</Text>
      }
    />
  );
});

const styles = StyleSheet.create({
  emptyText: {
    textAlign: 'center',
    marginTop: 8,
  },
});
