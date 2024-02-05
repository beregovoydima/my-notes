import {FontWeightSize, FontWeightType} from './styles';

export type NotesPageType = 'notes' | 'folders' | 'list';

export type NoteType = 'note' | 'list';

export type NotesSortType = 'created' | 'updated' | 'color' | 'title';
export interface NotesItems {
  id: string;
  created: Date | string;
  updated: Date | string | null;
  type: NoteType; // 'note, list'
  color: string | null; // need types
  folder: string | null;
  title: string; //string
  label: string;
  deleted?: NotesItemsDeleted;
  files: [];
  fontWeight: FontWeightType; // font weight
  fontSize: FontWeightSize; //font Size
}

export interface NotesItemsDeleted {
  deletedTime: string | Date;
}

export interface NotesFolderItem {
  id: string;
  name: string;
  label: string;
  isDeletable: boolean;
  created: Date | string;
  updated: Date | string | null;
}

export interface NotesListItem {
  id: string;
  type: NoteType;
  title: string;
  color: string | null; // need types
  folder: string | null;
  created: Date | string;
  updated: Date | string | null;
  items: NotesListItemChildren[];
}

export interface NotesListItemChildren {
  id: string;
  text: string;
  isChecked: boolean;
  children: NotesListItemChildrenItem[];
}

export interface NotesListItemChildrenItem {
  id: string;
  text: string;
  isChecked: boolean;
}
