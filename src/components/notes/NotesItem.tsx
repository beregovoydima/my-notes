import {useTheme} from '@/assets/config/colors';
import {NotesItemList} from '@/core/interfaces';
import * as React from 'react';
import {StyleSheet} from 'react-native';
import {Avatar, Card, IconButton} from 'react-native-paper';

interface Props {
  notes: NotesItemList[];
}

export const NotesItem = ({notes}: Props) => {
  const {colors} = useTheme();

  const getLeftIcon = (props: any) => {
    return <Avatar.Icon {...props} icon="folder" />;
  };

  const getRightIcon = (props: any) => {
    return <IconButton {...props} icon="dots-vertical" onPress={() => {}} />;
  };
  return (
    <>
      {notes.map(el => {
        return (
          <Card.Title
            key={el.id}
            title={el.title}
            style={[{borderColor: colors.greyColor}, styles.item]}
            left={getLeftIcon}
            right={getRightIcon}
          />
        );
      })}
    </>
  );
};

const styles = StyleSheet.create({
  item: {
    marginTop: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
});
