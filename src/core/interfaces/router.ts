import {ParamListBase, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootStackParamList = {
  NoteEdit: {noteId?: null | string};
  ListEdit: {listId?: null | string};
  Notes: undefined;
  Calendar: undefined;
  Tasks: undefined;
  Search: undefined;
  More: undefined;
  Settings: undefined;

  // Другие экраны
};

export type ScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

export type ExtendedScreenNavigationProp = ScreenNavigationProp & {
  getCurrentRoute: () => RouteProp<ParamListBase> | undefined; // Замените any на фактический тип, который возвращает getCurrentRoute
};

export type NoteEditScreenRouteProp = RouteProp<RootStackParamList, 'NoteEdit'>;
export type ListEditScreenRouteProp = RouteProp<RootStackParamList, 'ListEdit'>;
