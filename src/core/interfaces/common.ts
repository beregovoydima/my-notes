export interface ApiResponse<T> {
  data: T;
  request: {
    status: number;
    statusText: string;
  };
}

export type PagesType =
  | 'Notes'
  | 'Calendar'
  | 'Tasks'
  | 'Search'
  | 'Settings'
  | 'More';

export type SortDirection = 'asc' | 'desc';

export interface HighlightedPart {
  text: string;
  highlight: boolean;
}
