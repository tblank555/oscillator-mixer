
/**
 * @name oscillator-mixer
 * @author tblank555
 */
 
var time;
let A = 440;

export function dsp(t) {
  
  // Make the time constant available globally
  time = t;
  
  // Create two oscillators
  let mainVoice = oscillator(A);
  let secondVoice = oscillator(A * 4);
  
  // Crossfade between the two channels rhythmically
  let channelMix = Math.sin(16 * t);
  
  // Create the two channels
  let channel1 = mixerChannel(mainVoice, channelMix);
  let channel2 = mixerChannel(secondVoice, 1 - channelMix);
  
  // Create the array of channels to have the mixer sum
  let channels = [channel1, channel2];
  
  // Sum the channels
  return mixer(channels);
}

function oscillator(frequency) {
  return Math.sin(frequency * time);
}

function mixerChannel(signal, level) {
  return signal * level;
}

// Takes an array of samples and simply sums them
function mixer(channels) {
  var summedAudio = 0;
  for (var i = 0; i < channels.length; ++i) {
    summedAudio += channels[i];
  }
  return summedAudio;
}