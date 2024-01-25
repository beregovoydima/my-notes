/* eslint-disable react-native/no-inline-styles */
import {useTheme} from '@/assets/config/colors';
import {EditableText} from '@/components/ui/list/EditableText';
import {NotesListItemChildrenItem} from '@/core/interfaces';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Checkbox, IconButton} from 'react-native-paper';

interface Props {
  children: NotesListItemChildrenItem;
}

export const ListCardItemCildrenItem = ({children}: Props) => {
  const {colors} = useTheme();

  return (
    <View style={styles.childContent}>
      <Checkbox status={children.isChecked ? 'checked' : 'unchecked'} />
      <EditableText
        style={{fontSize: 16}}
        label={children.text}
        isChecked={children.isChecked}
        saveText={() => {}}
        // saveText={(val, id) => saveTitle(val, id)}
      />
      <View style={styles.buttons}>
        <IconButton
          icon="delete"
          iconColor={colors.greyColor}
          size={22}
          style={styles.btn}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  childContent: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    marginLeft: 12,
    marginRight: 8,
  },
  textContainer: {
    marginLeft: 8,
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    margin: 0,
  },
});
