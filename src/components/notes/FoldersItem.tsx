import {useTheme} from '@/assets/config/colors';
import {NotesFolderItem} from '@/core/interfaces';
import * as React from 'react';
import {StyleSheet} from 'react-native';
import {Avatar, Card} from 'react-native-paper';
import {FoldersMenu} from '../ui/menu/FoldersMenu';

interface Props {
  folders: NotesFolderItem[];
}

export const FoldersItem = ({folders}: Props) => {
  const {colors} = useTheme();

  const getLeftIcon = (props: any) => {
    return <Avatar.Icon {...props} icon="folder" />;
  };

  const getMoreIcon = () => {
    return <FoldersMenu />;
  };

  return (
    <>
      {folders.map(el => {
        return (
          <Card.Title
            key={el.name}
            title={el.label}
            style={[
              {
                borderColor: colors.greyColor,
                backgroundColor: colors.background,
              },
              styles.item,
            ]}
            left={getLeftIcon}
            right={getMoreIcon}
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
