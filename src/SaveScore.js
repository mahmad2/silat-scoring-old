import React, { Component } from 'react';
import { StyleSheet, Alert, AsyncStorage, View } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Button, Icon, Text } from 'native-base';
var dt = new Date();
var utcDate = dt.toUTCString();

export default class SaveScore extends Component {
  static navigationOptions = {
    title: 'Save Match Scores',
  };
  constructor(props) {
    super(props);
    this.state = {
      _redCorner: '',
      _blueCorner: '',
      _submitted: false
    };
  }

  cb(){
    Alert.alert("Saved Scores.")
  }
  async submitForm(){
    if(this.state._submitted){
      Alert.alert("You already submitted this form")
    } else if(!this.state._redCorner || !this.state._blueCorner){
      Alert.alert("Please fill out names for both athletes")
    } else {
      const delimter = ';#;'
      let gameProps = this.props.navigate.state.params
      let allVars = this.state._redCorner + delimter + this.state._blueCorner + delimter +
                    gameProps.redTotalScore  + delimter + gameProps.blueTotalScore + delimter +
                    gameProps.round1Red + delimter + gameProps.round2Red + delimter + gameProps.round3Red + delimter +
                    gameProps.round1Blue + delimter + gameProps.round2Blue + delimter + gameProps.round3Blue + delimter +
                    utcDate
      try {
        await AsyncStorage.setItem(this.state._redCorner + ' vs. ' + this.state._blueCorner, allVars, this.cb);
      } catch (error) {
        console.log("Error saving data" + error);
      }

      this.setState({_submitted: true})
    }
  }



  render() {
    return (
      <Container>
        <Content>
          <Form>
           <View style={styles.topArea}>
              <Item floatingLabel>
                <Label>Red Corner</Label>
                <Input onChangeText={(value) => this.setState({_redCorner: value})} />
              </Item>
              <Item floatingLabel>
                <Label >Blue Corner</Label>
                <Input onChangeText={(value) => this.setState({_blueCorner: value})} />
              </Item>
            </View>
            <View style={styles.bottomArea}>
              <Button iconLeft onPress={() => this.submitForm()}>
                <Icon name='archive' />
                <Text style={{fontWeight:'bold'}}>SAVE MATCH SCORES</Text>
              </Button>
            </View>
          </Form>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  topArea: {
    padding: 20
  },
  bottomArea: {
    padding: 30
  }
})
