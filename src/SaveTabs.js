import React, { Component } from 'react';
import { Container, Header, Content, Button, Tab, Tabs, TabHeading, Icon, Text } from 'native-base';
import SaveScore from './SaveScore.js';
import ListScores from './ListScores.js';

export default class SaveTabs extends Component {
  static navigationOptions = {
    title: 'Save Match Scores',
    headerStyle: {
            backgroundColor: '#2F95D6',
            paddingTop: 0
          },
    headerTintColor: 'white',
  }
  render() {
    return (
      <Container>
        <Tabs>
          <Tab heading="Save Scores for this Match">
            <SaveScore navigate={this.props.navigation} />
          </Tab>
          <Tab heading="View All Scores">
            <ListScores navigate={this.props.navigation} />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
