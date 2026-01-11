import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const createAppTheme = (mode = 'light') => {
  let theme = createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'dark' ? '#66BB6A' : '#2E7D32', // Lighter green for dark mode
        light: mode === 'dark' ? '#98EE99' : '#60AD5E',
        dark: mode === 'dark' ? '#338A3E' : '#005005',
        contrastText: '#FFF',
      },
      secondary: {
        main: mode === 'dark' ? '#4FC3F7' : '#0288D1', // Lighter blue for dark mode
        light: mode === 'dark' ? '#88D4F7' : '#5EB8FF',
        dark: mode === 'dark' ? '#0277BD' : '#005B9F',
        contrastText: '#FFF',
      },
      background: {
        default: mode === 'dark' ? '#121212' : '#F4F6F8',
        paper: mode === 'dark' ? '#1E1E1E' : '#FFFFFF',
      },
      text: {
        primary: mode === 'dark' ? '#E0E0E0' : '#1A2027',
        secondary: mode === 'dark' ? '#A0A0A0' : '#5F748D',
      },
      success: {
        main: mode === 'dark' ? '#81C784' : '#66BB6A',
      },
      warning: {
        main: mode === 'dark' ? '#FFB74D' : '#FFA726',
      },
      error: {
        main: mode === 'dark' ? '#E57373' : '#EF5350',
      },
      info: {
        main: mode === 'dark' ? '#4FC3F7' : '#29B6F6',
      },
      divider: mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 800,
      },
      h2: {
        fontWeight: 700,
      },
      h3: {
        fontWeight: 700,
      },
      h4: {
        fontWeight: 600,
      },
      h5: {
        fontWeight: 600,
      },
      h6: {
        fontWeight: 600,
      },
      button: {
        fontWeight: 600,
        textTransform: 'none',
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: mode === 'dark' ? '#121212' : '#F4F6F8',
            scrollbarColor: mode === 'dark' ? '#6b6b6b #2b2b2b' : '#6b6b6b #f5f5f5',
            '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
              backgroundColor: mode === 'dark' ? '#2b2b2b' : '#f5f5f5',
            },
            '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
              borderRadius: 8,
              backgroundColor: '#6b6b6b',
              minHeight: 24,
              border: mode === 'dark' ? '3px solid #2b2b2b' : '3px solid #f5f5f5',
            },
            '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus': {
              backgroundColor: '#959595',
            },
            '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active': {
              backgroundColor: '#959595',
            },
            '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
              backgroundColor: '#959595',
            },
            '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
              backgroundColor: mode === 'dark' ? '#2b2b2b' : '#f5f5f5',
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            padding: '8px 16px',
            boxShadow: 'none',
            '&:hover': {
              boxShadow: mode === 'dark' ? '0px 4px 12px rgba(255,255,255,0.1)' : '0px 4px 12px rgba(0,0,0,0.1)',
              transform: 'translateY(-1px)',
            },
            transition: 'all 0.2s ease-in-out',
          },
          contained: {
            '&:hover': {
              boxShadow: mode === 'dark' ? '0px 6px 16px rgba(255,255,255,0.15)' : '0px 6px 16px rgba(0,0,0,0.15)',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: mode === 'dark' ? '0px 4px 20px rgba(0, 0, 0, 0.3)' : '0px 4px 20px rgba(0, 0, 0, 0.05)',
            border: mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.05)',
            transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: mode === 'dark' ? '0px 12px 24px rgba(0, 0, 0, 0.4)' : '0px 12px 24px rgba(0, 0, 0, 0.1)',
            },
          },
        },
      },
      MuiPaper: {
        defaultProps: {
          elevation: 0,
        },
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: mode === 'dark' ? '0px 1px 1px rgba(0,0,0,0.2)' : '0px 1px 1px rgba(0,0,0,0.05)',
          },
        },
      },
      MuiContainer: {
        defaultProps: {
          maxWidth: 'xl',
        },
        styleOverrides: {
          root: {
            paddingTop: 24,
            paddingBottom: 24,
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontWeight: 500,
            borderRadius: 8,
          },
        },
      },
    },
  });

  theme = responsiveFontSizes(theme);
  return theme;
};

export default createAppTheme;

