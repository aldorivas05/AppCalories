/**
 * @format
 */

import React                              from 'react';
import Routes                             from './src/routes/Routes';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


function App(): React.JSX.Element {

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex:1}}>
        <Routes />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

export default App;