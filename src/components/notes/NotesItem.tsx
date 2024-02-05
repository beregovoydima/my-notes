import React, {useCallback, useMemo} from 'react';
import {FlatList} from 'react-native';
import {Text} from 'react-native-paper';
import {notesService} from '@/core/services';
import {NotesItems, NotesSortType} from '@/core/interfaces';
import {NoteCard} from './card/NoteCard';

interface Props {
  notes: NotesItems[];
  sortedType: NotesSortType;
}

export const NotesItem = ({notes, sortedType}: Props) => {
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

    return notes;
  }, [notes, sortedType]);

  const saveNotesInStorage = async () => {
    const response = notesService.storeGetCollectionNote();
    await notesService.storageSetNotes(response);
  };

  const deleteNote = useCallback(
    (id: string) => {
      const findNote = notes.find(el => el.id === id);
      if (findNote) {
        saveNotesInStorage();
        notesService.storeSetNotes([...notes.filter(el => el.id !== id)]);
      }
    },
    [notes],
  );

  return (
    <FlatList
      data={sortedNotes}
      renderItem={({item, index}) => (
        <NoteCard item={item} index={index} deleteNote={deleteNote} />
      )}
      keyExtractor={item => item.id}
      ListEmptyComponent={<Text>Список заметок пуст.</Text>}
    />
  );
};
