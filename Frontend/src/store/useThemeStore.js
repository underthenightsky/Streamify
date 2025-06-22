import {create}  from "zustand";

const useThemeStore = create((set)=>({
    theme:"forest",
    updateTheme:(newTheme)=>set({theme:newTheme}),
}))
export default useThemeStore;