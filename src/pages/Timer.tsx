import { Match, Setter, Switch, createEffect, createSignal, onCleanup } from "solid-js"
import { Page } from "../App"
import walkAudioSrc from "../assets/clave-walk.wav";
import runAudioSrc from "../assets/clave-run.wav";
import { Mode, runningProgram } from "../lib/program";

type TimerProps = {
  setPage: Setter<Page>,
  sessionNumber: number,
  increaseSessionNumber: () => void,
}

export function Timer(props: TimerProps) {
  // audio refs (bang to stop ts error)
  let walkAudioEl!: HTMLAudioElement;
  let runAudioEl!: HTMLAudioElement;
  //

  // runningProgram stuff
  const currentSession = runningProgram[props.sessionNumber];
  const [index, setIndex] = createSignal(0);
  const mode = () => currentSession[index()][0];
  const segment = () => `${index() + 1}/${currentSession.length}`;

  createEffect(() => {
    if (mode() === Mode.Walk) {
      walkAudioEl.play();
    } else if (mode() === Mode.Run) {
      runAudioEl.play();
    }
  });
  //

  // time and derived signals
  const [time, setTime] = createSignal(currentSession[index()][1]);
  const minutes = () => Math.floor(time() / 60);
  const seconds = () => time() - minutes() * 60;
  const timeString = () => `${minutes().toString().padStart(2, "0")}:${seconds().toString().padStart(2, "0")}`;
  const percentageDone = () => 100 - time() * 100 / currentSession[index()][1];
  //

  // interval
  const interval = setInterval(() => {
    if (time() > 0) {
      setTime((prev) => prev - 1);
    }

    if (time() === 0 && index() < currentSession.length - 1) {
      setIndex((prev) => prev + 1);
      setTime(currentSession[index()][1]);
    }

    if (time() === 0 && index() === currentSession.length - 1) {
      props.setPage(Page.Run);
      props.increaseSessionNumber();
    }
  }, 1000);

  onCleanup(() => clearInterval(interval));
  //

  return <div class="h-full text-center grid place-items-center">
    <Switch>
      <Match when={mode() === Mode.Walk}>
        <div class="w-72 h-72 bg-crust rounded-full flex flex-col items-center justify-center gap-2 text-blue" style={`background: radial-gradient(closest-side,#1E1E2E 95%,transparent 96% 100%),conic-gradient(#89B4FA4D ${percentageDone()}%,#89B4FA 0)`}>
          <p>walk</p>
          <h2 class="text-7xl">{timeString()}</h2>
          <p>{segment()}</p>
        </div>

      </Match>

      <Match when={mode() === Mode.Run}>
        <div class="w-72 h-72 bg-crust rounded-full flex flex-col items-center justify-center gap-2 text-red" style={`background: radial-gradient(closest-side,#1E1E2E 95%,transparent 96% 100%),conic-gradient(#F38BA84D ${percentageDone()}%,#F38BA8 0)`}>
          <p>run</p>
          <h2 class="text-7xl">{timeString()}</h2>
          <p>{segment()}</p>
        </div>
      </Match>
    </Switch>

    <audio ref={walkAudioEl} src={walkAudioSrc}></audio>
    <audio ref={runAudioEl} src={runAudioSrc}></audio>
  </div>
}
