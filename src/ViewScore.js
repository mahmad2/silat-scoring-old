import React, { Component } from 'react';
import { StyleSheet, View, AsyncStorage, Alert } from 'react-native';
import { Container, Header, Content, Text, Footer, FooterTab, Button, Icon } from 'native-base';
import { Font, AppLoading } from 'expo';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
var dt = new Date();
var utcDate = dt.toUTCString();

export default class ViewScore extends Component {
  static navigationOptions = {
    title: 'View Score',
  };
  constructor() {
    super();
    this.state = {};
  }
  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("native-base/Fonts/Ionicons.ttf"),
      'OpenSans-ExtraBold': require('../assets/fonts/Open_Sans/OpenSans-ExtraBold.ttf')
    });
    this.setState({ _fontLoaded: true });

    //get Specific Score
    try {
      const value = await AsyncStorage.getItem(this.props.navigation.state.params.thisscore);
      this.setState({ _thisScore: value.split(';#;') })
    } catch (error) {
      alert(error)
    }
  }

  shouldDelete(){
    Alert.alert(
      'Delete These Scores',
      'Do you want to delete these particular scores?',
      [
        {text: 'Yes', onPress: () => this.deleteThis()},
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
      ])
  }

  async deleteThis(){
    try {
      await AsyncStorage.removeItem(this.props.navigation.state.params.thisscore)
      Alert.alert('Scores Deleted')
      this.props.navigation.navigate("Home")
    } catch (error) {
      alert(error)
    // Handle errors here
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    if (!this.state._fontLoaded || !this.state._thisScore) {
      return (<AppLoading />)
    } else {
      return (
        <Container>
          <Content style={{backgroundColor:'black'}}>
            <View style={styles.container}>
              <View style={[styles.twoCards, styles.redBackground]}>
                  <View>
                        <Text style={[styles.openSansFont, styles.headerStyleRed]}>Red Corner</Text>
                        <Text style={[styles.openSansFont, styles.textStyleRed]}>{this.state._thisScore[0]}</Text>
                        <Text style={[styles.openSansFont, styles.headerStyleRed]}>Final Score</Text>
                        <Text style={[styles.openSansFont, styles.textStyleRed]}>{this.state._thisScore[2]}</Text>
                  </View>
                  <View style={styles.scoreView}>
                        <Text style={[styles.openSansFont, styles.headerStyleRed]}>Round One</Text>
                        <Text style={[styles.openSansFont, styles.textStyleRed]}>{this.state._thisScore[4]}</Text>
                        <Text style={[styles.openSansFont, styles.headerStyleRed]}>Round Two</Text>
                        <Text style={[styles.openSansFont, styles.textStyleRed]}>{this.state._thisScore[5]}</Text>
                        <Text style={[styles.openSansFont, styles.headerStyleRed]}>Round Three</Text>
                        <Text style={[styles.openSansFont, styles.textStyleRed]}>{this.state._thisScore[6]}</Text>
                  </View>
              </View>
              <View style={[styles.twoCards, styles.blueBackground]}>
                  <View>
                        <Text style={[styles.openSansFont, styles.headerStyleBlue]}>Blue Corner</Text>
                        <Text style={[styles.openSansFont, styles.textStyleBlue]}>{this.state._thisScore[1]}</Text>
                        <Text style={[styles.openSansFont, styles.headerStyleBlue]}>Final Score</Text>
                        <Text style={[styles.openSansFont, styles.textStyleBlue]}>{this.state._thisScore[3]}</Text>
                  </View>
                  <View style={styles.scoreView}>
                        <Text style={[styles.openSansFont, styles.headerStyleBlue]}>Round One</Text>
                        <Text style={[styles.openSansFont, styles.textStyleBlue]}>{this.state._thisScore[7]}</Text>
                        <Text style={[styles.openSansFont, styles.headerStyleBlue]}>Round Two</Text>
                        <Text style={[styles.openSansFont, styles.textStyleBlue]}>{this.state._thisScore[8]}</Text>
                        <Text style={[styles.openSansFont, styles.headerStyleBlue]}>Round Three</Text>
                        <Text style={[styles.openSansFont, styles.textStyleBlue]}>{this.state._thisScore[9]}</Text>
                  </View>
              </View>
            </View>
            <Button full danger onPress={() => this.shouldDelete()} style={{marginTop:20}}>
                <Text style={[styles.deleteButton]}>DELETE THIS SCORE</Text>
              </Button>
          </Content>
          <Footer>
            <FooterTab>
              <Button vertical onPress={() => navigate("Home")}>
                <Icon name="apps" />
                <Text>Score Match</Text>
              </Button>
              <Button vertical onPress={() => navigate("SaveTabs")}>
                <Icon name="archive" />
                <Text>List</Text>
              </Button>
            </FooterTab>
          </Footer>
        </Container>
      );
    }
  }
}
const sizeFont = responsiveFontSize(2)
const styles = StyleSheet.create({
  openSansFont: {
    fontFamily: 'OpenSans-ExtraBold',
    color: 'white'
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'black'
  },
  twoCards: {
    flex: 1,
    padding: 30,
    alignSelf: 'stretch'
  },
  redBackground: {
    backgroundColor: '#c95c54'
  },
  blueBackground: {
    backgroundColor: '#337bf6'
  },
  scoreView: {
    borderTopWidth: 1,
    borderTopColor: 'white',
    marginTop: 30,
    paddingTop: 30
  },
  headerStyleRed: {
    color: '#5f231a',
    fontSize: sizeFont * .7
  },
  textStyleRed: {
    color: 'white',
    fontSize: sizeFont
  },
  headerStyleBlue: {
    color: '#1d4aa7',
    fontSize: sizeFont * .7
  },
  textStyleBlue: {
    color: 'white',
    fontSize: sizeFont
  },
  deleteButton: {
    color: 'white',
    fontWeight: 'bold'
  }
});
