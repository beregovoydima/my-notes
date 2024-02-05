import {useTheme} from '@/assets/config/colors';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
interface Props {
  isChecked: boolean;
  label: string;
  saveText: (val: string) => void;
  style?: TextStyle;
}

export const EditableText = ({isChecked, label, saveText, style}: Props) => {
  const {colors} = useTheme();

  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState('');

  const handleSave = () => {
    saveText(text);
    setIsEditing(false);
  };

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
          onChangeText={setText}
          onBlur={handleSave}
          autoFocus
          selectionColor={colors.primary}
        />
      ) : (
        <TouchableOpacity
          style={styles.textContainer}
          onPress={() => setIsEditing(true)}>
          <View>
            <Text
              numberOfLines={1}
              style={[
                styles.text,
                isChecked && styles.checkedText,
                {color: colors.text},
                {
                  ...style,
                },
              ]}>
              {text || 'Введите текст'}
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
    textAlignVertical: 'center',
    fontSize: 16,
  },
  checkedText: {
    textDecorationLine: 'line-through',
  },
  input: {
    marginLeft: 8,
    fontSize: 16,
    flex: 1,
    padding: 0,
  },
});
