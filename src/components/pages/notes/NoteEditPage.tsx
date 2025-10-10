/* eslint-disable react-native/no-inline-styles */
import {EditableText} from '@/components/ui/list/EditableText';
import {
  NoteEditScreenRouteProp,
  NotesFolderItem,
  NotesItems,
  ScreenNavigationProp,
} from '@/core/interfaces';
import {notesService} from '@/core/services';
import moment from 'moment';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  BackHandler,
  Text,
  TouchableOpacity,
  AppState,
  AppStateStatus,
} from 'react-native';
import {
  actions,
  FONT_SIZE,
  IconRecord,
  RichEditor,
  RichToolbar,
} from 'react-native-pell-rich-editor';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
import {useTheme} from '@/assets/config/colors';
import {Button, Chip, Divider} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {getUuid, handleShare, hex2rgba, parseNoteLabel} from '@/core/utils';
import {ColorMenu} from '@/components/ui/menu/ColorMenu';
import {NotesEditMenu} from '@/components/ui/menu/NotesEditMenu';
import {useNavigation} from '@react-navigation/native';
import {AddFolderModal} from '@/components/modals/notes/AddFolderModal';
import {useTranslation} from '@/core/i18n';

export const NoteEditPage = ({route}: {route: NoteEditScreenRouteProp}) => {
  const navigation: ScreenNavigationProp = useNavigation();
  const {t} = useTranslation();

  const [showColorPicker, setShowColorPicker] = useState(false);
  const [text, setDescription] = useState<string>('');
  const [size, setSize] = useState<FONT_SIZE>(4);
  const [note, setNote] = useState<NotesItems>({
    id: getUuid(),
    type: 'note', // 'note, list'
    created: moment().format(),
    updated: null,
    color: '', // need types
    folder: null,
    title: '', //string
    label: '',
    files: [],
  });
  const richTextRef = useRef<RichEditor | null>(null);
  const scroll = useRef<ScrollView | null>(null);
  const folders = useSelector(() => notesService.storeGetFoldersCollection());
  const [visible, setVisible] = useState(false);

  const {colors} = useTheme();

  const handleFontSize = () => {
    let activeSize: FONT_SIZE = 4 as FONT_SIZE;
    if (size === 4) {
      activeSize = 5;
    } else if (size === 5) {
      activeSize = 4;
    }
    // 1=  10px, 2 = 13px, 3 = 16px, 4 = 18px, 5 = 24px, 6 = 32px, 7 = 48px;
    setSize(activeSize);
    richTextRef.current?.setFontSize(activeSize);
  };

  const backSave = useCallback(() => {
    if (!note.title && !note.label) {
      return false;
    }

    if (route.params.noteId) {
      notesService.updateNote({
        ...note,
        label: text,
        updated: moment().format(),
      });
    } else {
      notesService.storeAddNote({...note, label: text});
    }

    return false;
  }, [note, route.params.noteId, text]);

  useEffect(() => {
    const response = notesService.storeGetCollectionNote();
    if (response.length && route.params?.noteId) {
      const findNote = response.find(el => el.id === route.params.noteId);
      if (findNote) {
        setNote({...findNote});
        setDescription(findNote.label);
      }
    }
  }, [route.params.noteId]);

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === 'background') {
        backSave();
        navigation.navigate('NoteEdit', {noteId: note.id});
      }
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      subscription.remove();
    };
  }, [backSave, navigation, note.id]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backSave,
    );

    return () => {
      backHandler.remove();
    };
  }, [backSave, note]);

  // const handleInsertHTML = useCallback(() => {
  //   richTextRef.current?.insertHTML(
  //     `<div style="padding:10px 0;" contentEditable="false">
  //             <iframe  width="100%" height="220"  src="https://www.youtube.com/embed/6FrNXgXlCGA" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  //         </div>`,
  //   );
  // }, []);

  const shareNote = () => {
    handleShare({
      title: note.title,
      message: note.title + '\n' + parseNoteLabel(note.label), // Текст, который вы хотите поделиться
    });
  };

  const getBoldIcon = (icon: IconRecord) => {
    return (
      <FontAwesome
        name="bold"
        size={icon.iconSize}
        color={icon.selected ? colors.primary : icon.tintColor}
      />
    );
  };

  const getItalicIcon = (icon: IconRecord) => {
    return (
      <Octicons
        name="italic"
        size={icon.iconSize}
        color={icon.selected ? colors.primary : icon.tintColor}
      />
    );
  };

  const getTextHeightIcon = (icon: IconRecord) => {
    return (
      <View style={styles.icon}>
        <FontAwesome
          name="text-height"
          size={icon.iconSize}
          color={icon.selected ? colors.primary : icon.tintColor}
        />
        <Text
          style={[
            {
              color: icon.selected ? colors.primary : icon.tintColor,
            },
            styles.text,
          ]}>
          {size === 4 ? 'M' : 'L'}
        </Text>
      </View>
    );
  };

  const getBulletsListIcon = (icon: IconRecord) => {
    return (
      <Octicons
        name="list-unordered"
        size={icon.iconSize}
        color={icon.selected ? colors.primary : icon.tintColor}
      />
    );
  };

  const getOrderedListIcon = (icon: IconRecord) => {
    return (
      <Octicons
        name="list-ordered"
        size={icon.iconSize}
        color={icon.selected ? colors.primary : icon.tintColor}
      />
    );
  };

  const getStrickedIcon = (icon: IconRecord) => {
    return (
      <Octicons
        name="strikethrough"
        size={icon.iconSize}
        color={icon.selected ? colors.primary : icon.tintColor}
      />
    );
  };

  const getUnderlineIcon = (icon: IconRecord) => {
    return (
      <Icon
        name="format-underline"
        size={icon.iconSize}
        color={icon.selected ? colors.primary : icon.tintColor}
      />
    );
  };

  const changeDescription = (description: string) => {
    setDescription(description);
    setNote({...note, label: description});
  };

  const handleFolderSet = (folder: NotesFolderItem) => {
    if (folder.id === note.folder?.id) {
      setNote({
        ...note,
        folder: null,
      });
    } else {
      setNote({
        ...note,
        folder: {id: folder.id, name: folder.name},
      });
    }
  };

  const changeColor = (color: string) => {
    setNote({...note, color: color});
    setShowColorPicker(false);
  };

  const handleCursorPosition = useCallback((scrollY: number) => {
    scroll.current!.scrollTo({y: scrollY - 30, animated: true});
  }, []);

  const deleteNote = () => {
    const notes = notesService.storeGetCollectionNote();
    const findNote = notes.find(el => el.id === note.id);
    if (findNote) {
      notesService.storeSetNotes([...notes.filter(el => el.id !== note.id)]);
      saveNotesInStorage();
    }
    navigation.navigate('Notes');
  };

  const saveNotesInStorage = async () => {
    const response = notesService.storeGetCollectionNote();
    await notesService.storageSetNotes(response);
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: hex2rgba(
            note.color ? note.color : colors.primary,
            0.04,
          ),
        },
      ]}>
      <AddFolderModal visible={visible} hideModal={() => setVisible(false)} />
      <View
        style={[
          styles.content,
          {
            backgroundColor: hex2rgba(
              note.color ? note.color : colors.primary,
              0.15,
            ),
          },
        ]}>
        <EditableText
          style={styles.header}
          label={note.title}
          customText={t('notes.enterNoteTitle')}
          saveText={e => setNote({...note, title: e})}
          isChecked={false}
        />
        <ColorMenu
          visible={showColorPicker}
          onDismiss={() => setShowColorPicker(false)}
          onSelectColor={changeColor}
          anchorComponent={
            <TouchableOpacity onPress={() => setShowColorPicker(true)}>
              <View
                style={[
                  {
                    backgroundColor: note.color ? note.color : colors.primary,
                  },
                  styles.colorPicker,
                ]}
              />
            </TouchableOpacity>
          }
        />
        <View>
          <Icon
            name="share-variant"
            size={24}
            color={colors.greyIconColor}
            style={styles.ml10}
            onPress={shareNote}
          />
        </View>

        <NotesEditMenu deleteNote={() => deleteNote()} />
      </View>
      <Divider />
      <ScrollView
        keyboardDismissMode={'none'}
        ref={ref => (scroll.current = ref)}
        nestedScrollEnabled={true}
        scrollEventThrottle={20}
        style={[styles.view]}>
        <RichEditor
          useContainer={true}
          ref={ref => (richTextRef.current = ref)}
          placeholder={t('notes.noteText')}
          onChange={changeDescription}
          autoCapitalize="sentences"
          initialContentHTML={note.label}
          pasteAsPlainText={true}
          onCursorPosition={handleCursorPosition}
        />
      </ScrollView>

      <View
        style={{
          backgroundColor: hex2rgba(
            note.color ? note.color : colors.primary,
            0.04,
          ),
          padding: 4,
        }}>
        <ScrollView horizontal>
          <View style={styles.chips}>
            {folders.map(el => {
              return (
                <Chip
                  key={el.id}
                  mode="outlined"
                  selected={el.id === note.folder?.id ? true : false}
                  style={{
                    marginRight: 4,
                    backgroundColor: colors.whiteColor,
                    height: 34,
                  }}
                  onPress={() => handleFolderSet(el)}>
                  {el.label}
                </Chip>
              );
            })}
            <View>
              <Button mode="text" onPress={() => setVisible(true)}>
                {folders.length === 0 ? (
                  t('folders.createFolder')
                ) : (
                  <Icon name="plus" size={16} />
                )}
              </Button>
            </View>
          </View>
        </ScrollView>
      </View>
      <View>
        <RichToolbar
          editor={richTextRef}
          actions={[
            actions.undo,
            actions.redo,
            actions.setBold,
            actions.setItalic,
            actions.fontSize,
            actions.insertBulletsList,
            actions.insertOrderedList,
            actions.setStrikethrough,
            actions.setUnderline,
          ]}
          iconMap={{
            [actions.setItalic]: getItalicIcon,
            [actions.setBold]: getBoldIcon,
            [actions.fontSize]: getTextHeightIcon,
            [actions.insertBulletsList]: getBulletsListIcon,
            [actions.insertOrderedList]: getOrderedListIcon,
            [actions.setStrikethrough]: getStrickedIcon,
            [actions.setUnderline]: getUnderlineIcon,
          }}
          getItalicIcon={(icon: IconRecord) => getItalicIcon(icon)}
          getBoldIcon={(icon: IconRecord) => getBoldIcon(icon)}
          fontSize={() => handleFontSize()}
          getBulletsListIcon={(icon: IconRecord) => getBulletsListIcon(icon)}
          getOrderedListIcon={(icon: IconRecord) => getOrderedListIcon(icon)}
          getStrickedIcon={(icon: IconRecord) => getStrickedIcon(icon)}
          getUnderlineIcon={(icon: IconRecord) => getUnderlineIcon(icon)}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  view: {
    flex: 1,
  },
  addBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 5,
    paddingLeft: 5,
  },
  header: {
    fontSize: 20,
    fontWeight: '500',
  },
  colorPicker: {
    width: 35,
    height: 35,
    marginRight: 10,
    marginLeft: 20,
  },
  content: {
    minHeight: 60,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginLeft: 4,
    fontSize: 10,
    width: 8,
  },
  chips: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    maxHeight: 40,
  },
  icon: {
    display: 'flex',
    flexDirection: 'row',
  },
  title: {
    height: 60,
    fontSize: 20,
  },
  button: {
    maxWidth: '40%',
    marginLeft: 20,
  },
  ml10: {
    marginLeft: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignContent: 'center',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 20,
    paddingRight: 20,
  },
});
