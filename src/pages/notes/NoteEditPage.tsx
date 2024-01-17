import {NotesItemList} from '@/core/interfaces';
import {notesService} from '@/core/services';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Text,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {Button} from 'react-native-paper';
import {
  actions,
  FONT_SIZE,
  RichEditor,
  RichToolbar,
} from 'react-native-pell-rich-editor';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface IBarIcon {
  disabled: boolean;
  iconGap: number;
  iconSize: number;
  selected: boolean;
  tintColor: string;
}

export const NoteEditPage = () => {
  const handleHead = (icon: IBarIcon) => {
    return <Text style={{color: icon.tintColor}}>H12</Text>;
  };

  const [note, setNote] = useState<NotesItemList>({
    id: Date.now(),
    type: 'note', // 'note, list'
    color: '', // need types
    folder: '',
    title: 'First', //string
    label: 'qweqweqe',
    files: [],
    fontWeight: 400, // font weight
    fontSize: 16, //font Size
    checked: false,
    children: [
      {
        id: 1,
        label: 'qwe1',
        checked: false,
      },
      {
        id: 2,
        label: 'qweq',
        checked: false,
      },
    ],
  });

  const [text, setDescription] = useState<string>('');

  const richTextRef = React.useRef<RichEditor | null>(null);

  const handleFontSize = useCallback(() => {
    // 1=  10px, 2 = 13px, 3 = 16px, 4 = 18px, 5 = 24px, 6 = 32px, 7 = 48px;
    let size = [1, 2, 3, 4, 5, 6, 7];
    richTextRef.current?.setFontSize(size[4] as FONT_SIZE);
  }, []);

  const getNotesCollection = async () => {
    const response = await notesService.getCollectionNote();

    if (response && response.length > 0) {
      setNote(prevNote => ({
        ...prevNote,
        label: response[0].label,
      }));
    }
  };

  useEffect(() => {
    getNotesCollection();
    console.log('mount');

    return () => {
      // Код, который нужно выполнить при размонтировании компонента (аналог componentWillUnmount)
      console.log('Component will unmount');
    };
  }, []);

  // const setFontSize = fontSize => {
  //   console.log(fontSize);
  //   richTextRef.current?.setFontSize(fontSize);
  // };

  const handleSave = async () => {
    note.label = text;
    await notesService.setNote(note);
  };

  const getIcon = (icon: IBarIcon) => {
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
    console.log('descriptionText:', description);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <Text style={styles.title}>Title</Text>
          <RichEditor
            ref={ref => (richTextRef.current = ref)}
            placeholder={'please input content'}
            onChange={changeDescription}
            initialHeight={500}
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
        getIcon={(icon: IBarIcon) => getIcon(icon)}
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
