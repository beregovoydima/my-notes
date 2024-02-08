import React, {memo, useCallback, useMemo} from 'react';
import {FlatList, Text} from 'react-native';
import {
  NotesFolderItemKey,
  NotesItems,
  NotesListItem,
  NotesSortType,
  SortDirection,
} from '@/core/interfaces';
import {ListCard} from './card/ListCard';
import {notesService} from '@/core/services';
import {useSelector} from 'react-redux';
import {styleColorArr} from '@/core/utils';
import {NoteCard} from './card/NoteCard';

interface Props {
  sortedType: NotesSortType;
  sortDirection: SortDirection;
  filterFolder: NotesFolderItemKey | null;
}

export const AllNotesItem = memo(
  ({sortedType, sortDirection, filterFolder}: Props) => {
    const allList = useSelector(() => notesService.storeGetListCollection());
    const allNotes = useSelector(() => notesService.storeGetCollectionNote());

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
        const colors: Record<string, number> = styleColorArr.reduce(
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
    }, [allList, allNotes, sortedType]);

    const sortedItemsWithDiraction = useMemo(() => {
      if (sortDirection === 'desc') {
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

    const renderItem = useCallback(
      ({item, index}: {item: NotesItems | NotesListItem; index: number}) => {
        if (item.type === 'note') {
          return <NoteCard item={item as NotesItems} index={index} />;
        }
        return <ListCard list={item as NotesListItem} />;
      },
      [],
    );

    return (
      <FlatList
        data={filteredItems}
        keyExtractor={el => el.id}
        renderItem={renderItem}
        initialNumToRender={7}
        maxToRenderPerBatch={5}
        windowSize={15}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={<Text>Список заметок пуст.</Text>}
      />
    );
  },
);
