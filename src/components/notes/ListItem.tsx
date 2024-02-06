import React, {memo, useCallback, useMemo} from 'react';
import {FlatList, Text} from 'react-native';
import {NotesListItem, NotesSortType} from '@/core/interfaces';
import {ListCard} from './card/ListCard';
import {notesService} from '@/core/services';
import {useSelector} from 'react-redux';
interface Props {
  sortedType: NotesSortType;
}

export const ListItem = memo(({sortedType}: Props) => {
  const allList = useSelector(() => notesService.storeGetListCollection());

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

    return allList;
  }, [allList, sortedType]);

  const deleteList = async (id: string) => {
    const filterListCollection = [
      ...notesService.storeGetListCollection(),
    ].filter(el => el.id !== id);

    notesService.storageSetLists(filterListCollection);
    notesService.storeSetListCollection(filterListCollection);
  };

  const renderItem = useCallback(({item}: {item: NotesListItem}) => {
    return <ListCard list={item} deleteList={deleteList} />;
  }, []);

  return (
    <FlatList
      data={sortedList}
      keyExtractor={el => el.id}
      renderItem={renderItem}
      windowSize={15}
      ListEmptyComponent={<Text>Список заметок пуст.</Text>}
    />
  );
});
