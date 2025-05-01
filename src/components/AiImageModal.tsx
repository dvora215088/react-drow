
  import  { JSX, useState } from 'react';
  import { 
    Box, 
    Button, 
    TextField, 
    Typography, 
    CircularProgress, 
    Alert, 
    Fade,
    Container,
    Paper,
    Grid,
    AppBar,
    Toolbar,
    IconButton,
    Divider,
    Snackbar,
    Card,
    CardMedia,
    CardActions,
    CardContent
  } from '@mui/material';
  import { 
    PhotoCamera as PhotoCameraIcon, 
    Download as DownloadIcon, 
    Brush as BrushIcon,
    History as HistoryIcon,
    Favorite as FavoriteIcon,
    FavoriteBorder as FavoriteBorderIcon,
    Share as ShareIcon,
    Menu as MenuIcon
  } from '@mui/icons-material';
  import { ThemeProvider, createTheme } from '@mui/material/styles';
  import { styled } from '@mui/system';
  
  // Define types for dot configurations
  interface WaterColorDotProps {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
    size: number;
    opacity: number;
  }
  
  interface DotConfigMap {
    [key: string]: WaterColorDotProps[];
  }
  
  // יצירת ערכת נושא מותאמת אישית
  const theme = createTheme({
    direction: 'rtl' as 'rtl',
    palette: {
      primary: {
        main: '#87B4DC',
        light: '#AAD1F9',
        dark: '#5F8CB5',
        contrastText: '#fff',
      },
      secondary: {
        main: '#F9C8A0',
        light: '#FFE0C4',
        dark: '#D99D6B',
      },
      background: {
        default: '#f5f8fc',
        paper: '#ffffff',
      },
      text: {
        primary: '#333333',
        secondary: '#6b6b6b',
      },
    },
    typography: {
      fontFamily: 'Assistant, Rubik, Arial, sans-serif',
      h1: {
        fontWeight: 700,
      },
      h2: {
        fontWeight: 700,
      },
      h3: {
        fontWeight: 600,
      },
      h4: {
        fontWeight: 600,
      },
      h5: {
        fontWeight: 500,
      },
      h6: {
        fontWeight: 500,
      },
      button: {
        fontWeight: 500,
        borderRadius: 25,
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 25,
            padding: '8px 24px',
          },
          contained: {
            boxShadow: '0 4px 12px rgba(135, 180, 220, 0.3)',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 30,
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            boxShadow: '0 8px 24px rgba(135, 180, 220, 0.15)',
          },
        },
      },
    },
  });
  
  // רכיבים מעוצבים
  const StyledAppBar = styled(AppBar)(({  }) => ({
    background: 'rgba(255, 255, 255, 0.95)',
    boxShadow: '0 2px 10px rgba(135, 180, 220, 0.15)',
    backdropFilter: 'blur(8px)',
    position: 'sticky',
  }));
  
  interface WaterColorDotStyleProps {
    size: number;
    opacity: number;
  }
  
  const WaterColorDot = styled(Box)<WaterColorDotStyleProps>(({ theme, size = 12, opacity = 0.8 }) => ({
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: '50%',
    background: theme.palette.primary.light,
    opacity: opacity,
    position: 'absolute',
  }));
  
  const ImagePreviewCard = styled(Card)(({ theme }) => ({
    overflow: 'hidden',
    borderRadius: theme.shape.borderRadius * 2,
    boxShadow: '0 8px 30px rgba(135, 180, 220, 0.25)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 12px 40px rgba(135, 180, 220, 0.35)',
    },
  }));
  
  const MainContentArea = styled(Container)(({ theme }) => ({
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(10),
  }));
  
  const GradientTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.primary,
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: '-10px',
      left: '25%',
      right: '25%',
      height: '3px',
      background: `linear-gradient(90deg, transparent, ${theme.palette.primary.main}, transparent)`,
    },
  }));
  
  const PromptTextField = styled(TextField)(({  }) => ({
    '& .MuiOutlinedInput-root': {
      height: '60px',
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 15px rgba(135, 180, 220, 0.2)',
      },
      '&.Mui-focused': {
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 15px rgba(135, 180, 220, 0.25)',
      },
    },
    '& .MuiInputBase-input': {
      textAlign: 'center',
      direction: 'rtl',
    },
  }));
  
  const GenerateButton = styled(Button)(({ theme }) => ({
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
    '&:hover': {
      transform: 'translateY(-3px)',
      boxShadow: '0 8px 20px rgba(135, 180, 220, 0.4)',
    },
    '&:before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
      transition: 'all 0.6s ease',
    },
    '&:hover:before': {
      left: '100%',
    },
  }));
  
  // רכיב דוגמאות השראה
  const InspirationChip = styled(Button)(({ theme }) => ({
    borderRadius: '16px',
    padding: '4px 12px',
    margin: '0 4px 8px 4px',
    fontSize: '0.85rem',
    background: 'rgba(135, 180, 220, 0.1)',
    border: '1px solid rgba(135, 180, 220, 0.3)',
    color: theme.palette.text.secondary,
    '&:hover': {
      background: 'rgba(135, 180, 220, 0.2)',
    },
  }));
  
  export default function AiImageGenerator() {
    const [prompt, setPrompt] = useState<string>('');
    const [imageUrl, setImageUrl] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>('');
    const [favorite, setFavorite] = useState<boolean>(false);
    
  
    // דוגמאות השראה לקידום יצירתיות
    const inspirationExamples: string[] = [
      'נוף הרים עם אגם בזריחה',
      'דיוקן בסגנון רנסנס',
      'רחוב תל אביבי בגשם',
      'כוכבים וגלקסיות',
      'פרחים צבעוניים בווזה',
      'חתול עם כובע קסמים'
    ];
  
    const handleInspirationClick = (example: string): void => {
      setPrompt(example);
    };
  
    const generateImage = async (): Promise<void> => {
      if (!prompt) return;
  
      setLoading(true);
      setError('');
      try {
        const token = import.meta.env.VITE_HF_TOKEN;

        const response = await fetch(
          'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0',
          {
            method: 'POST',
            headers: {
              Authorization: 'Bearer '+ token,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ inputs: prompt }),
          }
        );
  
        if (!response.ok) {
          const data = await response.json();
          console.error('שגיאה מהמודל:', data);
          setError(data.error || 'קרתה שגיאה בלתי צפויה.');
          setLoading(false);
          return;
        }
  
        const blob = await response.blob();
        const imageObjectUrl = URL.createObjectURL(blob);
        setImageUrl(imageObjectUrl);
        
        // הודעת הצלחה
        setSnackbarMessage('התמונה נוצרה בהצלחה!');
        setSnackbarOpen(true);
      } catch (error) {
        console.error('שגיאה כללית:', error);
        setError('אירעה שגיאה בעת יצירת התמונה.');
      }
      setLoading(false);
    };
  
    const downloadImage = (): void => {
      if (!imageUrl) return;
  
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = 'ai-generated-image.png';
      link.click();
      
      setSnackbarMessage('התמונה הורדה בהצלחה!');
      setSnackbarOpen(true);
    };
  
    const toggleFavorite = (): void => {
      setFavorite(!favorite);
      setSnackbarMessage(favorite ? 'הוסר מהמועדפים' : 'נוסף למועדפים');
      setSnackbarOpen(true);
    };
  
    const shareImage = (): void => {
      if (navigator.share && imageUrl) {
        navigator.share({
          title: 'תמונה שיצרתי עם AI',
          text: `יצרתי תמונה מדהימה עם AI לפי התיאור: ${prompt}`,
          url: imageUrl
        }).catch(error => console.log('שגיאה בשיתוף:', error));
      } else {
        setSnackbarMessage('העתק את הקישור לתמונה הושלם ללוח');
        setSnackbarOpen(true);
      }
    };
  
    // פיזור נקודות בסגנון אקווארל בפינות
    const renderWatercolorDots = (position: string): JSX.Element[] => {
      // מיקומים ספציפיים לפי התמונה
      const dotsConfig: DotConfigMap = {
        'top-left': [
          { top: '25px', left: '20px', size: 14, opacity: 0.6 },
          { top: '35px', left: '40px', size: 10, opacity: 0.8 },
          { top: '15px', left: '45px', size: 8, opacity: 0.7 }
        ],
        'top-right': [
          { top: '20px', right: '20px', size: 12, opacity: 0.7 },
          { top: '35px', right: '30px', size: 9, opacity: 0.6 },
          { top: '15px', right: '50px', size: 10, opacity: 0.8 },
          { top: '40px', right: '55px', size: 8, opacity: 0.5 }
        ],
        'bottom-left': [
          { bottom: '20px', left: '25px', size: 11, opacity: 0.6 },
          { bottom: '40px', left: '15px', size: 8, opacity: 0.7 }
        ],
        'bottom-right': [
          { bottom: '15px', right: '30px', size: 13, opacity: 0.6 },
          { bottom: '35px', right: '15px', size: 9, opacity: 0.7 }
        ]
      };
      
      const dots = dotsConfig[position] || [];
      
      return dots.map((dot, i) => (
        <WaterColorDot
          key={`${position}-dot-${i}`}
          sx={{
            top: dot.top,
            left: dot.left,
            right: dot.right,
            bottom: dot.bottom,
          }}
          size={dot.size}
          opacity={dot.opacity}         />
      ));
    };
  
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
        {/* סרגל ניווט */}
        <StyledAppBar color="transparent">
          <Toolbar>
            <IconButton edge="start" color="primary" sx={{ mr: 2, display: { sm: 'none' } }}>
              <MenuIcon />
            </IconButton>
            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
              <BrushIcon color="primary" sx={{ mr: 1 }} />
              <Typography 
                variant="h6" 
                component="div" 
                sx={{ 
                  fontWeight: 'bold',
                  background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                צייר לי ציור
              </Typography>
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Button 
                color="inherit" 
                sx={{ mr: 2 }}
                startIcon={<HistoryIcon />}
              >
                היסטוריה
              </Button>
              <Button 
                color="inherit"
                startIcon={<FavoriteIcon />}
              >
                מועדפים
              </Button>
            </Box>
          </Toolbar>
        </StyledAppBar>

        {/* תוכן עיקרי */}
        <MainContentArea maxWidth="lg">
          <Box sx={{ position: 'relative', mb: 5 }}>
            <GradientTypography 
              variant="h3" 
              align="center"
              sx={{
                fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
                mb: 4,
                fontWeight: 700,
              }}
            >
              צייר לי ציור בקליק
            </GradientTypography>
            
            <Typography 
              variant="body1" 
              color="text.secondary" 
              align="center" 
              sx={{ 
                mb: 5, 
                maxWidth: '700px', 
                mx: 'auto',
                px: 2 
              }}
            >
              תארו את התמונה שאתם רוצים, ובעזרת בינה מלאכותית ניצור לכם אותה תוך שניות.
              השתמשו בתיאור מפורט לקבלת התוצאות הטובות ביותר.
            </Typography>
          </Box>

          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                mb: 3, 
                width: '100%', 
                maxWidth: '650px', 
                mx: 'auto',
                borderRadius: '10px' 
              }}
              onClose={() => setError('')}
            >
              {error}
            </Alert>
          )}

          {/* אזור האינטראקציה */}
          <Paper 
            elevation={3} 
            sx={{ 
              p: { xs: 3, md: 5 }, 
              mb: 5, 
              maxWidth: '800px', 
              mx: 'auto',
              borderRadius: '20px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* עיטורים בסגנון אקווארל */}
            <Box sx={{ position: 'absolute', top: 0, left: 0 }}>
              {renderWatercolorDots('top-left')}
            </Box>
            <Box sx={{ position: 'absolute', top: 0, right: 0 }}>
              {renderWatercolorDots('top-right')}
            </Box>
            <Box sx={{ position: 'absolute', bottom: 0, left: 0 }}>
              {renderWatercolorDots('bottom-left')}
            </Box>
            <Box sx={{ position: 'absolute', bottom: 0, right: 0 }}>
              {renderWatercolorDots('bottom-right')}
            </Box>

            {/* טקסט השראה */}
            <Box sx={{ mb: 4, mt: 2 }}>
              <Typography 
                variant="subtitle1" 
                color="text.secondary" 
                align="center" 
                gutterBottom
                sx={{ 
                  mb: 2,
                  fontWeight: 500,
                  fontSize: '1rem'
                }}
              >
                השראה ליצירה
              </Typography>
              <Box 
                sx={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  justifyContent: 'center', 
                  maxWidth: '600px',
                  mx: 'auto'
                }}
              >
                {inspirationExamples.map((example, index) => (
                  <InspirationChip 
                    key={index} 
                    onClick={() => handleInspirationClick(example)}
                    size="small"
                  >
                    {example}
                  </InspirationChip>
                ))}
              </Box>
            </Box>
            
            <Divider sx={{ mb: 4 }} />

            {/* שדה הזנת טקסט בעיצוב מודרני */}
            <PromptTextField
              fullWidth
              variant="outlined"
              placeholder="תאר את הציור שברצונך ליצור"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              sx={{ mb: 3, maxWidth: '600px', mx: 'auto' }}
              disabled={loading}
            />
            
            {/* אזור הכפתור */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
              <GenerateButton
                variant="contained"
                onClick={generateImage}
                disabled={loading || !prompt}
                size="large"
                sx={{
                  py: 1.5,
                  px: 5,
                  fontSize: '1.1rem',
                  minWidth: '150px',
                }}
                endIcon={loading ? null : <PhotoCameraIcon />}
              >
                {loading ? (
                  <>
                    <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
                    <Box component="span">מייצר...</Box>
                  </>
                ) : (
                  'צור תמונה'
                )}
              </GenerateButton>
            </Box>
          </Paper>

          {/* תצוגת התמונה שנוצרה */}
          {imageUrl && (
            <Fade in timeout={800}>
              <Box sx={{ mt: 4, mb: 6 }}>
                <Grid container spacing={4} justifyContent="center">
                  <Grid item xs={12} md={8} lg={6}>
                    <ImagePreviewCard>
                      <CardMedia
                        component="img"
                        image={imageUrl}
                        alt="תמונה שנוצרה על ידי בינה מלאכותית"
                        sx={{ 
                          width: '100%',
                          height: 'auto',
                          maxHeight: '500px',
                          objectFit: 'contain',
                        }}
                      />
                      <CardContent sx={{ pb: 1 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                          {prompt}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                          נוצר ע״י AI בתאריך {new Date().toLocaleDateString('he-IL')}
                        </Typography>
                      </CardContent>
                      <CardActions sx={{ px: 2, pb: 2, pt: 0 }}>
                        <Button
                          variant="contained"
                          startIcon={<DownloadIcon />}
                          onClick={downloadImage}
                          color="primary"
                        >
                          הורד תמונה
                        </Button>
                        <IconButton 
                          aria-label="הוסף למועדפים"
                          onClick={toggleFavorite}
                          color={favorite ? "error" : "default"}
                        >
                          {favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                        </IconButton>
                        <IconButton 
                          aria-label="שתף תמונה"
                          onClick={shareImage}
                        >
                          <ShareIcon />
                        </IconButton>
                      </CardActions>
                    </ImagePreviewCard>
                  </Grid>
                </Grid>
              </Box>
            </Fade>
          )}
          
          {/* אזור מידע נוסף / תכונות */}
          {!imageUrl && (
            <Box sx={{ mt: 8, mb: 5 }}>
              <Typography 
                variant="h5" 
                component="h2" 
                align="center" 
                sx={{ mb: 4, fontWeight: 600 }}
              >
                כיצד זה עובד?
              </Typography>
              
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} sm={6} md={4}>
                  <Paper 
                    sx={{ 
                      p: 3, 
                      height: '100%',
                      borderRadius: '16px',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                      }
                    }}
                  >
                    <Typography variant="h6" gutterBottom>
                      1. תארו את הציור
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ככל שהתיאור שלכם יהיה מפורט יותר, כך תקבלו תוצאה מדויקת יותר. 
                      ניתן לציין סגנון אמנותי, צבעים, אווירה ועוד.
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Paper 
                    sx={{ 
                      p: 3, 
                      height: '100%',
                      borderRadius: '16px',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                      }
                    }}
                  >
                    <Typography variant="h6" gutterBottom>
                      2. לחצו על ״צור תמונה״
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      המערכת תשתמש בבינה מלאכותית מתקדמת כדי להפוך את התיאור שלכם לתמונה ויזואלית איכותית תוך שניות.
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Paper 
                    sx={{ 
                      p: 3, 
                      height: '100%',
                      borderRadius: '16px',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                      }
                    }}
                  >
                    <Typography variant="h6" gutterBottom>
                      3. הורידו או שתפו
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      התמונה שלכם מוכנה! הורידו אותה למחשב או שתפו עם חברים ברשתות החברתיות.
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          )}
        </MainContentArea>
        
        {/* הודעת סנאקבר (Toast) */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
          message={snackbarMessage}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        />
      </Box>
    </ThemeProvider>
  );
}