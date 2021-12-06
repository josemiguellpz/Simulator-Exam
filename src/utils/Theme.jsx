import { createTheme } from "@mui/material/styles";
import ThemePalette from "../utils/ThemePalette";

const Theme = createTheme({
  palette: ThemePalette,
  /* components: ThemeComponents, */
  breakpoints: {
    values: {
      xs: 0,
      sm: 375,
      md: 768,
      lg: 1280,
    },
  },
});

export default Theme;