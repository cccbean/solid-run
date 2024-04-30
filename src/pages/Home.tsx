import { Setter } from "solid-js";
import { Page } from "../App";

type HomeProps = {
  setPage: Setter<Page>,
  sessionNumber: number,
}

// TODO: make h1 longer
export function Home(props: HomeProps) {
  return <div class="flex flex-col justify-center gap-4 p-4">
    <h1 class="text-4xl font-bold text-center">5k</h1>
    <p>Session: {props.sessionNumber.toString()}/28</p>
    <button class="border-4 border-mauve text-mauve rounded-full py-2 px-4 font-bold active:bg-mauve active:text-crust focus:bg-mauve focus:text-crust active:scale-95 transition-all"
      onClick={() => {
        props.setPage(Page.RunTimer);
      }}
    >
      Start timer
    </button>
  </div>
}
