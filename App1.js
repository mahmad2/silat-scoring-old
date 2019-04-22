import React from 'react';
import { StyleSheet, View, Dimensions, Platform, StatusBar, Vibration } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import { Font, AppLoading } from 'expo';
import { ConfirmDialog } from 'react-native-simple-dialogs';

const { width, height } = Dimensions.get('window');
const reducer = (accumulator, currentValue) => accumulator + currentValue

var redArrayScore
var blueArrayScore
var redArrayText
var blueArrayText
var roundArrayRed
var roundArrayBlue
var currentRound

const initialState = {
  _fontLoaded: false,
  _totalRed: 0,
  _totalBlue: 0,
  _redArrayScore: [],
  _blueArrayScore: [],
  _redArrayText: [],
  _blueArrayText: []
};

export default class App extends React.Component {

  constructor() {
    super();
    this.initialize()
    this.addRedScoreText = this.addRedScoreText.bind(this);
    this.addBlueScoreText = this.addBlueScoreText.bind(this);
    this.initialize = this.initialize.bind(this);
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("native-base/Fonts/Ionicons.ttf"),
      'OpenSans-ExtraBold': require('./assets/fonts/Open_Sans/OpenSans-ExtraBold.ttf')
    });
    this.setState({ _fontLoaded: true });
  }
  initialize(){
    redArrayScore = []
    blueArrayScore = []
    redArrayText = []
    blueArrayText = []
    roundArrayRed = []
    roundArrayBlue = []
    currentRound = 0
    this.state = initialState;
  }

  newMatch(){
    this.initialize()
    this.setState({
      _redArrayText: redArrayText,
      _redArrayScore: redArrayScore,
      _blueArrayText: blueArrayText,
      _blueArrayScore: blueArrayScore,
      _totalRed: 0,
      _totalBlue: 0
    })
  }
  pushRoundArray(textScoreArray){
    roundArrayRed[currentRound] = textScoreArray;
    this.setState({ _redArrayText: roundArrayRed });
  }

  advanceRound(){
    if(currentRound===2){
      alert("ONLY THREE ROUNDS in SILAT")
    }else{
      currentRound++
      alert("ROUND "+ (currentRound+1))
      redArrayText = []
    }
  }

  addRedScoreText(score){
    redArrayText.push(score)
    this.pushRoundArray(redArrayText);
    this.setState({ _redArrayText: redArrayText })
    redArrayScore.push(score)
    this.setState({ _redArrayScore: redArrayScore })
    let reducedTotal = redArrayScore.reduce(reducer)
    this.setState({ _totalRed: reducedTotal });
    if(score===-10){
      alert("Match is over winner is BLUE CORNER")
    }
  }

  addBlueScoreText(score){
    blueArrayText.push(score);
    this.setState({ _blueArrayText:blueArrayText });
    blueArrayScore.push(score);
    this.setState({ _blueArrayScore: blueArrayScore });
    let reducedTotal = blueArrayScore.reduce(reducer)
    this.setState({ _totalBlue: reducedTotal });
    if(score===-10){
      alert("Match is over winner is RED CORNER")
    }
  }

  addRedScoreTextPlus(score){
    redArrayText.push("1+"+(score-1))
    this.setState({ _redArrayText: redArrayText })
    redArrayScore.push(score)
    this.setState({ _redArrayScore: redArrayScore })
    let reducedTotal = redArrayScore.reduce(reducer)
    this.setState({ _totalRed: reducedTotal });
  }

  addBlueScoreTextPlus(score){
    blueArrayText.push("1+"+(score-1))
    this.setState({ _blueArrayText: blueArrayText })
    blueArrayScore.push(score)
    this.setState({ _blueArrayScore: blueArrayScore })
    let reducedTotal = blueArrayScore.reduce(reducer)
    this.setState({ _totalBlue: reducedTotal });
  }

  deleteRed(){
    redArrayScore.pop()
    this.setState({ _redArrayScore: redArrayScore })
    redArrayText.pop()
    this.setState({ _redArrayText: redArrayText })
    if(redArrayScore.length > 0){
      let reducedTotal = redArrayScore.reduce(reducer)
      this.setState({ _totalRed:reducedTotal })
    } else {
      this.setState({ _totalRed: 0 })
    }
  }

  deleteBlue(){
    blueArrayScore.pop()
    this.setState({ _blueArrayScore: blueArrayScore })
    blueArrayText.pop()
    this.setState({ _blueArrayText: blueArrayText })
    if(blueArrayScore.length > 0){
      let reducedTotal = blueArrayScore.reduce(reducer)
      this.setState({ _totalBlue:reducedTotal })
    } else {
      this.setState({ _totalBlue: 0 })
    }
  }

  openConfirm(show) {
      this.setState({ showConfirm: show })
  }

  optionYes() {
      this.openConfirm(false);
      this.newMatch()
  }

  optionNo() {
      this.openConfirm(false);
  }

  render() {

    if (!this.state._fontLoaded) {
      return (<AppLoading />)
    } else {
        return (
          <Container style={styles.container}>
          <View style={styles.oneSide}>
              <Text style={[styles.scoreBoard, styles.redScoreBoard]}>{this.state._redArrayText.join('  ')}</Text>
              <Text style={[styles.scoreBoard, styles.redScoreBoard]}>{this.state._redArrayText.join('  ')}</Text>
              <Text style={[styles.scoreBoard, styles.redScoreBoard]}>{this.state._redArrayText.join('  ')}</Text>
              <View style={styles.buttonRow}>
                <Button style={styles.button} danger onPress={() => this.addRedScoreText(1)}><Text style={styles.buttonText}>1</Text></Button>
                <Button style={styles.button} danger onPress={() => this.addRedScoreText(2)}><Text style={styles.buttonText}>2</Text></Button>
                <Button style={styles.button} danger onPress={() => this.addRedScoreText(3)}><Text style={styles.buttonText}>3</Text></Button>
              </View>
              <View style={styles.buttonRow}>
                <Button style={styles.button} danger onPress={() => this.addRedScoreTextPlus(2)}><Text style={styles.buttonText}>1+1</Text></Button>
                <Button style={styles.button} danger onPress={() => this.addRedScoreTextPlus(3)}><Text style={styles.buttonText}>1+2</Text></Button>
                <Button style={styles.button} danger onPress={() => this.addRedScoreTextPlus(4)}><Text style={styles.buttonText}>1+3</Text></Button>
                <Button style={styles.button} danger onPress={() => this.deleteRed()}><Text style={styles.buttonText}>DEL</Text></Button>
              </View>
              <View style={styles.buttonRow}>
                <Button style={styles.button} danger onPress={() => this.addRedScoreText(-1)}><Text style={styles.buttonText}>-1</Text></Button>
                <Button style={styles.button} danger onPress={() => this.addRedScoreText(-2)}><Text style={styles.buttonText}>-2</Text></Button>
                <Button style={styles.button} danger onPress={() => this.addRedScoreText(-5)}><Text style={styles.buttonText}>-5</Text></Button>
                <Button style={styles.button} danger onPress={() => this.addRedScoreText(-10)}><Text style={styles.buttonText}>-10</Text></Button>
              </View>
              <Text style={styles.totalScore}>{this.state._totalRed}</Text>
          </View>
          <View style={styles.middleSide}>
            <Button iconRight light style={styles.button} onPress={() => this.advanceRound()}><Text>NEXT</Text><Icon name='arrow-forward' /></Button>
            <Button onPress={() => this.openConfirm(true)}><Text>NEW MATCH</Text></Button>
          </View>
          <View style={styles.oneSide}>
          <Text style={[styles.scoreBoard, styles.blueScoreBoard]}>{this.state._blueArrayText.join('  ')}</Text>
          <Text style={[styles.scoreBoard, styles.blueScoreBoard]}>{this.state._blueArrayText.join('  ')}</Text>
          <Text style={[styles.scoreBoard, styles.blueScoreBoard]}>{this.state._blueArrayText.join('  ')}</Text>
            <View style={styles.buttonRow}>
              <Button style={styles.button} onPress={() => this.addBlueScoreText(1)}><Text style={styles.buttonText}>1</Text></Button>
              <Button style={styles.button} onPress={() => this.addBlueScoreText(2)}><Text style={styles.buttonText}>2</Text></Button>
              <Button style={styles.button} onPress={() => this.addBlueScoreText(3)}><Text style={styles.buttonText}>3</Text></Button>
            </View>
            <View style={styles.buttonRow}>
              <Button style={styles.button} onPress={() => this.addBlueScoreTextPlus(2)}><Text style={styles.buttonText}>1+1</Text></Button>
              <Button style={styles.button} onPress={() => this.addBlueScoreTextPlus(3)}><Text style={styles.buttonText}>1+2</Text></Button>
              <Button style={styles.button} onPress={() => this.addBlueScoreTextPlus(4)}><Text style={styles.buttonText}>1+3</Text></Button>
              <Button style={styles.button} onPress={() => this.deleteBlue()}><Text style={styles.buttonText}>DEL</Text></Button>
            </View>
            <View style={styles.buttonRow}>
              <Button style={styles.button} onPress={() => this.addBlueScoreText(-1)}><Text style={styles.buttonText}>-1</Text></Button>
              <Button style={styles.button} onPress={() => this.addBlueScoreText(-2)}><Text style={styles.buttonText}>-2</Text></Button>
              <Button style={styles.button} onPress={() => this.addBlueScoreText(-5)}><Text style={styles.buttonText}>-5</Text></Button>
              <Button style={styles.button} onPress={() => this.addBlueScoreText(-10)}><Text style={styles.buttonText}>-10</Text></Button>
            </View>
            <Text style={styles.totalScore}>{this.state._totalBlue}</Text>
          </View>
          <ConfirmDialog
            title="New Match"
            message="Are you sure you want to start a new match?"
            visible={this.state.showConfirm}
            onTouchOutside={() => this.openConfirm(false)}
            positiveButton={{
                title: "YES",
                titleStyle: {
                  fontFamily: 'OpenSans-ExtraBold',
                },
                onPress: () => this.optionYes()
            }}
            negativeButton={{
                title: "NO",
                titleStyle: {
                  fontFamily: 'OpenSans-ExtraBold',
                },
                onPress: () => this.optionNo()
            }}
            />
          </Container>
        );
      }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#000',
    marginTop: 25
  },
  whiteText: {
    color: '#fff'
  },
  totalScore: {
    borderRadius: 8,
    borderWidth: 5,
    borderColor: '#10bb00',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 60,
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  button: {
    margin: 3,
  },
  buttonText: {
    width: 60,
    fontWeight: 'bold',
    fontSize: 13,
    fontFamily: 'OpenSans-ExtraBold',
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  bluebutton: {
    margin: 3,
  },
  bluebuttonText: {
    width: 70,
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: 'OpenSans-ExtraBold',
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  oneSide: {
    flex: 3,
    padding:10
  },
  middleSide: {
    flex: 1,
    backgroundColor: '#2d2d2d',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  buttonRow: {
    flexDirection: 'row'
  },
  scoreBoard: {
    backgroundColor: 'white',
    fontWeight: 'bold',
    fontSize: 23,
    fontFamily: 'OpenSans-ExtraBold',
    textAlign: 'center',
    textAlignVertical: 'center',
    margin: 3,
    minHeight: 35
  },
  redScoreBoard: {
    color: 'red'
  },
  blueScoreBoard: {
    color: '#337bf6'
  }
});
