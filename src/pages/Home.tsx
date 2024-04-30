import { Setter } from "solid-js";
import { Page } from "../App";
import { runningProgram } from "../lib/program";

type HomeProps = {
  setPage: Setter<Page>,
  sessionNumber: number,
}

// TODO: make h1 longer
export function Home(props: HomeProps) {
  const durationInSeconds = () => {
    const currentSession = runningProgram[props.sessionNumber]
    return currentSession.reduce((accum, currentValue) => accum + currentValue[1], 0)
  };

  return <div class="flex flex-col justify-center gap-4 p-4">
    <h1 class="text-4xl font-bold text-center">5k</h1>
    <p>Session: {props.sessionNumber.toString()}/27</p>
    <p>Duration: {Math.floor(durationInSeconds() / 60)} minutes</p>
    <button class="border-4 border-mauve text-mauve rounded-full py-2 px-4 font-bold active:bg-mauve active:text-crust focus:bg-mauve focus:text-crust active:scale-95 transition-all"
      onClick={() => {
        props.setPage(Page.RunTimer);
      }}
    >
      Start timer
    </button>
  </div>
}
