import {useTheme} from '@/assets/config/colors';
import React, {useEffect, useState} from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputSubmitEditingEventData,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
interface Props {
  isChecked: boolean;
  label: string;
  saveText: (val: string) => void;
  style?: TextStyle;
  customText?: string;
  autofocus?: boolean;
  onSubmitEditing?: (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => void;
}

export const EditableText = ({
  isChecked,
  label,
  saveText,
  style,
  customText,
  onSubmitEditing,
  autofocus,
}: Props) => {
  const {colors} = useTheme();

  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSave = () => {
    saveText(text);
    setIsEditing(false);
    setIsFocused(false);
  };

  const changeText = (e: string) => {
    setText(e);
    saveText(e);
  };

  useEffect(() => {
    if (autofocus) {
      setIsEditing(true);
      setIsFocused(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setText(label);
  }, [label]);

  return (
    <View style={styles.container}>
      {isEditing ? (
        <TextInput
          style={[
            styles.input,
            isChecked && styles.checkedText,
            {color: colors.text},
            {
              ...style,
            },
          ]}
          value={text}
          onChangeText={changeText}
          onBlur={handleSave}
          autoFocus={isFocused}
          selectionColor={colors.primary}
          onSubmitEditing={e => {
            e.preventDefault(); // Избегаем действия по умолчанию для Enter
            handleSave();
            if (onSubmitEditing && !!text) {
              onSubmitEditing(e); // Вызываем функцию сохранения при нажатии Enter
            }
          }}
        />
      ) : (
        <TouchableOpacity
          style={styles.textContainer}
          onPress={() => {
            setIsFocused(true);
            setIsEditing(true);
          }}>
          <View>
            <Text
              numberOfLines={2}
              style={[
                styles.text,
                isChecked && !!text && styles.checkedText,
                {color: colors.text},
                {
                  ...style,
                },
              ]}>
              {text || customText || 'Введите текст'}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    marginLeft: 5,
  },
  textContainer: {
    marginLeft: 8,
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  text: {
    minHeight: 60,
    textAlignVertical: 'center',
    fontSize: 16,
  },
  checkedText: {
    textDecorationLine: 'line-through',
  },
  input: {
    minHeight: 60,
    marginLeft: 8,
    fontSize: 16,
    flex: 1,
    padding: 0,
  },
});
