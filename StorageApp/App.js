import * as React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import List from './components/List';
import AddNote from './components/AddNote';
import notesIcon from './assets/notes-icon.png';
import addIcon from './assets/add-icon.png';

const Drawer = createDrawerNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen
          options={{
            drawerIcon: () => (
              <Image
                style={{
                  width: 50,
                  height: 50
                }}
                source={notesIcon} />
            )
          }}
          name="Your notes" component={List} />
        <Drawer.Screen
          options={{
            drawerIcon: () => (
              <Image
                style={{
                  width: 50,
                  height: 50
                }}
                source={addIcon} />
            )
          }}
          name="Add a note" component={AddNote} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}