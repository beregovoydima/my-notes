import {NoteEditScreenRouteProp, NotesItems} from '@/core/interfaces';
import {notesService} from '@/core/services';
import {useNavigation} from '@react-navigation/native';
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
} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {
  actions,
  FONT_SIZE,
  IconRecord,
  RichEditor,
  RichToolbar,
} from 'react-native-pell-rich-editor';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const NoteEditPage = ({route}: {route: NoteEditScreenRouteProp}) => {
  const handleHead = (icon: IconRecord) => {
    return <Text style={{color: icon.tintColor}}>H12</Text>;
  };

  const [isEdit, setIsEdit] = useState(false);
  console.log(1, route.params?.noteId);

  const [note, setNote] = useState<NotesItems>({
    id: Date.now(),
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
    checked: false,
    children: [],
  });

  const [text, setDescription] = useState<string>('');
  const [title, setTitle] = useState('');

  const richTextRef = React.useRef<RichEditor | null>(null);

  const handleFontSize = useCallback(() => {
    // 1=  10px, 2 = 13px, 3 = 16px, 4 = 18px, 5 = 24px, 6 = 32px, 7 = 48px;
    let size = [1, 2, 3, 4, 5, 6, 7];
    richTextRef.current?.setFontSize(size[4] as FONT_SIZE);
  }, []);

  useEffect(() => {
    const response = notesService.getCollectionNote();
    if (response.length && route.params?.noteId) {
      const findNote = response.find(el => el.id === route.params.noteId);
      setNote(prevNote => ({
        ...prevNote,
        label: findNote?.label || '',
        title: findNote?.title || '',
      }));
    }
  }, [route.params.noteId]);

  const handleSave = async () => {
    note.label = text;
    note.id = Date.now();

    await notesService.setNote(note);
  };

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

  const changeDescription = (description: string) => {
    setDescription(description);
  };

  const textInput = useRef(null);

  useEffect(() => {
    if (isEdit) {
      // Фокусируемся на текстовом поле при входе в режим редактирования
      textInput.current?.focus();
    }
  }, [isEdit]);

  const editMode = () => {
    setIsEdit(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <View>
          {isEdit ? (
            <TextInput
              ref={textInput}
              label="Title"
              value={title}
              onEndEditing={() => setIsEdit(false)}
              onChangeText={e => setTitle(e)}
            />
          ) : (
            <Text style={styles.title} onPress={() => editMode()}>
              {title ? title : 'Заголовок'}
            </Text>
          )}
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
          actions.checkboxList,
          actions.setTitlePlaceholder,
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
  title: {
    color: 'black',
    fontSize: 30,
  },
});
