import { createTheme } from "@mui/material/styles";
import ThemePalette from "../utils/ThemePalette";

const Theme = createTheme({
  palette: ThemePalette,
  /* components: ThemeComponents, */
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default Theme;