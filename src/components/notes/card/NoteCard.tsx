import {useTheme} from '@/assets/config/colors';
import {NotesMenu} from '@/components/ui/menu/NotesMenu';
import {NotesItems, ScreenNavigationProp} from '@/core/interfaces';
import {notesService} from '@/core/services';
import {
  getHighlightedParts,
  handleShare,
  hex2rgba,
  parseNoteLabel,
} from '@/core/utils';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {Avatar, Card, Icon, Text} from 'react-native-paper';
import {useCardBackground} from '@/core/hooks';

export const NoteCard = React.memo(
  ({item, searchQuery}: {item: NotesItems; searchQuery?: string}) => {
    const {colors} = useTheme();
    const navigation: ScreenNavigationProp = useNavigation();
    const showCardBackground = useCardBackground();

    // Получаем название папки по ID
    const getFolderName = useCallback(() => {
      if (!item.folder?.id) {
        return '';
      }
      const folders = notesService.storeGetFoldersCollection();
      const folder = folders.find(f => f.id === item.folder?.id);
      return folder?.label || '';
    }, [item.folder?.id]);

    const stripHtmlTags = (htmlString: string) => {
      const stringWithLineBreaks = htmlString.replace(/<li>/g, '\n');
      return stringWithLineBreaks.replace(/<[^>]*>/g, ' ');
    };

    const leftContent = (props: {size: number}) => {
      return (
        <Avatar.Icon
          {...props}
          style={{backgroundColor: item.color ? item.color : colors.primary}}
          color={colors.whiteColor}
          icon="note"
        />
      );
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
        notesService.storeSetNotes([...notes.filter(el => el.id !== id)]);
        saveNotesInStorage();
      }
    }, []);

    const shareNote = () => {
      handleShare({
        title: item.title,
        message: item.title + '\n' + parseNoteLabel(item.label),
      });
    };

    const getMoreIcon = () => {
      return (
        <NotesMenu
          editNote={() => editNote(item.id)}
          notes={item}
          deleteNote={() => deleteNote(item.id)}
          shareNote={shareNote}
        />
      );
    };

    return (
      <View style={styles.item}>
        <Card onPress={() => editNote(item.id)}>
          <Card.Title
            style={[
              styles.topBorder,
              showCardBackground && {
                backgroundColor: hex2rgba(item.color || colors.primary, 0.08),
                borderBottomColor: hex2rgba(item.color || colors.primary, 0.08),
              },
              !showCardBackground && {
                backgroundColor: colors.whiteColor,
                borderBottomColor: colors.whiteColor,
              },
            ]}
            title={
              searchQuery ? (
                <Text>
                  {getHighlightedParts(
                    item.title || stripHtmlTags(item.label),
                    searchQuery,
                  ).map((part, index) => (
                    <Text
                      key={index}
                      style={
                        part.highlight
                          ? {backgroundColor: colors.primaryContainer}
                          : {}
                      }>
                      {part.text}
                    </Text>
                  ))}
                </Text>
              ) : (
                item.title || stripHtmlTags(item.label)
              )
            }
            left={props => leftContent(props)}
            right={getMoreIcon}
          />
          <Card.Content
            style={[
              styles.bottomBorder,
              showCardBackground && {
                backgroundColor: hex2rgba(item.color || colors.primary, 0.08),
              },
              !showCardBackground && {
                backgroundColor: colors.whiteColor,
                borderTopColor: colors.whiteColor,
              },
            ]}>
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
              <View style={styles.footer}>
                {getFolderName() ? (
                  <Icon
                    source="folder-outline"
                    size={12}
                    color={colors.greyColor}
                  />
                ) : null}
                <Text
                  variant="labelSmall"
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{
                    color: colors.greyColor,
                    marginLeft: getFolderName() ? 4 : 0,
                  }}>
                  {getFolderName()}
                </Text>
              </View>
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
  topBorder: {
    borderTopEndRadius: 12,
    borderTopLeftRadius: 12,
  },
  bottomBorder: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
});
