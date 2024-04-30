import { Setter } from "solid-js"

type SettingsProps = {
  sessionNumber: number,
  setSessionNumber: Setter<number>,
  increaseSessionNumber: () => void,
  decreaseSessionNumber: () => void,
}

export function Settings(props: SettingsProps) {
  return <div>
    <h1>Settings</h1>
    <p>Run Session: {props.sessionNumber}/27</p>
    <button class="p-4 border" onClick={() => props.setSessionNumber(0)}>min</button>
    <button class="p-4 border" onClick={props.decreaseSessionNumber}>-</button>
    <button class="p-4 border" onClick={props.increaseSessionNumber}>+</button>
    <button class="p-4 border" onClick={() => props.setSessionNumber(27)}>max</button>
  </div>
};
