import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    error: React.CSSProperties;
    label: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    error?: React.CSSProperties;
    label?: React.CSSProperties;
  }

  // Extend the theme palette
  interface Theme {
    palette: {
      primary: {
        main: string;
        '100': string;
        contrastText: string;
      };
      secondary: {
        main: string;
        '100': string;
        '400': string;
        contrastText: string;
      };
      error: {
        main: string;
        '100': string;
      };
      warning: {
        main: string;
        '100': string;
      };
      info: {
        main: string;
        '100': string;
      };
    };
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    error: true;
    label: true;
  }
}

// Define gradient colors
const gradientColors = {
  primary: {
    start: '#F18700',
    end: '#F39F33'
  },
  secondary: {
    start: '#999999',
    end: '#B3B3B3'
  },
  error: {
    start: '#9F041B',
    end: '#F5515F'
  },
  warning: {
    start: '#FFA000',
    end: '#FFB74D'
  },
  info: {
    start: '#0288D1',
    end: '#4FC3F7'
  }
};

export const themes = createTheme({
  components: {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: 14,
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          borderRadius: '2px',
          // '&.Mui-disabled': {
          //   color: 'transparent',
          //   background: 'rgba(0, 0, 0, 0.26)',
          //   borderRadius: '2px',
          //   border: 'none',
          // },
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        track: ({ theme }) => ({
          borderRadius: 50,
          backgroundColor: '#9A9A9A',
          '.Mui-checked.Mui-checked + &': {
            // Controls checked color for the track
            opacity: 0.7,
            backgroundColor: theme.palette.primary.main,
          },
        }),
        thumb: {
          color: '#fff',
        },
        root: () => ({
          padding: 6,
          '& .MuiSwitch-thumb': {
            boxShadow: 'none',
            width: 16,
            height: 16,
            margin: 2,
          },
        }),
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          display: 'flex',
          alignItems: 'center',
          padding: '0px 10px !important',
          fontSize: '14px',
          borderRadius: 6,
          background: 'white',
          border: '1px solid #CCCCCC',
        },
      }
    },
    MuiInputBase: {
      styleOverrides: {
        input: ({ ownerState }) => ({
          display: 'flex',
          alignItems: 'center',
          padding: '10px 16px 10px 16px !important',
          fontSize: '14px',
          borderRadius: 6,
          background: 'white',
          '&.Mui-disabled': {
            background: '#D6D6D6',
            borderColor: '#D6D6D6',
          },
          border: '1px solid #CCCCCC',
          ...(ownerState.error && {
            border: '1px solid #D12119',
            background: '#FFDBD9',
          }),
        }),
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: { borderColor: 'transparent' },
        root: {
          borderRadius: 6,
          padding: 0,
          borderColor: 'transparent',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#000',
          cursor: 'pointer',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '6px',
          boxShadow: 'none',
          ':hover': {
            boxShadow: 'none',
          },
          width: "100px",
          '&.Mui-disabled': {
            background: '#EBEBEB',
            border: '1px solid #D9D9D9',
            color: '#999999'
          }
        },
        sizeLarge: () => ({
          height: 44,
          padding: '0 16px 0 16px',
        }),
        sizeMedium: () => ({
          height: 40,
          padding: '0 16px 0 16px',
        }),
        sizeSmall: () => ({
          height: 24,
          padding: '0 8px 0 8px',
        }),
        containedPrimary: ({ theme }) => ({
          background: `transparent linear-gradient(0deg, ${gradientColors.primary.start} 0%, ${gradientColors.primary.end} 100%) 0% 0% no-repeat padding-box`,
          ':hover': {
            background: `transparent linear-gradient(0deg, ${gradientColors.primary.start} 0%, ${gradientColors.primary.start} 100%) 0% 0% no-repeat padding-box`,
          },
        }),
        containedSecondary: ({ theme }) => ({
          background: `transparent linear-gradient(0deg, ${gradientColors.secondary.start} 0%, ${gradientColors.secondary.end} 100%) 0% 0% no-repeat padding-box`,
          ':hover': {
            background: `transparent linear-gradient(0deg, ${gradientColors.secondary.start} 0%, ${gradientColors.secondary.start} 100%) 0% 0% no-repeat padding-box`,
          },
        }),
        containedError: ({ theme }) => ({
          background: `transparent linear-gradient(0deg, ${gradientColors.error.start} 0%, ${gradientColors.error.end} 100%) 0% 0% no-repeat padding-box`,
          ':hover': {
            background: `transparent linear-gradient(0deg, ${gradientColors.error.start} 0%, ${gradientColors.error.start} 100%) 0% 0% no-repeat padding-box`,
          },
        }),
        containedWarning: ({ theme }) => ({
          background: `transparent linear-gradient(0deg, ${gradientColors.warning.start} 0%, ${gradientColors.warning.end} 100%) 0% 0% no-repeat padding-box`,
          ':hover': {
            background: `transparent linear-gradient(0deg, ${gradientColors.warning.start} 0%, ${gradientColors.warning.start} 100%) 0% 0% no-repeat padding-box`,
          },
        }),
        containedInfo: ({ theme }) => ({
          background: `transparent linear-gradient(0deg, ${gradientColors.info.start} 0%, ${gradientColors.info.start} 100%) 0% 0% no-repeat padding-box`,
          ':hover': {
            background: `transparent linear-gradient(0deg, ${gradientColors.info.end} 0%, ${gradientColors.info.end} 100%) 0% 0% no-repeat padding-box`,
          },
        }),
      },
    },
  },
  palette: {
    background: {
      default: '#F5F5F5',
    },
    primary: {
      main: gradientColors.primary.start,
      contrastText: '#fff',
    },
    secondary: {
      main: gradientColors.secondary.start,
      contrastText: '#fff',
    },
    error: {
      main: gradientColors.error.start,
    },
    warning: {
      main: gradientColors.warning.start,
    },
    info: {
      main: gradientColors.info.start,
    },
  },
  typography: {
    fontFamily: ['Open Sans', 'sans-serif'].join(','),
    label: {
      color: '#333333',
      fontSize: 12,
      marginBottom: '8px !important',
    },
    error: {
      color: '#D12119',
      fontSize: 12,
    },
  },
});
