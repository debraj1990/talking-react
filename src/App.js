import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PhraseMatcherService from './utils/phrase-matcher-service';
import SpeechSynthesiserService from './utils/speech-synthesiser-service';

class App extends Component {
  speakToManoranjan(event) {
    // this.speechApi.stopSpeaking();
    let target = event.target || event.srcElement || event.currentTarget;
    target.classList.add("in-use");
    PhraseMatcherService.listenRealTimeSpeech(event, this, false, this.commandToActionConnector);
  }
  render() {
    const helloVocalText = 'Click and Say "Hello React Baba"';
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
                <i className="fa fa-microphone" title={SpeechSynthesiserService.micLabel} onClick={this.speakToManoranjan}></i>
                <div className="heading-text">{helloVocalText}
                  {/* <i className="fa fa-info-circle" title="Info" onClick={SpeechSynthesiserService.speakText(helloVocalText)}></i> */}
                </div>
              
            </div>   
        </header>
      </div>
    );
  }
}

export default App;
