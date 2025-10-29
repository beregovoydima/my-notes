import {useTheme} from '@/assets/config/colors';
import {getUuid} from '@/core/utils';
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import DragList, {DragListRenderItemInfo} from 'react-native-draglist';
import {Modal, Portal, Text} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useTranslation} from '@/core/i18n';
import {appService} from '@/core/services';
import {useSelector} from 'react-redux';

interface Props {
  visible: boolean;
  hideModal: () => void;
  changeColor: (color: string) => void;
}

const keyExtractor = (el: {color: string; id: string}) => el?.id;

export const ColorPicker = ({visible, hideModal, changeColor}: Props) => {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const storeColors = useSelector(() => appService.getStoreColors());

  const [data, setData] = useState<{color: string; id: string}[]>(
    storeColors.map(el => ({color: el, id: getUuid()})),
  );

  useEffect(() => {
    setData(storeColors.map(el => ({color: el, id: getUuid()})));
  }, [storeColors]);

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

    // Сохраняем новый порядок цветов
    const newColorOrder = copy.map(item => item.color);
    appService.setStoreColors(newColorOrder);
    await appService.setStorageColors(newColorOrder);
  }

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={[
          styles.containerStyle,
          {backgroundColor: colors.dialogBackgroundColor},
        ]}>
        <Text
          variant="titleLarge"
          // eslint-disable-next-line react-native/no-inline-styles
          style={{marginBottom: 10}}>
          {t('sorting.colorSortOrder')}
        </Text>
        <DragList
          data={data}
          keyExtractor={keyExtractor}
          onReordered={onReordered}
          renderItem={renderItem}
        />
        <Text
          variant="labelMedium"
          // eslint-disable-next-line react-native/no-inline-styles
          style={[{color: colors.greyColor, marginTop: 10}]}>
          {t('sorting.colorOrderInfo')}
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
