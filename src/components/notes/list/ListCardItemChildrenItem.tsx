import {useTheme} from '@/assets/config/colors';
import {NotesListItemChildrenItem} from '@/core/interfaces';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Checkbox, Text} from 'react-native-paper';

interface Props {
  children: NotesListItemChildrenItem;
  saveChildren: (children: NotesListItemChildrenItem) => void;
}

export const ListCardItemCildrenItem = React.memo(
  ({children, saveChildren}: Props) => {
    const {colors} = useTheme();

    const checkList = () => {
      const child: NotesListItemChildrenItem = {
        ...children,
        isChecked: !children.isChecked,
      };
      saveChildren(child);
    };

    return (
      <View style={styles.childContent}>
        <Checkbox
          status={children.isChecked ? 'checked' : 'unchecked'}
          onPress={checkList}
        />
        <Text
          variant="bodyLarge"
          numberOfLines={1}
          style={[
            children.isChecked && styles.checkedText,
            {color: children.isChecked ? colors.greyColor : colors.text},
          ]}>
          {children.text}
        </Text>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  childContent: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 50,
    marginLeft: 12,
    marginRight: 8,
  },
  btn: {
    margin: 0,
  },
  checkedText: {
    textDecorationLine: 'line-through',
  },
});
