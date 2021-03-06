import React, { Component } from 'react';
import logo from '../../assets/logo.svg';
import './App.scss';
import '../quiz-modal/QuizModal.scss';
import PhraseMatcherService from '../../utils/phrase-matcher-service';
import SpeechSynthesiserService from '../../utils/speech-synthesiser-service';
import QuizModal from '../quiz-modal/QuizModal';
import QuizQuestions from "../../dataSource";

class App extends Component {
  constructor(props) {
    super(props);
    this.speakToManoranjan = this.speakToManoranjan.bind(this);
    this.commandToActionConnector = this.commandToActionConnector.bind(this);
    this.speechApi= new SpeechSynthesiserService();
    this.speechListenApi= new PhraseMatcherService();
    this.helloVocalText = 'Click and Say "Hello React Master"';
    this.welcomeText = 'React Master welcomes you to the React Quiz game!!';
    this.quizLabel = 'Hello Dear; You can now test your React knowledge here. To start the quiz, just click on mic & say: "Start Quiz React Master"';
    this.voiceSettingsComplete = this.speechApi.populateVoiceSettings();
    this.voiceSettingsComplete
    .then(
      (val) => {console.log(val);
        this.speechApi.speakText(this.welcomeText)(this);
        this.speechApi.speakText("To start, " + this.helloVocalText)(this);
      })
      .catch(
        (val) => {console.log(val);
          this.speechApi.speakText(this.welcomeText)(this);
          this.speechApi.speakText("To start, " + this.helloVocalText)(this);
        });
   }
  speakToManoranjan(event) {
    // this.speechApi.stopSpeaking();
    let target = event.target || event.srcElement || event.currentTarget;
    target.classList.add("in-use");
    console.log(this);
    this.speechListenApi.listenRealTimeSpeech(event, this, false, this.commandToActionConnector);
  }
  commandToActionConnector(targetElement, callerReference, voiceResponseObj) {
    console.log('commandToActionConnector called..');console.log(voiceResponseObj);
    targetElement.classList.remove("in-use");
    if(voiceResponseObj.hasOwnProperty("speechResult")) {
      console.log(voiceResponseObj["speechResult"]);
      // console.log("Initial inputSpeech:"+callerReference.inputSpeech);
      // targetElement.parentElement.parentElement.nextElementSibling.firstElementChild.firstElementChild.textContent = 'I heard "' + voiceResponseObj["speechResult"] + '"';
      // console.log("after assignment inputSpeech:"+callerReference.inputSpeech);
      
      switch(voiceResponseObj["speechResult"].toUpperCase()) {
        case "HELLO REACT MASTER":
          callerReference.speechApi.speakText(callerReference.quizLabel)(callerReference);
          // callerReference.manoranjanSays(callerReference.searchLabel);
          break;
        case "START QUIZ REACT MASTER":
          // callerReference.openSearchDialog();
          // callerReference.modalService.open(SearchcriteriaComponent, {centered: true, backdropClass: 'light-blue-backdrop'});
          // targetElement.previousElementSibling.click();
          document.querySelector(".quiz-modal").querySelector("button#start-quiz").click();
          break;
        default:
          callerReference.speechApi.speakText(callerReference.speechApi.invalidCommandMsg)(callerReference);
          // callerReference.manoranjanSays(callerReference.speechApi.invalidCommandMsg);
          break;
      // callerReference.form.get('email').setValue("example@example.com");
      // targetElement.value = callerReference.artistname;
      }
    }
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {/* <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a> */}
            <div className="col-sm align-content">            
                {/* <button className="btn btn-primary btn-lg hide" title="{searchLabel}" onClick="openSearchDialog()">Search Artist</button> */}
                <i className="fa fa-microphone" title={this.speechApi.micLabel} onClick={this.speakToManoranjan}></i>
                <div className="heading-text">{this.helloVocalText}
                  <i className="fa fa-info-circle" title="Info" onClick={this.speechApi.speakText(this.helloVocalText)}></i>
                </div>
              <QuizModal buttonLabel="Start Quiz React Master" className="quiz-dialog" quizQuestions={QuizQuestions}></QuizModal>
            </div>   
        </header>
      </div>
    );
  }
}

export default App;
