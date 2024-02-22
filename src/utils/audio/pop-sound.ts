import audioPop01 from "../../assets/audio/pop_01.wav";
import audioPop02 from "../../assets/audio/pop_02.wav";
import audioPop03 from "../../assets/audio/pop_03.wav";
import audioPop04 from "../../assets/audio/pop_04.wav";
import audioPop05 from "../../assets/audio/pop_05.wav";
import audioPop06 from "../../assets/audio/pop_06.wav";

import whoosh from "../../assets/audio/whoosh.mp3";

const audioPops = [
  audioPop01,
  audioPop02,
  audioPop03,
  audioPop04,
  audioPop05,
  audioPop06,
];

export function playPopSound(volume = 0.05) {
  return;
  const randomPop = audioPops[Math.floor(Math.random() * audioPops.length)];

  const audioContext = new AudioContext();
  fetch(randomPop)
    .then((response) => response.arrayBuffer())
    .then((arrayBuffer) => audioContext.decodeAudioData(arrayBuffer))
    .then((audioBuffer) => {
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;

      const gainNode = audioContext.createGain();
      gainNode.gain.value = volume;

      source.connect(gainNode);
      gainNode.connect(audioContext.destination);
      source.start();
    })
    .catch((error) => {
      console.error("Error loading audio file:", error);
    });
}

export function playWhoosh(volume = 0.25) {
  return;
  const audioContext = new AudioContext();

  fetch(whoosh)
    .then((response) => response.arrayBuffer())
    .then((arrayBuffer) => audioContext.decodeAudioData(arrayBuffer))
    .then((audioBuffer) => {
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;

      const gainNode = audioContext.createGain();
      gainNode.gain.value = volume;

      source.connect(gainNode);
      gainNode.connect(audioContext.destination);
      source.start();
    })
    .catch((error) => {
      console.error("Error loading audio file:", error);
    });
}
