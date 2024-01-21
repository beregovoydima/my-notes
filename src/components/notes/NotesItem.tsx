import {useTheme} from '@/assets/config/colors';
import {NotesItemList, ScreenNavigationProp} from '@/core/interfaces';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Avatar, Card, Text} from 'react-native-paper';
import {NotesMenu} from '../ui/menu/NotesMenu';
import {notesService} from '@/core/services';

interface Props {
  notes: NotesItemList[];
}

export const NotesItem = ({notes}: Props) => {
  const {colors} = useTheme();

  const navigation: ScreenNavigationProp = useNavigation();

  // const getLeftIcon = (props: any) => {
  //   return <Avatar.Icon {...props} icon="folder" />;
  // };

  // const getRightIcon = (props: any) => {
  //   return <IconButton {...props} icon="dots-vertical" onPress={() => {}} />;
  // };

  const saveNotesInStorage = async () => {
    const response = notesService.getCollectionNote();

    await notesService.setNotesinStorage(response);
  };

  const stripHtmlTags = (htmlString: string) => {
    const stringWithLineBreaks = htmlString.replace(/<li>/g, '\n');
    // Удаляем остальные HTML-теги
    return stringWithLineBreaks.replace(/<[^>]*>/g, ' ');
  };

  const LeftContent = props => <Avatar.Icon {...props} icon="folder" />;

  const deleteNote = (id: number) => {
    const findNote = notes.find(el => el.id === id);
    if (findNote) {
      notesService.setNotesInStore([...notes.filter(el => el.id !== id)]);
      saveNotesInStorage();
    }
  };

  const editNote = (id: number) => {
    navigation.navigate('NoteEdit', {noteId: id});
  };

  const getMoreIcon = (note: NotesItemList) => {
    return (
      <NotesMenu
        editNote={() => editNote(note.id)}
        notes={note}
        deleteNote={deleteNote}
      />
    );
  };
  return (
    <>
      {notes.map(el => {
        return (
          <View key={el.id} style={styles.item}>
            <Card
              style={{backgroundColor: colors.whiteColor}}
              onPress={() => editNote(el.id)}>
              <Card.Title
                title={el.title}
                subtitle={stripHtmlTags(el.label)}
                left={LeftContent}
                right={() => getMoreIcon(el)}
              />
              <Card.Content>
                <Text variant="labelMedium">{stripHtmlTags(el.label)}</Text>
              </Card.Content>
            </Card>
          </View>
        );
      })}
    </>
  );
};

const styles = StyleSheet.create({
  item: {
    margin: 5,
  },
});
