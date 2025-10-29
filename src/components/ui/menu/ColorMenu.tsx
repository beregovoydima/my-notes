import React, {memo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Menu} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import {appService} from '@/core/services';
import {useTheme} from '@/assets/config/colors';

interface ColorMenuProps {
  visible: boolean;
  onDismiss: () => void;
  onSelectColor: (color: string) => void;
  anchorComponent: React.ReactNode;
}

export const ColorMenu = memo(
  ({visible, onDismiss, onSelectColor, anchorComponent}: ColorMenuProps) => {
    const storeColors = useSelector(() => appService.getStoreColors());
    const {colors} = useTheme();
    const handleColorSelect = (color: string) => {
      onSelectColor(color);
      onDismiss();
    };

    return (
      <Menu
        visible={visible}
        onDismiss={onDismiss}
        contentStyle={[
          styles.content,
          styles.menuPadding,
          {backgroundColor: colors.menuBackgroundColor},
        ]}
        anchor={anchorComponent}>
        <View style={styles.colorGrid}>
          {storeColors.map((color, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.colorItem, {backgroundColor: color}]}
              onPress={() => handleColorSelect(color)}>
              <MaterialIcons name="check" color="transparent" size={24} />
            </TouchableOpacity>
          ))}
        </View>
      </Menu>
    );
  },
);

const styles = StyleSheet.create({
  content: {
    borderRadius: 8,
    padding: 8,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: 180,
  },
  colorItem: {
    width: 52,
    height: 52,
    margin: 4,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuPadding: {
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
});
