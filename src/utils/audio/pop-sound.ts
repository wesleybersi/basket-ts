import audioPop01 from "../../assets/audio/pop_01.wav";
import audioPop02 from "../../assets/audio/pop_02.wav";
import audioPop03 from "../../assets/audio/pop_03.wav";
import audioPop04 from "../../assets/audio/pop_04.wav";
import audioPop05 from "../../assets/audio/pop_05.wav";
import audioPop06 from "../../assets/audio/pop_06.wav";

const audioPops = [
  audioPop01,
  audioPop02,
  audioPop03,
  audioPop04,
  audioPop05,
  audioPop06,
];

export function playPopSound() {
  const pop = new Audio(
    audioPops[Math.floor(Math.random() * audioPops.length)]
  );
  pop.volume = 0.25;
  pop.play();
}
