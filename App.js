import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import { StackNavigator } from 'react-navigation';
import SaveScore from "./src/SaveScore.js";
import testHome from "./testHome.js"
import GamePage from "./src/GamePage.js"
import SaveTabs from "./src/SaveTabs.js"
import ListScores from "./src/ListScores.js"
import ViewScore from "./src/ViewScore.js"

const StackNav = StackNavigator(
  {
    Home: { screen: GamePage },
    SaveScore: { screen: SaveScore },
    SaveTabs: { screen: SaveTabs },
    ListScores: { screen: ListScores},
    ViewScore: {screen: ViewScore}
  },{
    cardStyle: {
      paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
    }
  });

export default StackNav
