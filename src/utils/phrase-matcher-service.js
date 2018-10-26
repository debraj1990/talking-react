
export default class PhraseMatcherService {
  SpeechRecognition = window["SpeechRecognition"] || window["webkitSpeechRecognition"];
  SpeechGrammarList = window["SpeechGrammarList"] || window["webkitSpeechGrammarList"];
  SpeechRecognitionEvent = window["SpeechRecognitionEvent"] || window["webkitSpeechRecognitionEvent"];

  constructor() { }
  
  listenRealTimeSpeech(event, callerReference, interimFlag, callbackFn) { 
    console.log('started listening..');
    let target = event.target || event.srcElement || event.currentTarget;
    // console.log(target);
    // let $this = $(target);
    // testBtn.textContent = 'Listening...';

    let voiceResponse = {};
    let grammar = '#JSGF V1.0; grammar phrase;';//'#JSGF V1.0; grammar phrase; public <phrase> = ' + phrase +';';
    let recognition = new this.SpeechRecognition();
    let speechRecognitionList = new this.SpeechGrammarList();
    speechRecognitionList.addFromString(grammar, 1);
    recognition.grammars = speechRecognitionList;
    recognition.lang = 'en-US';//'hi-IN';
    recognition.interimResults = interimFlag;
    recognition.maxAlternatives = 1;
  
    recognition.start();
    console.log('speech processing..');      
    recognition.onresult = function(event) {
      // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
      // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
      // It has a getter so it can be accessed like an array
      // The first [0] returns the SpeechRecognitionResult at position 0.
      // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
      // These also have getters so they can be accessed like arrays.
      // The second [0] returns the SpeechRecognitionAlternative at position 0.
      // We then return the transcript property of the SpeechRecognitionAlternative object 
      var speechResult = event.results[0][0].transcript;
      console.log('Speech received: ' + speechResult);
      // target.value = speechResult;
      voiceResponse["speechResult"] = speechResult;
      console.log('Confidence: ' + event.results[0][0].confidence);

      callbackFn(target, callerReference, voiceResponse);
    }
  
    recognition.onspeechend = function() {
      recognition.stop();
      // testBtn.disabled = false;
      // testBtn.textContent = 'Start new test';
    }
  
    recognition.onerror = function(event) {
      // testBtn.disabled = false;
      // testBtn.textContent = 'Start new test';
      // diagnosticPara.textContent = 'Error occurred in recognition: ' + event.error;
      voiceResponse["error"] = 'Error occurred in recognition: ' + event.error;
      callbackFn(target, callerReference, voiceResponse);
    }
  // return voiceResponse;
  }
   
}
