import React from 'react';
import { 
  Box, 
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';

import { COLORS } from '../../COLORS';

// Color constants from our palette
const PRIMARY_BLUE = COLORS[2]; // darker blue
const MEDIUM_GREEN = COLORS[4]; // medium green
const LIGHT_GREEN = COLORS[3]; // light green
const DARK_GRAY = COLORS[8]; // darker gray

// Styled components with our palette
const HeaderContainer = styled(Box)(() => ({
  position: 'relative',
  marginBottom: 64, // theme.spacing(8)
  textAlign: 'center',
  padding: '32px 16px', // theme.spacing(4, 2)
  backgroundColor: 'white', // Added white background
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -8,
    left: '50%',
    width: 150,
    height: 5,
    background: `linear-gradient(90deg, ${PRIMARY_BLUE} 0%, ${LIGHT_GREEN} 100%)`,
    transform: 'translateX(-50%)',
    borderRadius: 10,
  }
}));



const GradientTitle = styled(Typography)(() => ({
  fontWeight: 800,
  marginBottom: 12,
  background: `linear-gradient(45deg, ${PRIMARY_BLUE}, ${MEDIUM_GREEN})`,
  backgroundClip: 'text',
  textFillColor: 'transparent',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  letterSpacing: '0.02em',
}));

const Subtitle = styled(Typography)(() => ({
  maxWidth: 700,
  marginLeft: 'auto',
  marginRight: 'auto',
  fontWeight: 400,
  color: DARK_GRAY,
}));




interface PageHeaderProps {
  title: string;
  subtitle: string;
  showFilterChips?: boolean;
}

const PageHeader: React.FC<PageHeaderProps> = ({ 
  title,
  subtitle}) => {
  return (
    <HeaderContainer>

      {/* <IconContainer>
        <ColorLensIcon sx={{ 
          fontSize: 40, 
          color: PRIMARY_BLUE,
          animation: 'colorSpin 5s infinite linear',
          '@keyframes colorSpin': {
            '0%': { transform: 'rotate(0deg)', color: PRIMARY_BLUE },
            '50%': { transform: 'rotate(180deg)', color: MEDIUM_GREEN },
            '100%': { transform: 'rotate(360deg)', color: PRIMARY_BLUE },
          }
        }} />
      </IconContainer> */}

      <GradientTitle 
        variant="h3" 
        sx={{ fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' } }}
      >
        {title}
      </GradientTitle>

      <Subtitle
        variant="h6"
        sx={{ fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' } }}
      >
        {subtitle}
      </Subtitle>
      
   
    </HeaderContainer>
  );
};

export default PageHeader;