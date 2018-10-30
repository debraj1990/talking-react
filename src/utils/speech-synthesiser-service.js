export default class SpeechSynthesiserService {
  synth = window.speechSynthesis;
  voices = [];
  speechSettings = {};

  micLabel = 'Click & Speak to "React Guru"';
  invalidCommandMsg = 'That didn\'t sound right. Can you please give me a valid instruction?';

  constructor() { }

  populateVoiceSettings() {
    return new Promise((resolve, reject) => {
      // this.voices = this.synth.getVoices();
      this.speechSettings = {lang:"hi-IN", name:"Google हिन्दी", pitch:1, rate:1};
      // this.speechSettings.lang = "hi-IN";
      // this.speechSettings.name = "Google हिन्दी";
      // this.speechSettings.pitch = 1;
      // this.speechSettings.rate = 1;
      const self = this;//console.log(self);
      // wait on voices to be loaded before fetching list
      this.synth.onvoiceschanged = function() {
        // console.log(this);
        // console.log(self);
        self.voices = self.synth.getVoices();
        if (self.voices.length === 0) {
          reject('error'); // pass values
        } else {
          resolve('done'); // pass values
        }
      };
    });
  }

  speakText = (speechText) => (e) => { //speakText(speechText) {
    console.log(speechText);
    let utterThis = new SpeechSynthesisUtterance(speechText);
    // let voiceSettingsComplete = this.populateVoiceSettings();
    // voiceSettingsComplete.then(
    //   (val) => {console.log(val);
        for(let i = 0; i < this.voices.length ; i++) {
          if(this.voices[i].name === this.speechSettings["name"]) {
            utterThis.voice = this.voices[i];
            break;
          }
        }
        utterThis.pitch = this.speechSettings["pitch"];
        utterThis.rate = this.speechSettings["rate"];
        this.synth.speak(utterThis);
    //   }
    // );
  }
  stopSpeaking() {
    this.synth.cancel();
  }
}
