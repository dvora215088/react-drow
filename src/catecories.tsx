import React, { useEffect, useState } from 'react';
import { categoryService, Category } from './services/categoriesService';

// נגדיר מספר צבעים לקטגוריות במקרה שאין צבע מוגדר
const CATEGORY_COLORS = [
  '#FF6B6B', '#4ECDC4', '#FFA69E', '#87CEEB', '#5D5C61',
  '#379683', '#7395AE', '#557A95', '#B1A296', '#938BA1'
];
import { 
  Box, 
  Card, 
  CardActionArea, 
  CardContent, 
  CardMedia, 
  Typography, 
  Grid, 
  Container, 
  Paper, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  CircularProgress,
  Alert,
  IconButton,
  Grow,
  Slide,
  useTheme,
  alpha
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import ImageIcon from '@mui/icons-material/Image';
import PaletteIcon from '@mui/icons-material/Palette';
import InfoIcon from '@mui/icons-material/Info';

// סטיילים מותאמים אישית
const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  position: 'relative',
  borderRadius: '16px',
  '&:hover': {
    transform: 'translateY(-12px) scale(1.02)',
    boxShadow: theme.shadows[15],
    '& .MuiCardMedia-root': {
      transform: 'scale(1.1)',
    },
    '& .card-overlay': {
      opacity: 0.2,
    },
    '& .card-content-container': {
      transform: 'translateY(-5px)',
    }
  },
}));

const CardOverlay = styled(Box)(({  }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  height: '100%',
  background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 70%)',
  zIndex: 1,
  opacity: 0.5,
  transition: 'opacity 0.3s ease',
}));

const CategoryImage = styled(CardMedia)(({  }) => ({
  height: 260,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  transition: 'transform 0.5s ease',
  position: 'relative',
}));

const CategoryPlaceholder = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'bgcolor'
})<{ bgcolor: string }>(({ bgcolor }) => ({
  height: 260,
  backgroundColor: bgcolor,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    width: '150%',
    height: '150%',
    background: `linear-gradient(135deg, ${alpha(bgcolor, 0.3)} 0%, ${alpha(bgcolor, 0.1)} 50%, transparent 100%)`,
    transform: 'rotate(45deg)',
    top: '-25%',
    left: '-25%',
  }
}));

const CardContentContainer = styled(CardContent)(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
  transition: 'transform 0.3s ease',
  padding: theme.spacing(3, 2),
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
}));

const CategoryTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  marginBottom: theme.spacing(1),
  position: 'relative',
  display: 'inline-block',
  '&::after': {
    content: '""',
    position: 'absolute',
    width: '40%',
    height: 3,
    bottom: -6,
    left: 0,
    backgroundColor: theme.palette.primary.main,
    borderRadius: 3,
  }
}));

const CategoryDescription = styled(Typography)(({  }) => ({
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  opacity: 0.8,
  marginBottom: 'auto'
}));

const LoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(8),
  textAlign: 'center',
  minHeight: 400,
}));

const PageHeader = styled(Box)(({ theme }) => ({
  position: 'relative',
  marginBottom: theme.spacing(6),
  textAlign: 'center',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -16,
    left: '50%',
    width: 120,
    height: 4,
    backgroundColor: theme.palette.primary.main,
    transform: 'translateX(-50%)',
    borderRadius: 2,
  }
}));

const ImagePlaceholder = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(3),
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  borderRadius: 8,
  color: theme.palette.text.secondary,
}));

const DetailImageContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 350,
  overflow: 'hidden',
  position: 'relative',
  marginBottom: theme.spacing(3),
  borderRadius: '4px 4px 16px 16px',
}));

const CategoryIconBadge = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 12,
  right: 12,
  backgroundColor: alpha(theme.palette.background.paper, 0.9),
  color: theme.palette.text.primary,
  borderRadius: '50%',
  padding: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: theme.shadows[3],
  zIndex: 2,
}));


const CategoriesDisplay: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await categoryService.getAllCategories();
        setCategories(data);
        setError(null);
      } catch (err) {
        console.error('שגיאה בטעינת הקטגוריות:', err);
        setError('לא ניתן לטעון את הקטגוריות. אנא נסה שוב מאוחר יותר.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // פונקציה שמקצה צבע לקטגוריה אם אין לה צבע מוגדר
  const getCategoryColor = (category: Category, index: number): string => {
    if (category.color) return category.color;
    return CATEGORY_COLORS[index % CATEGORY_COLORS.length];
  };

  // פונקציה לטיפול בלחיצה על קטגוריה
  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category);
  };

  // פונקציה לסגירת חלון הפרטים
  const handleCloseDetails = () => {
    setSelectedCategory(null);
  };

  if (loading) {
    return (
      <LoadingContainer>
        <CircularProgress size={60} thickness={4} color="primary" />
        <Typography variant="h6" sx={{ mt: 3, fontWeight: 500 }}>
          טוען קטגוריות...
        </Typography>
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Alert 
          severity="error" 
          variant="filled"
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            flexDirection: 'column',
            py: 4,
            borderRadius: 2
          }}
          action={
            <Button 
              color="inherit" 
              variant="outlined"
              size="large"
              onClick={() => window.location.reload()}
              sx={{ 
                mt: { xs: 2, sm: 0 },
                borderColor: 'rgba(255,255,255,0.5)',
                '&:hover': {
                  borderColor: 'rgba(255,255,255,0.8)',
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              נסה שוב
            </Button>
          }
        >
          <Typography variant="h6" align="center" gutterBottom sx={{ fontWeight: 500 }}>
            {error}
          </Typography>
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6, direction: 'rtl' }}>
      <PageHeader>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
          הקטגוריות שלנו
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
          סייר בקטגוריות המרהיבות שלנו ומצא השראה לציורים הבאים שלך
        </Typography>
      </PageHeader>
      
      {categories.length === 0 ? (
        <Paper 
          elevation={0} 
          sx={{ 
            p: 6, 
            textAlign: 'center',
            bgcolor: 'grey.50', 
            borderRadius: 3,
            border: `1px dashed ${theme.palette.divider}`
          }}
        >
          <ImagePlaceholder>
            <PaletteIcon sx={{ fontSize: 60, mb: 2, opacity: 0.7 }} />
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 500 }}>
              אין קטגוריות להצגה
            </Typography>
            <Typography variant="body2" color="text.secondary">
              הקטגוריות שיתווספו יופיעו כאן
            </Typography>
          </ImagePlaceholder>
        </Paper>
      ) : (
        <>
          <Grid container spacing={3}>
            {categories.map((category, index) => (
              <Grid item xs={12} sm={6} md={4} key={category.id}>
                <Grow 
                  in={true} 
                  timeout={(index + 1) * 150}
                  style={{ transformOrigin: '0 0 0' }}
                >
                  <StyledCard elevation={4}>
                    <CardActionArea 
                      onClick={() => handleCategoryClick(category)}
                      sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                    >
                      {/* אייקון קטגוריה */}
                      <CategoryIconBadge>
                        {category.imageUrl ? (
                          <ImageIcon fontSize="small" />
                        ) : (
                          <PaletteIcon fontSize="small" />
                        )}
                      </CategoryIconBadge>

                      {/* תמונת קטגוריה */}
                      {category.imageUrl ? (
                        <CategoryImage
                          image={category.imageUrl}
                          title={category.name}
                        />
                      ) : (
                        <CategoryPlaceholder 
                          bgcolor={getCategoryColor(category, index)}
                        >
                          <Typography variant="h2" sx={{ color: 'white', fontWeight: 'bold', opacity: 0.8 }}>
                            {category.name?.charAt(0).toUpperCase()}
                          </Typography>
                        </CategoryPlaceholder>
                      )}

                      {/* שכבת Overlay */}
                      <CardOverlay className="card-overlay" />

                      {/* תוכן הקטגוריה */}
                      <CardContentContainer className="card-content-container">
                        <CategoryTitle variant="h6">
                          {category.name}
                        </CategoryTitle>
                        {category.description && (
                          <CategoryDescription variant="body2" color="text.secondary">
                            {category.description}
                          </CategoryDescription>
                        )}
                        <Box sx={{ 
                          display: 'flex', 
                          justifyContent: 'flex-end', 
                          alignItems: 'center',
                          mt: 2
                        }}>
                          <Typography 
                            variant="caption" 
                            sx={{ 
                              display: 'flex', 
                              alignItems: 'center',
                              color: theme.palette.primary.main,
                              fontWeight: 500
                            }}
                          >
                            <InfoIcon fontSize="small" sx={{ mr: 0.5, fontSize: '16px' }} />
                            לפרטים נוספים
                          </Typography>
                        </Box>
                      </CardContentContainer>
                    </CardActionArea>
                  </StyledCard>
                </Grow>
              </Grid>
            ))}
          </Grid>

          {/* מספר הקטגוריות */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Paper
              elevation={1}
              sx={{
                px: 3,
                py: 1.5,
                borderRadius: 6,
                display: 'inline-flex',
                alignItems: 'center',
                bgcolor: alpha(theme.palette.primary.main, 0.1)
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                סה"כ {categories.length} קטגוריות
              </Typography>
            </Paper>
          </Box>
        </>
      )}

      {/* דיאלוג פרטי קטגוריה */}
      <Dialog 
        open={selectedCategory !== null} 
        onClose={handleCloseDetails}
        maxWidth="md"
        fullWidth
        TransitionComponent={Slide}
        TransitionProps={{
        }}
        PaperProps={{
          elevation: 12,
          sx: {
            borderRadius: 2,
            overflowY: 'visible'
          }
        }}
      >
        {selectedCategory && (
          <>
            <DialogTitle 
              sx={{ 
                pr: 6, 
                py: 3,
                borderBottom: `1px solid ${theme.palette.divider}`
              }}
            >
              <Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
                {selectedCategory.name}
              </Typography>
              <IconButton
                onClick={handleCloseDetails}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            
            <DialogContent sx={{ pt: 3, pb: 4 }}>
              {selectedCategory.imageUrl ? (
                <DetailImageContainer>
                  <img 
                    src={selectedCategory.imageUrl} 
                    alt={selectedCategory.name}
                    style={{ 
                      width: '100%', 
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease',
                    }}
                  />
                </DetailImageContainer>
              ) : (
                <DetailImageContainer sx={{ 
                  background: `linear-gradient(135deg, ${selectedCategory.color || getCategoryColor(selectedCategory, 0)} 0%, ${alpha(selectedCategory.color || getCategoryColor(selectedCategory, 0), 0.7)} 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <ImagePlaceholder sx={{ 
                    width: '75%', 
                    height: '75%', 
                    backgroundColor: alpha('#ffffff', 0.2),
                    border: '2px dashed rgba(255,255,255,0.3)',
                  }}>
                    <ImageIcon sx={{ fontSize: 70, color: 'white', opacity: 0.6, mb: 2 }} />
                    <Typography variant="body1" sx={{ color: 'white' }}>
                      אין תמונה זמינה לקטגוריה זו
                    </Typography>
                  </ImagePlaceholder>
                </DetailImageContainer>
              )}

              {selectedCategory.description ? (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 500 }}>
                    אודות הקטגוריה
                  </Typography>
                  <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                    {selectedCategory.description}
                  </Typography>
                </Box>
              ) : (
                <Box sx={{ mt: 4, textAlign: 'center' }}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      bgcolor: alpha(theme.palette.warning.main, 0.1),
                      borderRadius: 2,
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      אין תיאור זמין לקטגוריה זו
                    </Typography>
                  </Paper>
                </Box>
              )}
              
              {/* מידע נוסף על הקטגוריה - לדוגמה */}
              <Box 
                sx={{ 
                  mt: 4, 
                  pt: 3, 
                  borderTop: `1px solid ${theme.palette.divider}`,
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 2
                }}
              >
                <Paper 
                  elevation={1} 
                  sx={{ 
                    py: 1.5, 
                    px: 2, 
                    borderRadius: 1, 
                    display: 'flex', 
                    alignItems: 'center',
                    bgcolor: alpha(theme.palette.primary.main, 0.05)
                  }}
                >
                  <Box 
                    sx={{ 
                      width: 16, 
                      height: 16, 
                      borderRadius: '50%', 
                      bgcolor: selectedCategory.color || getCategoryColor(selectedCategory, 0),
                      mr: 1
                    }} 
                  />
                  <Typography variant="body2">
                    קוד צבע: {selectedCategory.color || getCategoryColor(selectedCategory, 0)}
                  </Typography>
                </Paper>
                
                <Paper 
                  elevation={1} 
                  sx={{ 
                    py: 1.5, 
                    px: 2, 
                    borderRadius: 1, 
                    display: 'flex', 
                    alignItems: 'center',
                    bgcolor: alpha(theme.palette.info.main, 0.05)
                  }}
                >
                  <Typography variant="body2">
                    מזהה: {selectedCategory.id}
                  </Typography>
                </Paper>
              </Box>
            </DialogContent>
            
            <DialogActions sx={{ px: 3, py: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
              <Button 
                onClick={handleCloseDetails} 
                variant="outlined"
              >
                סגור
              </Button>
              <Button 
                variant="contained" 
                color="primary"
                onClick={handleCloseDetails}
              >
                הבנתי
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default CategoriesDisplay;