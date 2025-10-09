import {ParamListBase, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootStackParamList = {
  NoteEdit: {noteId?: null | string};
  ListEdit: {listId?: null | string};
  CalendarEvent: {
    type?: 'meet' | 'task';
    eventId?: null | string;
    selectedDate?: string;
  };
  Notes: undefined;
  Calendar: {selectedDate?: string} | undefined;
  Tasks: undefined;
  Search: undefined;
  More: undefined;
  Settings: undefined;
  Main: {screen?: string; params?: any} | undefined;

  // Другие экраны
};

export type ScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

export type ExtendedScreenNavigationProp = ScreenNavigationProp & {
  getCurrentRoute: () => RouteProp<ParamListBase> | undefined;
};

export type NoteEditScreenRouteProp = RouteProp<RootStackParamList, 'NoteEdit'>;
export type ListEditScreenRouteProp = RouteProp<RootStackParamList, 'ListEdit'>;
export type CalendarEventScreenRouteProp = RouteProp<
  RootStackParamList,
  'CalendarEvent'
>;
