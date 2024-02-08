import {useTheme} from '@/assets/config/colors';
import {NotesMenu} from '@/components/ui/menu/NotesMenu';
import {NotesItems, ScreenNavigationProp} from '@/core/interfaces';
import {notesService} from '@/core/services';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {Avatar, Card, Icon, Text} from 'react-native-paper';

export const NoteCard = React.memo(
  ({item, index}: {item: NotesItems; index: number}) => {
    const {colors} = useTheme();
    const navigation: ScreenNavigationProp = useNavigation();

    const stripHtmlTags = (htmlString: string) => {
      const stringWithLineBreaks = htmlString.replace(/<li>/g, '\n');
      return stringWithLineBreaks.replace(/<[^>]*>/g, ' ');
    };

    const leftContent = (props: {size: number}) => {
      return <Avatar.Icon {...props} icon="note" />;
    };

    const editNote = (id: string) => {
      navigation.navigate('NoteEdit', {noteId: id});
    };

    const saveNotesInStorage = async () => {
      const response = notesService.storeGetCollectionNote();
      await notesService.storageSetNotes(response);
    };

    const deleteNote = useCallback((id: string) => {
      const notes = notesService.storeGetCollectionNote();
      const findNote = notes.find(el => el.id === id);
      if (findNote) {
        saveNotesInStorage();
        notesService.storeSetNotes([...notes.filter(el => el.id !== id)]);
      }
    }, []);

    const getMoreIcon = () => {
      return (
        <NotesMenu
          editNote={() => editNote(item.id)}
          notes={item}
          deleteNote={() => deleteNote(item.id)}
          index={index}
        />
      );
    };

    return (
      <View style={styles.item}>
        <Card
          style={{backgroundColor: colors.whiteColor}}
          onPress={() => editNote(item.id)}>
          <Card.Title
            title={item.title || stripHtmlTags(item.label)}
            left={props => leftContent(props)}
            right={getMoreIcon}
          />
          <Card.Content>
            <View style={styles.footer}>
              <View style={styles.footer}>
                {item.updated ? (
                  <Icon
                    source="circle-edit-outline"
                    size={12}
                    color={colors.greyColor}
                  />
                ) : null}
                <Text
                  variant="labelSmall"
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{
                    color: colors.greyColor,
                    marginLeft: item.updated ? 4 : 0,
                  }}>
                  {moment(item.updated ? item.updated : item.created).format(
                    'YYYY-MM-DD HH:mm',
                  )}
                </Text>
              </View>
              <Text
                variant="labelSmall"
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  color: colors.greyColor,
                  marginLeft: item.updated ? 4 : 0,
                }}>
                {item.folder?.name}
              </Text>
            </View>
          </Card.Content>
        </Card>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  item: {
    margin: 5,
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
