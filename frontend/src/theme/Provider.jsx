import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { PropTypes } from "prop-types";

import palette from './palette';
import shadows from './shadows';
import typography from './typography';
import GlobalStyles from './globalStyles';
import customShadows from './customShadows';
import componentsOverride from './overrides';

Provider.propTypes = {
    children: PropTypes.node
}

export default function Provider({ children }) {
    const themeOptions = {
        palette,
        shape: { borderRadius: 6 },
        typography,
        shadows: shadows(),
        customShadows: customShadows(),
    };
    const theme = createTheme(themeOptions);
    theme.components = componentsOverride(theme);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyles />
            {children}
        </ThemeProvider>
    )
}