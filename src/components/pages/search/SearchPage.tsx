import React, {useEffect, useState, useRef} from 'react';
import {ScrollView, StyleSheet, View, Keyboard} from 'react-native';
import {Searchbar, Text} from 'react-native-paper';
import {useTheme} from '@/assets/config/colors';
import {useSelector} from 'react-redux';
import {RootState} from '@/framework/store/store';
import {useTranslation} from '@/core/i18n';
import {
  CalendarEventTaskType,
  NotesItems,
  NotesListItem,
} from '@/core/interfaces';
import {extractTextFromHtml} from '@/core/utils';
import {NoteCard} from '../../notes/card/NoteCard';
import {ListCard} from '../../notes/card/ListCard';
import {CalendarEventCard} from '../../calendar/CalendarEventCard';
import {FabSearchButton} from '../../ui/fab';
import {ActiveChip} from '@/components/ui/chips/ActiveChip';

type SearchResult =
  | {type: 'note'; item: NotesItems}
  | {type: 'list'; item: NotesListItem}
  | {type: 'event'; item: CalendarEventTaskType};

type FilterType = 'note' | 'list' | 'event';

export function SearchPage() {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [activeFilters, setActiveFilters] = useState<FilterType[]>([]);
  const [visibleTypes, setVisibleTypes] = useState<Set<FilterType>>(new Set());
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchbarRef = useRef<any>(null);

  const notes = useSelector((state: RootState) => state.notes.notes);
  const lists = useSelector((state: RootState) => state.list.list);
  const events = useSelector((state: RootState) => state.calendarEvents.events);

  const toggleFilter = (filter: FilterType) => {
    setActiveFilters(prev =>
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter],
    );
  };

  const focusSearchInput = () => {
    if (searchbarRef.current?.isFocused()) {
      searchbarRef.current?.blur();
    }
    searchbarRef.current?.focus();
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
  };

  const handleSearchBlur = () => {
    setIsSearchFocused(false);
  };

  const handleKeyboardHide = () => {
    setIsSearchFocused(false);
  };

  // Обработка закрытия клавиатуры
  useEffect(() => {
    const keyboardWillHideListener = Keyboard.addListener(
      'keyboardWillHide',
      handleKeyboardHide,
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      handleKeyboardHide,
    );

    return () => {
      keyboardWillHideListener?.remove();
      keyboardDidHideListener?.remove();
    };
  }, []);

  useEffect(() => {
    if (!searchQuery) {
      setSearchResults([]);
      setVisibleTypes(new Set());
      return;
    }

    const lowerCaseQuery = searchQuery.toLowerCase();

    const filteredNotes = notes
      .filter(note => {
        const titleMatch = note.title.toLowerCase().includes(lowerCaseQuery);
        const labelText = extractTextFromHtml(note.label);
        const contentMatch = labelText.toLowerCase().includes(lowerCaseQuery);
        return titleMatch || contentMatch;
      })
      .map(note => ({item: note, type: 'note' as const}));

    const filteredLists = lists
      .filter(
        list =>
          list.title.toLowerCase().includes(lowerCaseQuery) ||
          list.items.some(
            item =>
              item.text.toLowerCase().includes(lowerCaseQuery) ||
              item.children.some(child =>
                child.text.toLowerCase().includes(lowerCaseQuery),
              ),
          ),
      )
      .map(list => ({item: list, type: 'list' as const}));

    const filteredEvents = events
      .filter(
        event =>
          event.title.toLowerCase().includes(lowerCaseQuery) ||
          event.info.toLowerCase().includes(lowerCaseQuery),
      )
      .map(event => ({item: event, type: 'event' as const}));

    const allResults = [...filteredNotes, ...filteredLists, ...filteredEvents];
    setVisibleTypes(new Set(allResults.map(r => r.type)));

    const sortedResults = allResults.sort((a, b) => {
      const dateA = new Date(a.item.updated || a.item.created).getTime();
      const dateB = new Date(b.item.updated || b.item.created).getTime();
      return dateB - dateA;
    });

    const filteredAndSortedResults =
      activeFilters.length > 0
        ? sortedResults.filter(result => activeFilters.includes(result.type))
        : sortedResults;

    setSearchResults(filteredAndSortedResults);
  }, [searchQuery, notes, lists, events, activeFilters]);

  return (
    <>
      <View style={[styles.page, {backgroundColor: colors.background}]}>
        <Searchbar
          ref={searchbarRef}
          style={styles.searchbar}
          placeholder={t('common.search')}
          onChangeText={setSearchQuery}
          value={searchQuery}
          onFocus={handleSearchFocus}
          onBlur={handleSearchBlur}
        />
        {visibleTypes.size > 1 && (
          <View style={styles.filterContainer}>
            <ActiveChip
              icon="note"
              label={t('filters.notes')}
              active={activeFilters.includes('note')}
              onPress={() => toggleFilter('note')}
            />
            <ActiveChip
              icon="clipboard-list"
              label={t('filters.lists')}
              active={activeFilters.includes('list')}
              onPress={() => toggleFilter('list')}
            />
            <ActiveChip
              icon="calendar"
              label={t('calendar.title')}
              active={activeFilters.includes('event')}
              onPress={() => toggleFilter('event')}
            />
          </View>
        )}
        <ScrollView style={styles.container}>
          {searchResults.map(result => {
            if (result.type === 'note') {
              return (
                <NoteCard
                  key={result.item.id}
                  item={result.item}
                  searchQuery={searchQuery}
                />
              );
            }
            if (result.type === 'list') {
              return (
                <ListCard
                  key={result.item.id}
                  list={result.item}
                  searchQuery={searchQuery}
                />
              );
            }
            if (result.type === 'event') {
              return (
                <CalendarEventCard
                  key={result.item.id}
                  item={result.item}
                  searchQuery={searchQuery}
                />
              );
            }
            return null;
          })}
          {searchQuery.length > 0 && searchResults.length === 0 ? (
            <View style={styles.noResults}>
              <Text>{t('common.emptyList')}</Text>
            </View>
          ) : null}
        </ScrollView>
      </View>

      <FabSearchButton
        onPress={focusSearchInput}
        isVisible={!isSearchFocused}
      />
    </>
  );
}

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flex: 1,
  },
  header: {
    height: 50,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  chip: {
    marginHorizontal: 4,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  container: {
    paddingTop: 4,
    paddingLeft: 4,
    paddingRight: 4,
    flex: 1,
    marginBottom: 10,
  },
  list: {
    flex: 1,
    marginTop: 4,
    marginBottom: 4,
  },
  noResults: {
    alignItems: 'center',
    marginTop: 20,
  },
  searchbar: {
    margin: 4,
    marginTop: 8,
  },
  activeChip: {
    borderWidth: 1,
  },
});
