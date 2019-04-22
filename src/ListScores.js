import React, { Component } from 'react';
import { Alert, AsyncStorage, ActivityIndicator, View, StyleSheet } from 'react-native';
import { Button, Container, Header, Content, List, ListItem, Text, Icon } from 'native-base';

export default class ListScores extends Component {
  constructor(props){
    super(props);
    this.state = { isLoading: true}
  }

  componentDidMount(){
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, stores) => {
        stores.map((result, i, store) => {
          // get at each store's key/value so you can work with it
          let key = store[i][0];
          let value = store[i][1];
        });
        this.setState({_allVars: stores, isLoading: false})
      });
    });
  }

  shouldDeleteAll(){
    Alert.alert(
      'Delete All Scores',
      'Do you want to delete all scores?',
      [
        {text: 'Yes', onPress: () => this.deleteAll()},
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
      ])
  }

  deleteAll(){
    let allKeys = this.state._allVars.map((allvar) => {
        return allvar[0]
    })
    AsyncStorage.multiRemove(allKeys, (err) => {
      if(err){
        Alert.alert(err)
      }else{
        this.setState({_allVars: []})
        Alert.alert("All Scores Deleted")
      }
    });
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }
    return (
      <Container>
        <Content>
          <List dataArray={this.state._allVars}
            renderRow={(item) =>
              <ListItem onPress={() => this.props.navigate.navigate("ViewScore", { thisscore: item[0] })}>
                <Text style={styles.name}>{item[0]}</Text><Icon  style={styles.icon} name="arrow-forward" /><Text style={styles.date}>{item[1].split(';#;')[10]}</Text>
              </ListItem>
            }>
          </List>
        </Content>
        <Button full danger onPress={() => this.shouldDeleteAll()}>
            <Text>Delete All Scores</Text>
          </Button>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  name: {
    fontWeight: 'bold',
  },
  date: {
    fontStyle: 'italic',
    color: 'grey'
  },
  icon: {
    marginLeft: 10,
    marginRight: 10
  }
})
