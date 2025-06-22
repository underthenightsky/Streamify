import { THEMES } from "../constants";
import useThemeStore from "../store/useThemeStore";

export default function ThemeSelector(){
    const {theme,updateTheme} = useThemeStore();
    
    return (
        <div style={{ height: '300px', overflow: 'auto', border: '1px solid gray' }}>
          <ul>
            {THEMES.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
    )
}