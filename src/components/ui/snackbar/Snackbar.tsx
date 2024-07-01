import React, {createContext, useState, useContext, ReactNode} from 'react';
import {Snackbar} from 'react-native-paper';

interface SnackbarContextType {
  showSnackbar: (msg: string) => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined,
);

interface SnackbarProviderProps {
  children: ReactNode;
}

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({
  children,
}) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  const showSnackbar = (msg: string) => {
    setMessage(msg);
    setVisible(true);
  };

  const hideSnackbar = () => {
    setVisible(false);
  };

  return (
    <SnackbarContext.Provider value={{showSnackbar}}>
      {children}
      <Snackbar
        visible={visible}
        onDismiss={hideSnackbar}
        duration={Snackbar.DURATION_SHORT}>
        {message}
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = (): SnackbarContextType => {
  const context = useContext(SnackbarContext);
  if (context === undefined) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};
