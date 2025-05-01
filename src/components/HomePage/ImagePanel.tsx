import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { COLORS } from '../../COLORS';

const ImagePanel = () => {
  return (
    <Box sx={{ maxWidth: '100%', position: 'relative', width: '100%' }}>
      <Paper
        elevation={2}
        sx={{
          p: 3,
          backgroundColor: 'white',
          borderRadius: 3,
          boxShadow: `0 10px 30px ${COLORS[1]}30`, // medium blue with transparency
          overflow: 'hidden',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: `linear-gradient(90deg, ${COLORS[1]}, ${COLORS[4]}, ${COLORS[3]})`, // medium blue, medium green, light green
            opacity: 0.9,
          }
        }}
      >
        <img 
          src="src/assets/home.png" 
          alt="דוגמא לאמנות" 
          style={{
            width: '100%',
            maxHeight: '65vh',
            objectFit: 'contain',
            display: 'block',
            borderRadius: '4px',
            animation: 'float 8s infinite ease-in-out',
          }}
        />
        <style>
          {`
            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-8px); }
            }
          `}
        </style>
      </Paper>
      
      {/* אלמנטים עדינים מסביב לתמונה */}
      <Box
        sx={{
          position: 'absolute',
          top: -15,
          right: -10,
          width: 25,
          height: 25,
          backgroundColor: COLORS[12], // bright green
          opacity: 0.7,
          borderRadius: '50%',
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -12,
          left: -15,
          width: 20,
          height: 20,
          backgroundColor: COLORS[0], // light blue
          opacity: 0.7,
          borderRadius: '50%',
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          right: -18,
          width: 15,
          height: 15,
          backgroundColor: COLORS[11], // steel blue
          opacity: 0.6,
          borderRadius: '50%',
          zIndex: 0,
        }}
      />
    </Box>
  );
};

export default ImagePanel;