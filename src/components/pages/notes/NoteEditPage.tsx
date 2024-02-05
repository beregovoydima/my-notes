import {EditableText} from '@/components/ui/list/EditableText';
import {
  NoteEditScreenRouteProp,
  NotesItems,
  ScreenNavigationProp,
} from '@/core/interfaces';
import {notesService} from '@/core/services';
import {useNavigation} from '@react-navigation/native';
// import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Text,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  BackHandler,
} from 'react-native';
import {Button} from 'react-native-paper';
import {
  actions,
  FONT_SIZE,
  IconRecord,
  RichEditor,
  RichToolbar,
} from 'react-native-pell-rich-editor';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import uuid from 'react-native-uuid';

export const NoteEditPage = ({route}: {route: NoteEditScreenRouteProp}) => {
  const navigation: ScreenNavigationProp = useNavigation();

  const [text, setDescription] = useState<string>('');
  const [note, setNote] = useState<NotesItems>({
    id: uuid.v4().toString(),
    type: 'note', // 'note, list'
    created: moment().format(),
    updated: null,
    color: '', // need types
    folder: '',
    title: '', //string
    label: '',
    files: [],
    fontWeight: 400, // font weight
    fontSize: 16, //font Size
  });
  const richTextRef = useRef<RichEditor | null>(null);

  const handleFontSize = useCallback(() => {
    // 1=  10px, 2 = 13px, 3 = 16px, 4 = 18px, 5 = 24px, 6 = 32px, 7 = 48px;
    let size = [1, 2, 3, 4, 5, 6, 7];
    richTextRef.current?.setFontSize(size[7] as FONT_SIZE);
  }, []);

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

  const handleSave = async () => {
    if (route.params.noteId) {
      await notesService.updateNote({...note, label: text});
    } else {
      await notesService.storeAddNote({...note, label: text});
    }
    navigation.navigate('Notes');
  };

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

  const getIcon = (icon: IconRecord) => {
    return <Icon name="folder" size={icon.iconSize} color={icon.tintColor} />;
  };

  // const handleInsertHTML = useCallback(() => {
  //   richTextRef.current?.insertHTML(
  //     `<div style="padding:10px 0;" contentEditable="false">
  //             <iframe  width="100%" height="220"  src="https://www.youtube.com/embed/6FrNXgXlCGA" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  //         </div>`,
  //   );
  // }, []);

  const handleHead = (icon: IconRecord) => {
    return <Text style={{color: icon.tintColor}}>H12</Text>;
  };

  const changeDescription = (description: string) => {
    console.log('qweqw');

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
          />
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <RichEditor
            ref={ref => (richTextRef.current = ref)}
            placeholder={'please input content'}
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
          actions.insertImage,
          actions.setBold,
          actions.setItalic,
          actions.fontSize,
          actions.insertBulletsList,
          actions.insertOrderedList,
          actions.setStrikethrough,
          actions.setUnderline,
          actions.removeFormat,
          actions.setTitlePlaceholder,
          actions.setEditorHeight,
        ]}
        iconMap={{
          [actions.heading1]: handleHead,
        }}
        getIcon={(icon: IconRecord) => getIcon(icon)}
        fontSize={handleFontSize}
      />
      <Button onPress={handleSave}>Save</Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {height: 60, fontSize: 20},
});
