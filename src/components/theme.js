import { Platform } from 'react-native';

const theme = {
  colors: {
    appBarBackground: '#24292e',
    textPrimary: '#ffffff',
    textSecondary: '#586069',
    primary: '#0366d6',
    mainCompBackground: '#e1e4e8',
    itemBackground: '#ffffff',
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System'
    }),
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
};

export default theme;