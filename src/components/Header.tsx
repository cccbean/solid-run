import { Setter } from "solid-js"
import { Page } from "../App"

type HeaderProps = {
  page: Page,
  setPage: Setter<Page>,
};

// TODO: add svg for Settings btn
// TODO: maybe change how the tabs are highlighted
export function Header(props: HeaderProps) {
  return <header class="border-b border-mauve text-mauve flex gap-2 p-2">
    <button class={`px-4 py-2 rounded-lg flex-1 ${props.page === Page.Run && "bg-crust"}`} onClick={() => props.setPage(Page.Run)}>5k</button>
    <button class={`px-4 py-2 rounded-lg flex-1 ${props.page === Page.Sprint && "bg-crust"}`} onClick={() => props.setPage(Page.Sprint)}>Sprint</button>
    <button class={`px-4 py-2 rounded-lg ${props.page === Page.Settings && "bg-crust"}`} onClick={() => props.setPage(Page.Settings)}>Settings</button>
  </header>
};
