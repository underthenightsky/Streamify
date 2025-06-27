import { THEMES } from "../constants";
import useThemeStore from "../store/useThemeStore";

export  function ThemeSelector(){
    const {updateTheme} = useThemeStore();
    
    return (
        <div style={{ height: '300px', overflow: 'auto', border: '1px solid gray' }}>
          <ul>
            {THEMES.map((item, index) => (
              <li onClick={(e)=>updateTheme(e.currentTarget.value)}
              key={index}>{item}</li>
            ))}
          </ul>
        </div>
    )
}