/* eslint-disable react-native/no-inline-styles */
import {useTheme} from '@/assets/config/colors';
import {EditableText} from '@/components/ui/list/EditableText';
import {NotesListItemChildrenItem} from '@/core/interfaces';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Checkbox, IconButton} from 'react-native-paper';

interface Props {
  children: NotesListItemChildrenItem;
  saveChildren: (children: NotesListItemChildrenItem) => void;
  deleteChildren: (children: NotesListItemChildrenItem) => void;
  color?: string;
}

export const ListModalItemCildrenItem = React.memo(
  ({children, saveChildren, deleteChildren, color}: Props) => {
    const {colors} = useTheme();

    const saveTitle = (val: string) => {
      const child: NotesListItemChildrenItem = {
        ...children,
        text: val,
      };
      saveChildren(child);
    };

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
          color={color ? color : colors.primary}
          status={children.isChecked ? 'checked' : 'unchecked'}
          onPress={checkList}
        />
        <EditableText
          style={{color: colors.greyColor, fontSize: 16}}
          label={children.text}
          isChecked={children.isChecked}
          saveText={val => saveTitle(val)}
        />
        <IconButton
          icon="delete"
          iconColor={colors.greyColor}
          size={22}
          style={styles.btn}
          onPress={() => deleteChildren(children)}
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  childContent: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    marginLeft: 12,
    marginRight: 0,
  },
  btn: {
    margin: 0,
  },
});
