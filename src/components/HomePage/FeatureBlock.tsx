import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { SvgIconProps } from '@mui/material/SvgIcon';

interface FeatureBlockProps {
  icon: React.ReactElement<SvgIconProps>;
  text: string;
  color: string;
}

const FeatureBlock = ({ icon, text, color }: FeatureBlockProps) => {
  // עטיפת האייקון בבוקס במקום ניסיון לקלון עם התכונות
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Box sx={{ fontSize: 24, color, mb: 0.5, display: 'flex', justifyContent: 'center' }}>
        {icon}
      </Box>
      <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>
        {text}
      </Typography>
    </Box>
  );
};

export default FeatureBlock;