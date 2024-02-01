import React, {useCallback} from 'react';
import {FlatList} from 'react-native';
import {Text} from 'react-native-paper';
import {notesService} from '@/core/services';
import {NotesItems} from '@/core/interfaces';
import {NoteCard} from './card/NoteCard';

interface Props {
  notes: NotesItems[];
}

export const NotesItem = ({notes}: Props) => {
  const saveNotesInStorage = async () => {
    const response = notesService.storeGetCollectionNote();
    await notesService.storageSetNotes(response);
  };

  const deleteNote = useCallback(
    (id: number) => {
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
      data={notes}
      renderItem={({item, index}) => (
        <NoteCard item={item} index={index} deleteNote={deleteNote} />
      )}
      keyExtractor={item => item.id.toString()}
      ListEmptyComponent={<Text>Список заметок пуст.</Text>}
    />
  );
};
