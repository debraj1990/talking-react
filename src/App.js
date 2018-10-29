import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PhraseMatcherService from './utils/phrase-matcher-service';
import SpeechSynthesiserService from './utils/speech-synthesiser-service';

class App extends Component {
  constructor(props) {
    super(props);
    this.speechApi= new SpeechSynthesiserService();
    this.speechListenApi= new PhraseMatcherService();
    this.helloVocalText = 'Click and Say "Hello React Baba"';
    this.welcomeText = 'React Baba welcomes you - Meet the talking React app!!';
    this.voiceSettingsComplete = this.speechApi.populateVoiceSettings();
    this.voiceSettingsComplete
    .then(
      (val) => {console.log(val);
        this.speechApi.speakText(this.welcomeText);
        this.speechApi.speakText("To start, " + this.helloVocalText);
      })
      .catch(
        (val) => {console.log(val);
          this.speechApi.speakText(this.welcomeText);
          this.speechApi.speakText("To start, " + this.helloVocalText);
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
        case "HELLO MANORANJAN":
          callerReference.speechApi.speakText(callerReference.searchLabel);
          // callerReference.manoranjanSays(callerReference.searchLabel);
          break;
        case "SEARCH MANORANJAN":
          // callerReference.openSearchDialog();
          // callerReference.modalService.open(SearchcriteriaComponent, {centered: true, backdropClass: 'light-blue-backdrop'});
          targetElement.previousElementSibling.click();
          break;
        default:
          callerReference.speechApi.speakText(callerReference.speechApi.invalidCommandMsg);
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
                  {/* <i className="fa fa-info-circle" title="Info" onClick={this.speechApi.speakText(helloVocalText)}></i> */}
                </div>
              
            </div>   
        </header>
      </div>
    );
  }
}

export default App;
