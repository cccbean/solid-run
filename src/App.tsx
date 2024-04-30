import { Match, Switch, createEffect, createSignal } from "solid-js";
import { Home } from "./pages/Home";
import { Timer } from "./pages/Timer";
import { Header } from "./components/Header";
import { Settings } from "./pages/Settings";

// TODO: change Page to an enum
export enum Page {
  Run,
  RunTimer,
  Sprint,
  SprintTimer,
  Settings,
}

export function App() {
  const [page, setPage] = createSignal<Page>(Page.Run);

  // sessionNumber and localStorage
  const localSession = Number(localStorage.getItem("sessionNumber"));
  const initialSession = localSession ? localSession : 0;
  const [sessionNumber, setSessionNumber] = createSignal(initialSession);

  function increaseSessionNumber() {
    if (sessionNumber() < 28) {
      setSessionNumber((prev) => prev + 1);
    }
  };

  function decreaseSessionNumber() {
    if (sessionNumber() > 0) {
      setSessionNumber((prev) => prev - 1);
    }
  };
  //

  createEffect(() => {
    localStorage.setItem("sessionNumber", sessionNumber().toString());
  });

  return (
    <main class="mocha bg-base text-text text-2xl h-screen flex flex-col">
      <Header page={page()} setPage={setPage} />
      <Switch>
        <Match when={page() === Page.Run}>
          <Home setPage={setPage} sessionNumber={sessionNumber()} />
        </Match>

        <Match when={page() === Page.RunTimer}>
          <Timer setPage={setPage} sessionNumber={sessionNumber()} increaseSessionNumber={increaseSessionNumber} />
        </Match>

        <Match when={page() === Page.Sprint}>
          {/* TODO: add Sprint stuff */}
          Sprint page
        </Match>

        <Match when={page() === Page.Settings}>
          <Settings sessionNumber={(sessionNumber())} setSessionNumber={setSessionNumber} increaseSessionNumber={increaseSessionNumber} decreaseSessionNumber={decreaseSessionNumber} />
        </Match>
      </Switch>
    </main>
  )
}

