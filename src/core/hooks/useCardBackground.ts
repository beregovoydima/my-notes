import {useSelector} from 'react-redux';
import {RootState} from '@/framework/store/store';

export const useCardBackground = () => {
  const showCardBackground = useSelector(
    (state: RootState) => state.settings.showCardBackground,
  );

  return showCardBackground;
};
