import React, {memo, useCallback, useMemo} from 'react';
import {FlatList} from 'react-native';
import {NotesListItem, NotesSortType} from '@/core/interfaces';
import {ListCard} from './card/ListCard';
import {notesService} from '@/core/services';
import {useSelector} from 'react-redux';
interface Props {
  sortedType: NotesSortType;
  editList: (list: NotesListItem) => void;
}

export const ListItem = memo(({sortedType, editList}: Props) => {
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

  const renderItem = useCallback(
    ({item}: {item: NotesListItem}) => {
      return (
        <ListCard list={item} deleteList={deleteList} editList={editList} />
      );
    },
    [editList],
  );

  return (
    <FlatList
      data={sortedList}
      keyExtractor={el => el.id}
      renderItem={renderItem}
      windowSize={15}
      ListEmptyComponent={<></>}
    />
  );
});
