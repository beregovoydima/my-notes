import React from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  Button,
  ButtonText,
  Center,
  GluestackUIProvider,
  Text,
  AlertDialogFooter,
  ButtonGroup,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogBackdrop,
  Heading,
  Icon,
  CloseIcon,
  AlertDialogHeader,
} from '@gluestack-ui/themed';
import {config} from '@gluestack-ui/config'; // Optional if you want to use default theme
import {NavBar} from './src/components/navigation/Navbar';

// type HomeScreenProps = NativeStackScreenProps<any, 'Home'>;

// const HomeScreen: React.FC<HomeScreenProps> = props => {
//   console.log(props);

//   return (
//     <SafeAreaView>
//       <Text>qweqweqwe</Text>
//     </SafeAreaView>
//   );
// };

function Example() {
  const [showAlertDialog, setShowAlertDialog] = React.useState(false);
  return (
    <Center h={300}>
      <Button onPress={() => setShowAlertDialog(true)}>
        <ButtonText>Click me</ButtonText>
      </Button>
      <AlertDialog
        isOpen={showAlertDialog}
        onClose={() => {
          setShowAlertDialog(false);
        }}>
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader>
            <Heading size="lg">Deactivate account</Heading>
            <AlertDialogCloseButton>
              <Icon as={CloseIcon} />
            </AlertDialogCloseButton>
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text size="sm">
              Are you sure you want to deactivate your account? Your data will
              be permanently removed and cannot be undone.
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            <ButtonGroup space="lg">
              <Button
                variant="outline"
                action="secondary"
                onPress={() => {
                  setShowAlertDialog(false);
                }}>
                <ButtonText>Cancel</ButtonText>
              </Button>
              <Button
                bg="$error600"
                action="negative"
                onPress={() => {
                  setShowAlertDialog(false);
                }}>
                <ButtonText>Deactivate</ButtonText>
              </Button>
            </ButtonGroup>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Center>
  );
}

function App() {
  return (
    <GluestackUIProvider config={config}>
      <Text>Hello World!</Text>
      <Example />
      <NavBar />
    </GluestackUIProvider>
  );
}

export default App;
