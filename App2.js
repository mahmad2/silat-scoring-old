import React from 'react';
import { StyleSheet, View, Dimensions, Platform, Image, Alert } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import { Font, AppLoading } from 'expo';
import { ConfirmDialog } from 'react-native-simple-dialogs';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const { width, height } = Dimensions.get('window');
const reducer = (accumulator, currentValue) => accumulator + currentValue

var redArrayScore
var blueArrayScore
var redArrayText
var blueArrayText
var roundArrayRed
var roundArrayBlue
var currentRound
var minusOnePressedRed = false
var minusTwoPressedRed = false
var minusFivePressedRed = false
var minusTenPressedRed = false
var minusOnePressedBlue = false
var minusTwoPressedBlue = false
var minusFivePressedBlue = false
var minusTenPressedBlue = false

const initialState = {
  _fontLoaded: false,
  _totalRed: 0,
  _totalBlue: 0,
  _redArrayScore: [],
  _blueArrayScore: [],
  _redArrayText: [],
  _blueArrayText: [],
  _round1_redText: '',
  _round2_redText: '',
  _round3_redText: '',
  _round1_blueText: '',
  _round2_blueText: '',
  _round3_blueText: ''
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
    var minusOnePressedRed = false
    var minusTwoPressedRed = false
    var minusFivePressedRed = false
    var minusTenPressedRed = false
    var minusOnePressedBlue = false
    var minusTwoPressedBlue = false
    var minusFivePressedBlue = false
    var minusTenPressedBlue = false
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
      _totalBlue: 0,
      _round1_redText: '',
      _round2_redText: '',
      _round3_redText: '',
      _round1_blueText: '',
      _round2_blueText: '',
      _round3_blueText: ''
    })
  }
  pushRoundArray(textScoreArray){
    roundArrayRed[currentRound] = textScoreArray;
    switch(currentRound) {
        case 0:
          this.setState({ _round1_redText: roundArrayRed[currentRound].join(' ') });
        case 1:
          this.setState({ _round2_redText: roundArrayRed[currentRound].join(' ') });
        case 2:
          this.setState({ _round3_redText: roundArrayRed[currentRound].join(' ') });
    }
  }

  advanceRound(){
    if(currentRound===2){
      Alert.alert("Alert Title", "There are only THREE (3) rounds in Pencak Silat.")
    }else{
      currentRound++
      Alert.alert("Alert Title", "ROUND "+ (currentRound+1))
      redArrayText = []
      blueArrayText = []
      minusOnePressedRed = false
      minusTwoPressedRed = false
      minusOnePressedBlue = false
      minusTwoPressedBlue = false
    }
  }

  addRedScoreText(score){
    //Calculate Text
    if((score===-1 && minusOnePressedRed) || (score===-2 && minusTwoPressedRed) || (score===-5 && minusFivePressedRed) || (score===-10 && minusTenPressedRed)){
      switch(score) {
          case -1:
            alert("Minus one (-1) can only be pressed once per round")
            break
          case -2:
            alert("Minus one (-2) can only be pressed once per round")
            break
          case -5:
            alert("Minus one (-5) can only be pressed once for the entire match")
            break
          case -10:
            alert("Athlete in the RED corner has been disqualified. The winner is BLUE corner")
          break
      }
    } else {
      redArrayText.push(score)
      roundArrayRed[currentRound] = redArrayText
      switch(currentRound) {
          case 0:
            this.setState({ _round1_redText: roundArrayRed[currentRound].join(' ') })
            break
          case 1:
            this.setState({ _round2_redText: roundArrayRed[currentRound].join(' ') })
            break
          case 2:
            this.setState({ _round3_redText: roundArrayRed[currentRound].join(' ') })
            break
      }
      //Calculate Score
      redArrayScore.push(score)
      this.setState({ _redArrayScore: redArrayScore })
      let reducedTotal = redArrayScore.reduce(reducer)
      this.setState({ _totalRed: reducedTotal });

      switch(score) {
          case -1:
            minusOnePressedRed = true;
            break
          case -2:
            minusTwoPressedRed = true;
            break
          case -5:
            minusFivePressedRed = true;
            break
          case -10:
            minusTenPressedRed = true;
            break
      }
    }
  }

  addBlueScoreText(score){
    if((score===-1 && minusOnePressedBlue) || (score===-2 && minusTwoPressedBlue) || (score===-5 && minusFivePressedBlue) || (score===-10 && minusTenPressedBlue)){
      switch(score) {
          case -1:
            alert("Minus one (-1) can only be pressed once per round")
            break
          case -2:
            alert("Minus one (-2) can only be pressed once per round")
            break
          case -5:
            alert("Minus one (-5) can only be pressed once for the entire match")
            break
          case -10:
            alert("Athlete in the BLUE corner has been disqualified. The winner is RED corner")
          break
      }
    } else {
      blueArrayText.push(score)
      roundArrayBlue[currentRound] = blueArrayText
      switch(currentRound) {
          case 0:
            this.setState({ _round1_blueText: roundArrayBlue[currentRound].join(' ') })
            break
          case 1:
            this.setState({ _round2_blueText: roundArrayBlue[currentRound].join(' ') })
            break
          case 2:
            this.setState({ _round3_blueText: roundArrayBlue[currentRound].join(' ') })
            break
      }
      //Calculate Score
      blueArrayScore.push(score)
      this.setState({ _blueArrayScore: blueArrayScore })
      let reducedTotal = blueArrayScore.reduce(reducer)
      this.setState({ _totalBlue: reducedTotal });

      switch(score) {
          case -1:
            minusOnePressedBlue = true;
            break
          case -2:
            minusTwoPressedBlue = true;
            break
          case -5:
            minusFivePressedBlue = true;
            break
          case -10:
            minusTenPressedBlue = true;
            break
      }
    }
  }

  addRedScoreTextPlus(score){
      //Calculate Text
      redArrayText.push("1+"+(score-1))
      roundArrayRed[currentRound] = redArrayText
      switch(currentRound) {
          case 0:
            this.setState({ _round1_redText: roundArrayRed[currentRound].join(' ') })
            break
          case 1:
            this.setState({ _round2_redText: roundArrayRed[currentRound].join(' ') })
            break
          case 2:
            this.setState({ _round3_redText: roundArrayRed[currentRound].join(' ') })
            break
      }
      //Calculate Score
      redArrayScore.push(score)
      this.setState({ _redArrayScore: redArrayScore })
      let reducedTotal = redArrayScore.reduce(reducer)
      this.setState({ _totalRed: reducedTotal });
  }

  addBlueScoreTextPlus(score){
    //Calculate Text
    blueArrayText.push("1+"+(score-1))
    roundArrayBlue[currentRound] = blueArrayText
    switch(currentRound) {
        case 0:
          this.setState({ _round1_blueText: roundArrayBlue[currentRound].join(' ') })
          break
        case 1:
          this.setState({ _round2_blueText: roundArrayBlue[currentRound].join(' ') })
          break
        case 2:
          this.setState({ _round3_blueText: roundArrayBlue[currentRound].join(' ') })
          break
    }
    //Calculate Score
    blueArrayScore.push(score)
    this.setState({ _blueArrayScore: blueArrayScore })
    let reducedTotal = blueArrayScore.reduce(reducer)
    this.setState({ _totalBlue: reducedTotal });
  }

  comment(){
    alert("This 'memo' area will be used for comments (remarks) and also when team makes a protest.")
  }

  deleteRed(){
    if(roundArrayRed[currentRound]){
      if(roundArrayRed[currentRound].length > 0){
        var scoreToBeErasedRed = redArrayScore.pop()
        switch(scoreToBeErasedRed) {
          case -1:
            minusOnePressedRed = false
            break
          case -2:
            minusTwoPressedRed = false
            break
          case -5:
            minusFivePressedRed = false
            break
          case -10:
            minusTenPressedRed = false
          break
        }
        this.setState({ _redArrayScore: redArrayScore })
        redArrayText.pop()
        roundArrayRed[currentRound] = redArrayText;
        switch(currentRound) {
            case 0:
              this.setState({ _round1_redText: roundArrayRed[currentRound].join('  ') })
              break
            case 1:
              this.setState({ _round2_redText: roundArrayRed[currentRound].join('  ') })
              break
            case 2:
              this.setState({ _round3_redText: roundArrayRed[currentRound].join('  ') })
              break
        }
        if(redArrayScore.length > 0){
          let reducedTotal = redArrayScore.reduce(reducer)
          this.setState({ _totalRed:reducedTotal })
        } else {
          this.setState({ _totalRed: 0 })
        }
      }
    }
  }

  deleteBlue(){
    if(roundArrayBlue[currentRound]){
      if(roundArrayBlue[currentRound].length > 0){
        var scoreToBeErasedBlue = blueArrayScore.pop()
        switch(scoreToBeErasedBlue) {
          case -1:
            minusOnePressedBlue = false
            break
          case -2:
            minusTwoPressedBlue = false
            break
          case -5:
            minusFivePressedBlue = false
            break
          case -10:
            minusTenPressedBlue = false
          break
        }
        this.setState({ _blueArrayScore: blueArrayScore })
        blueArrayText.pop()
        roundArrayBlue[currentRound] = blueArrayText;
        switch(currentRound) {
            case 0:
              this.setState({ _round1_blueText: roundArrayBlue[currentRound].join('  ') })
              break
            case 1:
              this.setState({ _round2_blueText: roundArrayBlue[currentRound].join('  ') })
              break
            case 2:
              this.setState({ _round3_blueText: roundArrayBlue[currentRound].join('  ') })
              break
        }
        if(blueArrayScore.length > 0){
          let reducedTotal = blueArrayScore.reduce(reducer)
          this.setState({ _totalBlue:reducedTotal })
        } else {
          this.setState({ _totalBlue: 0 })
        }
      }
    }
  }

  //CONFIRMATION DIALOG
  openConfirm(show) {
      this.setState({ showConfirm: show })
  }

  optionYes() {
      this.openConfirm(false);
      this.newMatch()
  }
//{this.state._redArrayText.join('  ')}
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
              <View style={[styles.allContentRows, styles.RowText]}>
                  <Text style={[styles.scoreBoard, styles.redScoreBoard]}>{this.state._round1_redText}</Text>
                  <Text style={[styles.scoreBoard, styles.redScoreBoard]}>{this.state._round2_redText}</Text>
                  <Text style={[styles.scoreBoard, styles.redScoreBoard]}>{this.state._round3_redText}</Text>
              </View>
              <View style={[styles.allContentRows, styles.RowButtons]}>
                  <View style={styles.buttonRow}>
                    <Button style={styles.button} danger onPress={() => this.addRedScoreText(1)}><Text style={styles.buttonText}>1</Text></Button>
                    <Button style={styles.button} danger onPress={() => this.addRedScoreText(2)}><Text style={styles.buttonText}>2</Text></Button>
                    <Button style={styles.button} danger onPress={() => this.addRedScoreText(3)}><Text style={styles.buttonText}>3</Text></Button>
                    <Button style={styles.button} danger onPress={() => this.comment()}><Text style={styles.buttonText}>*</Text></Button>
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
              </View>
              <View style={[styles.allContentRows, styles.RowTotal]}>
                  <View style={styles.totalRow}><Text style={styles.totalScore}>{this.state._totalRed}</Text></View>
              </View>
            </View>
            <View style={styles.middleSide}>
              <Button style={[styles.middleContents, styles.middleButtons]} full rounded success onPress={() => this.advanceRound()}>
                <Text style={[styles.middleButtonText]}>NEXT ROUND</Text>
              </Button>
              <Button style={[styles.middleContents, styles.middleButtons]} full rounded warning onPress={() => this.openConfirm(true)}>
                <Text style={[styles.middleButtonText]}>NEW MATCH</Text>
              </Button>
              <Text style={[styles.middleContents, styles.middleLogoText]}>Scoring is in accordance with tanding (fighting) rules regulated by the International Pencak Silat Federation (PERSILAT)</Text>
              <Image style={[styles.middleContents, styles.images]} source={require('./assets/images/persilat.png')}  resizeMode="contain"/>
              <Image style={[styles.middleContents, styles.images]} source={require('./assets/images/upsf.png')}  resizeMode="contain"/>
              <Text style={[styles.middleContents, styles.middleLogoText]}>This App was funded by the USA Pencak Silat Federation</Text>
            </View>
            <View style={styles.oneSide}>
              <View style={[styles.allContentRows, styles.RowText]}>
                <Text style={[styles.scoreBoard, styles.blueScoreBoard]}>{this.state._round1_blueText}</Text>
                <Text style={[styles.scoreBoard, styles.blueScoreBoard]}>{this.state._round2_blueText}</Text>
                <Text style={[styles.scoreBoard, styles.blueScoreBoard]}>{this.state._round3_blueText}</Text>
              </View>
              <View style={[styles.allContentRows, styles.RowButtons]}>
                <View style={styles.buttonRow}>
                  <Button style={styles.button} onPress={() => this.addBlueScoreText(1)}><Text style={styles.buttonText}>1</Text></Button>
                  <Button style={styles.button} onPress={() => this.addBlueScoreText(2)}><Text style={styles.buttonText}>2</Text></Button>
                  <Button style={styles.button} onPress={() => this.addBlueScoreText(3)}><Text style={styles.buttonText}>3</Text></Button>
                  <Button style={styles.button} onPress={() => this.comment()}><Text style={styles.buttonText}>*</Text></Button>
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
              </View>
              <View style={[styles.allContentRows, styles.RowTotal]}>
                <View style={styles.totalRow}><Text style={styles.totalScore}>{this.state._totalBlue}</Text></View>
              </View>
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
const sizeFont = responsiveFontSize(2)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#000',
    paddingTop: 25
  },
  button: {
    margin: 3,
    flex: 1,
    justifyContent: 'center',
    height:'100%'
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: sizeFont,
    lineHeight: sizeFont,
    fontFamily: 'OpenSans-ExtraBold',
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0
  },
  bluebutton: {
    margin: 3,
  },
  oneSide: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  middleSide: {
    flex: 1,
    backgroundColor: '#2d2d2d',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: 5,
    justifyContent: 'space-between'
  },
  allContentRows: {
    padding: 5
  },
  RowText: {
    flex: 2
  },
  RowButtons: {
    flex: 2
  },
  RowTotal: {
    flex: 1
  },
  buttonRow: {
    flexDirection: 'row',
    flex: 1,
    paddingBottom: 5
  },
  totalRow: {
    borderRadius: 8,
    borderWidth: 5,
    borderColor: '#10bb00',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalScore: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: sizeFont*3,
  },
  scoreBoard: {
    backgroundColor: 'white',
    fontWeight: 'bold',
    fontSize: sizeFont,
    lineHeight: sizeFont+5,
    fontFamily: 'OpenSans-ExtraBold',
    textAlign: 'center',
    textAlignVertical: 'center',
    margin: 3,
    flex: 1
  },
  redScoreBoard: {
    color: 'red'
  },
  blueScoreBoard: {
    color: '#337bf6'
  },
  middleContents: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'stretch',
    borderColor: 'white',
    marginBottom:10,
  },
  middleButtons: {
    borderRadius: 25,
    flex:3
  },
  middleLogoText: {
    flex: .5,
    fontSize: sizeFont/4,
    color: 'white',
    textAlign: 'center'
  },
  middleButtonText: {
    fontWeight: 'bold',
    fontSize: sizeFont,
    fontFamily: 'OpenSans-ExtraBold',
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 0,
    paddingBottom: 0,
    lineHeight: sizeFont,
    textAlign: 'center',
  },
  images: {
    flex: 2,
    alignSelf: 'center',
  }
});
