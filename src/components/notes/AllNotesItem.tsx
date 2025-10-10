import React, {memo, useMemo} from 'react';
import {StyleSheet, Text} from 'react-native';
import {
  NotesFolderItemKey,
  NotesItems,
  NotesListItem,
  NotesSortType,
  SortDirection,
} from '@/core/interfaces';
import {ListCard} from './card/ListCard';
import {notesService, appService} from '@/core/services';
import {useSelector} from 'react-redux';
import {NoteCard} from './card/NoteCard';
import {FlashList} from '@shopify/flash-list';
import {useTranslation} from '@/core/i18n';

interface Props {
  sortedType: NotesSortType;
  sortDirection: SortDirection;
  filterFolder: NotesFolderItemKey | null;
}

const keyExtractor = (item: NotesListItem | NotesItems) => item?.id;
const renderItem = ({item}: {item: NotesItems | NotesListItem}) => {
  if (item.type === 'note') {
    return <NoteCard item={item as NotesItems} />;
  }
  return <ListCard list={item as NotesListItem} />;
};

export const AllNotesItem = memo(
  ({sortedType, sortDirection, filterFolder}: Props) => {
    const allList = useSelector(() => notesService.storeGetListCollection());
    const allNotes = useSelector(() => notesService.storeGetCollectionNote());
    const storeColors = useSelector(() => appService.getStoreColors());
    const {t} = useTranslation();

    const sortedItems = useMemo(() => {
      if (sortedType === 'created') {
        return [...allList, ...allNotes].sort((a, b) => {
          return new Date(a.created) < new Date(b.created) ? 1 : -1;
        });
      }

      if (sortedType === 'updated') {
        return [...allList, ...allNotes].sort((a, b) => {
          return new Date(a.updated ? a.updated : a.created) <
            new Date(b.updated ? b.updated : b.created)
            ? 1
            : -1;
        });
      }

      if (sortedType === 'title') {
        return [...allList, ...allNotes].sort((a, b) =>
          a.title.localeCompare(b.title),
        );
      }

      if (sortedType === 'folder') {
        return [...allList, ...allNotes].sort((a, b) => {
          if (a.folder?.name && b.folder?.name) {
            return a.folder.name.toLowerCase() > b.folder.name.toLowerCase()
              ? 1
              : -1;
          }
          // Если только у a есть папка, поместите a перед b
          if (a.folder?.name) {
            return -1;
          }
          // Если только у b есть папка, поместите b перед a
          if (b.folder?.name) {
            return 1;
          }
          // Если у обоих элементов нет папок, сохраните текущий порядок
          return 0;
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

        return [...allList, ...allNotes].sort((a, b) => {
          return colors[a.color as keyof typeof colors] >
            colors[b.color as keyof typeof colors]
            ? 1
            : -1;
        });
      }

      return [...allList, ...allNotes];
    }, [allList, allNotes, sortedType, storeColors]);

    const sortedItemsWithDiraction = useMemo(() => {
      if (sortDirection === 'asc') {
        return [...sortedItems];
      }
      return [...sortedItems].reverse();
    }, [sortDirection, sortedItems]);

    const filteredItems = useMemo(() => {
      if (filterFolder) {
        return [...sortedItemsWithDiraction].filter(
          el => el.folder?.id === filterFolder.id,
        );
      }
      return [...sortedItemsWithDiraction];
    }, [filterFolder, sortedItemsWithDiraction]);

    return (
      <FlashList
        data={filteredItems}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        estimatedItemSize={114}
        ListEmptyComponent={
          <Text style={styles.emptyText}>{t('notes.emptyNotesList')}</Text>
        }
      />
    );
  },
);

const styles = StyleSheet.create({
  emptyText: {
    textAlign: 'center',
    marginTop: 8,
    color: 'black',
  },
});
