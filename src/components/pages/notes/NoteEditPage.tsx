import {EditableText} from '@/components/ui/list/EditableText';
import {
  NoteEditScreenRouteProp,
  NotesItems,
  // ScreenNavigationProp,
} from '@/core/interfaces';
import {notesService} from '@/core/services';
// import {useNavigation} from '@react-navigation/native';
// import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  BackHandler,
  Text,
} from 'react-native';
// import {Button} from 'react-native-paper';
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
import uuid from 'react-native-uuid';
import {useTheme} from '@/assets/config/colors';
import {Divider} from 'react-native-paper';

export const NoteEditPage = ({route}: {route: NoteEditScreenRouteProp}) => {
  // const navigation: ScreenNavigationProp = useNavigation();

  const [text, setDescription] = useState<string>('');
  const [size, setSize] = useState<FONT_SIZE>(4);
  const [note, setNote] = useState<NotesItems>({
    id: uuid.v4().toString(),
    type: 'note', // 'note, list'
    created: moment().format(),
    updated: null,
    color: '', // need types
    folder: null,
    title: '', //string
    label: '',
    files: [],
    fontWeight: 400, // font weight
    fontSize: 16, //font Size
  });
  const richTextRef = useRef<RichEditor | null>(null);

  const {colors} = useTheme();

  const handleFontSize = () => {
    let activeSize: FONT_SIZE = 4 as FONT_SIZE;
    if (size === 4) {
      activeSize = 7;
    } else if (size === 7) {
      activeSize = 1;
    } else if (size === 1) {
      activeSize = 4;
    }

    // 1=  10px, 2 = 13px, 3 = 16px, 4 = 18px, 5 = 24px, 6 = 32px, 7 = 48px;
    setSize(activeSize);
    richTextRef.current?.setFontSize(activeSize);
  };

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

  // const handleSave = async () => {
  //   if (route.params.noteId) {
  //     await notesService.updateNote({...note, label: text});
  //   } else {
  //     await notesService.storeAddNote({...note, label: text});
  //   }
  //   navigation.navigate('Notes');
  // };

  const backSave = useCallback(() => {
    if (route.params.noteId) {
      notesService.updateNote({...note, label: text});
    } else {
      notesService.storeAddNote({...note, label: text});
    }

    return false;
  }, [note, route.params.noteId, text]);

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
          {size === 1 ? 'S' : size === 4 ? 'M' : 'L'}
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
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <View>
          <EditableText
            label={note.title}
            isChecked={false}
            saveText={e => setNote({...note, title: e})}
            style={styles.title}
            customText="Заголовок"
          />
        </View>
        <Divider />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <RichEditor
            ref={ref => (richTextRef.current = ref)}
            placeholder={'Текст заметки'}
            onChange={changeDescription}
            initialContentHTML={note.label}
          />
        </KeyboardAvoidingView>
      </ScrollView>

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
      {/* <Button onPress={handleSave}>Save</Button> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  text: {
    marginLeft: 4,
    fontSize: 10,
    width: 8,
  },
  icon: {
    display: 'flex',
    flexDirection: 'row',
  },
  title: {height: 60, fontSize: 20},
});
