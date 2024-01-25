import {useTheme} from '@/assets/config/colors';
import {NotesItems, ScreenNavigationProp} from '@/core/interfaces';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Avatar, Card, Text} from 'react-native-paper';
import {NotesMenu} from '../ui/menu/NotesMenu';
import {notesService} from '@/core/services';
import moment from 'moment';

interface Props {
  notes: NotesItems[];
}

export const NotesItem = ({notes}: Props) => {
  const {colors} = useTheme();

  const navigation: ScreenNavigationProp = useNavigation();

  const saveNotesInStorage = async () => {
    const response = notesService.getCollectionNote();

    await notesService.setNotesinStorage(response);
  };

  const stripHtmlTags = (htmlString: string) => {
    const stringWithLineBreaks = htmlString.replace(/<li>/g, '\n');
    // Удаляем остальные HTML-теги
    return stringWithLineBreaks.replace(/<[^>]*>/g, ' ');
  };

  const leftContent = (props: {size: number}) => {
    return <Avatar.Icon {...props} icon="note" />;
  };

  const deleteNote = (id: number) => {
    const findNote = notes.find(el => el.id === id);
    if (findNote) {
      saveNotesInStorage();

      notesService.setNotesInStore([...notes.filter(el => el.id !== id)]);
    }
  };

  const editNote = (id: number) => {
    navigation.navigate('NoteEdit', {noteId: id});
  };

  const getMoreIcon = (note: NotesItems, index: number) => {
    return (
      <NotesMenu
        editNote={() => editNote(note.id)}
        notes={note}
        deleteNote={deleteNote}
        index={index}
      />
    );
  };
  return (
    <>
      {notes.length ? (
        notes.map((el, index) => {
          return (
            <View key={el.id} style={styles.item}>
              <Card
                style={{backgroundColor: colors.whiteColor}}
                onPress={() => editNote(el.id)}>
                <Card.Title
                  title={el.title || stripHtmlTags(el.label)}
                  left={props => leftContent(props)}
                  right={() => getMoreIcon(el, index)}
                />
                <Card.Content>
                  <Text variant="labelSmall" style={{color: colors.greyColor}}>
                    {moment(el.updated ? el.updated : el.created).format(
                      'YYYY-MM-DD HH:mm',
                    )}
                  </Text>
                </Card.Content>
              </Card>
            </View>
          );
        })
      ) : (
        <></>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  item: {
    margin: 5,
  },
});
