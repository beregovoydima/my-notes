import {useTheme} from '@/assets/config/colors';
import {getUuid, styleColorArr} from '@/core/utils';
import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import DragList, {DragListRenderItemInfo} from 'react-native-draglist';
import {Modal, Portal, Text} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface Props {
  visible: boolean;
  hideModal: () => void;
  changeColor: (color: string) => void;
}

const keyExtractor = (el: {color: string; id: string}) => el?.id;

export const ColorPicker = ({visible, hideModal, changeColor}: Props) => {
  const {colors} = useTheme();

  const [data, setData] = useState<{color: string; id: string}[]>(
    [...styleColorArr].map(el => ({color: el, id: getUuid()})),
  );

  const renderItem = (
    props: DragListRenderItemInfo<{color: string; id: string}>,
  ) => {
    const {index, onDragStart, onDragEnd, item} = props;

    return (
      <View style={styles.main}>
        <TouchableOpacity
          style={[
            styles.color,
            {
              backgroundColor: item.color,
            },
          ]}
          onPress={() => changeColor(item.color)}>
          <View
            style={[
              {
                backgroundColor: item.color,
              },
            ]}
          />
        </TouchableOpacity>
        <View style={styles.drag}>
          <Text style={styles.text}>{index + 1}</Text>
          <TouchableOpacity onPressIn={onDragStart} onPressOut={onDragEnd}>
            <MaterialIcons
              name="drag-indicator"
              color={colors.greyIconColor}
              size={26}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  async function onReordered(fromIndex: number, toIndex: number) {
    const copy = [...data];
    const removed = copy.splice(fromIndex, 1);

    copy.splice(toIndex, 0, removed[0]); // Now insert at the new pos

    setData(copy);
  }

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={styles.containerStyle}>
        <DragList
          data={data}
          keyExtractor={keyExtractor}
          onReordered={onReordered}
          renderItem={renderItem}
        />
        <Text variant="labelMedium" style={[{color: colors.greyColor}]}>
          Порядок сортировки зависит от номера вибраного цвета
        </Text>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  drag: {
    display: 'flex',
    flexDirection: 'row',
  },
  containerStyle: {
    width: 'auto',
    display: 'flex',
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
  },
  text: {
    color: 'grey',
    textAlignVertical: 'center',
    marginRight: 16,
    fontSize: 18,
  },
  color: {
    margin: 4,
    width: 80,
    maxWidth: 80,
    height: 40,
  },
});
