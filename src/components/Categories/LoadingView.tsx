import React from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  CircularProgress,
  alpha 
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { COLORS } from '../../COLORS';

// Color constants from our palette
const PRIMARY_BLUE = COLORS[2]; // darker blue
const MEDIUM_BLUE = COLORS[1]; // medium blue
const LIGHT_GREEN = COLORS[3]; // light green
const MEDIUM_GRAY = COLORS[7]; // medium gray

// Styled components using our palette
const LoadingContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 80, // theme.spacing(10)
  textAlign: 'center',
  minHeight: 500,
  background: `linear-gradient(45deg, ${alpha(LIGHT_GREEN, 0.07)} 0%, ${alpha(MEDIUM_BLUE, 0.07)} 100%)`,
  borderRadius: 20,
  boxShadow: `0 10px 30px ${alpha(MEDIUM_GRAY, 0.08)}`,
  border: `1px solid`,
}));

const ProgressWrapper = styled(Box)(() => ({
  position: 'relative',
  '& .MuiCircularProgress-root': {
    color: PRIMARY_BLUE
  }
}));

const IconOverlay = styled(Box)(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: LIGHT_GREEN,
}));

const LoadingMessage = styled(Typography)(() => ({
  marginTop: 32, // 4 * 8
  fontWeight: 600,
  color: PRIMARY_BLUE,
}));

const SubMessage = styled(Typography)(() => ({
  marginTop: 8,
  maxWidth: 300,
  color: MEDIUM_GRAY,
}));

interface LoadingViewProps {
  message?: string;
  subMessage?: string;
}

const LoadingView: React.FC<LoadingViewProps> = ({ 
  message = 'טוען קטגוריות...',
  subMessage = 'אנו מכינים עבורך את האוסף המושלם של קטגוריות מרהיבות'
}) => {
  return (
    <Container maxWidth="lg" sx={{ py: 6, direction: 'rtl' }}>
      <LoadingContainer>
        <ProgressWrapper>
          <CircularProgress 
            size={80} 
            thickness={3}
            sx={{ 
              opacity: 0.8,
              '& circle': {
                strokeLinecap: 'round',
              }
            }} 
          />
          <IconOverlay>
            <AutoAwesomeIcon sx={{ fontSize: 28 }} />
          </IconOverlay>
        </ProgressWrapper>
        
        <LoadingMessage variant="h5">
          {message}
        </LoadingMessage>
        
        <SubMessage variant="body2">
          {subMessage}
        </SubMessage>
      </LoadingContainer>
    </Container>
  );
};

export default LoadingView;