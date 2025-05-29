import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ImageIcon from '@mui/icons-material/Image';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { COLORS } from '../../COLORS';

const InfoPanel = () => {
  const navigate = useNavigate();
  
  const handleJoinNow = () => {
    navigate('/register');
  };
  
  return (
    <Paper 
      elevation={1} 
      sx={{
        p: 4,
        borderRadius: 3,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        boxShadow: `0 6px 20px ${COLORS[0]}20`, // light blue with transparency
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        border: `1px solid ${COLORS[0]}30`, // light blue with transparency
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: '600',
          mb: 2,
          color: 'text.primary',
          textAlign: 'center',
          fontSize: { xs: '1.7rem', md: '2rem' },
        }}
      >
        צבע בקליק
      </Typography>
      
      <Typography
        variant="body1"
        sx={{
          mb: 3.5,
          color: 'text.secondary',
          textAlign: 'center',
          lineHeight: 1.6,
          fontSize: '0.95rem',
        }}
      >
        פלטפורמה שקטה ואלגנטית להעלאת והורדת ציורים ויצירות אמנות. הצטרפו לקהילת האמנים שלנו.
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mb: 3.5 }}>
        <Box sx={{ textAlign: 'center' }}>
          <CloudUploadIcon sx={{ fontSize: 24, color: COLORS[11], mb: 0.5 }} /> {/* steel blue */}
          <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>
            העלאת יצירות
          </Typography>
        </Box>
        
        <Box sx={{ textAlign: 'center' }}>
          <ImageIcon sx={{ fontSize: 24, color: COLORS[0], mb: 0.5 }} /> {/* light blue */}
          <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>
           קטגוריות מגוונות
          </Typography>
        </Box>
        
        <Box sx={{ textAlign: 'center' }}>
          <CloudDownloadIcon sx={{ fontSize: 24, color: COLORS[4], mb: 0.5 }} /> {/* medium green */}
          <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>
            הורדת יצירות
          </Typography>
        </Box>
      </Box>
      
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 4 }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: COLORS[4], // medium green
            borderRadius: 8,
            px: 2.5,
            py: 0.8,
            fontWeight: '500',
            boxShadow: `0 2px 10px ${COLORS[4]}40`, // medium green with transparency
            transition: 'all 0.2s',
            '&:hover': {
              transform: 'translateY(-2px)',
              backgroundColor: COLORS[4],
              boxShadow: `0 4px 14px ${COLORS[4]}60`, // medium green with more opacity
            }
          }}
          onClick={handleJoinNow}
        >
          הצטרף עכשיו
        </Button>
      </Box>
    </Paper>
  );
};

export default InfoPanel;