
/**
 * @name oscillator-mixer
 * @author tblank555
 */
 
var time;
let A = 440;

export function dsp(t) {
  
  time = t;
  
  // Create a basic sine oscillator
  let mainVoice = oscillator(A);
  
  // Create an LFO to modulate the pitch with
  let lfoMix = 0.3;
  let lfoVoice = oscillator(A * 8 * 0.5);
  
  // Create a mixer
  let channel1 = mixerChannel(mainVoice, 1 - lfoMix);
  let channel2 = mixerChannel(lfoVoice, lfoMix)
  
  let channels = [channel1, channel2];
  
  return mixer(channels);
}

function oscillator(frequency) {
  return Math.sin(frequency * time);
}

function mixerChannel(signal, level) {
  return signal * level;
}

function mixer(channels) {
  var summedAudio = 0;
  for (var i = 0; i < channels.length; ++i) {
    summedAudio += channels[i];
  }
  return summedAudio;
}