import React, { useState, useEffect } from 'react';
import {
  TextField,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  InputAdornment,
  CircularProgress,
  Divider,
  Paper,
  Slide
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import worksheetServiceInstance from '../../services/worksheetService';

// Slide transition for dialog
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface WorksheetSearchProps {
  categoryId: number | null;
  onWorksheetSelect?: (worksheet: any) => void;
}

const WorksheetSearchByCategory: React.FC<WorksheetSearchProps> = ({ categoryId, onWorksheetSelect }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [worksheets, setWorksheets] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedWorksheet, setSelectedWorksheet] = useState<any>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  // Search worksheets when user types
  useEffect(() => {
    const fetchWorksheets = async () => {
      // Only search if there's a search term
      if (!searchTerm || searchTerm.length < 2) {
        setWorksheets([]);
        return;
      }

      setLoading(true);
      try {
        const category = categoryId !== null ? categoryId.toString() : null;
        const data = await worksheetServiceInstance.searchByCategory({
          categoryId: category as any,
          startsWith: searchTerm as any,
          ascending: true
        });
        setWorksheets(data);
      } catch (error) {
        console.error('Error searching worksheets:', error);
      } finally {
        setLoading(false);
      }
    };

    // Add debounce to prevent too many API calls
    const timeoutId = setTimeout(() => {
      fetchWorksheets();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, categoryId]);

  // Handle worksheet selection
  const handleWorksheetClick = (worksheet: any) => {
    setSelectedWorksheet(worksheet);
    setOpenDialog(true);
    if (onWorksheetSelect) {
      onWorksheetSelect(worksheet);
    }
  };

  // Handle dialog close
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Handle worksheet download
 

  return (
    <Box 
      sx={{ 
        width: '100%', 
        maxWidth: 300, 
    
        float: 'right',
        mr: 2,
        mb: 4,
        mt: 10, // מרווח נוסף מלמעלה
      }}
    >
      {/* Search field - רק מסגרת דקיקה */}
      <Paper 
        elevation={0} // ללא צל בכלל
        sx={{ 
          p: 1.5, 
          mb: 1, 
          borderRadius: 1,
          backgroundColor: 'transparent', // רקע שקוף להטמעה טובה יותר בדף
          border: 'none', // הסרת המסגרת לחלוטין
          boxShadow: 'none',
        }}
      >
        <TextField
          fullWidth
          dir="rtl"
          placeholder="הקלד שם דף עבודה..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          variant="standard" // סגנון מינימליסטי יותר
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {loading ? (
                  <CircularProgress size={16} color="inherit" />
                ) : (
                  <SearchIcon fontSize="small" color="inherit" />
                )}
              </InputAdornment>
            ),
            sx: { borderRadius: 0 }
          }}
        />
        
        {searchTerm.length > 0 && searchTerm.length < 2 && (
          <Typography 
            variant="caption" 
            color="text.secondary" 
            dir="rtl"
            sx={{ display: 'block', mt: 1, textAlign: 'right', fontSize: '0.7rem' }}
          >
            הקלד לפחות 2 תווים
          </Typography>
        )}
      </Paper>

      {/* Results list */}
      {worksheets.length > 0 && (
        <Paper 
          elevation={0}
          sx={{ 
            mt: 1, 
            maxHeight: 300, 
            overflow: 'auto',
            borderRadius: 1,
            backgroundColor: 'white',
            border: 'none', // הסרת המסגרת לחלוטין
            boxShadow: 'none',
          }}
        >
          <List dense>
            {worksheets.map((worksheet) => (
              <React.Fragment key={worksheet.id}>
                <ListItem 
                  component="div"
                  alignItems="flex-start"
                  onClick={() => handleWorksheetClick(worksheet)}
                  sx={{ 
                    py: 1,
                    transition: 'all 0.2s',
                    '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.03)' },
                    cursor: 'pointer'
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography 
                        variant="body2" 
                        dir="rtl" 
                        sx={{ fontWeight: 500, fontSize: '0.85rem' }}
                      >
                        {worksheet.title}
                      </Typography>
                    }
                    secondary={
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        dir="rtl"
                        sx={{ mt: 0.5, fontSize: '0.7rem' }}
                      >
                        {worksheet.categoryName && `קטגוריה: ${worksheet.categoryName}`}
                      </Typography>
                    }
                  />
                  <IconButton edge="end" size="small" sx={{ padding: 0.5 }} onClick={() => handleWorksheetClick(worksheet)}>
                    <InfoIcon fontSize="small" sx={{ fontSize: '1rem' }} />
                  </IconButton>
                </ListItem>
                <Divider component="li" />
              </React.Fragment>
            ))}
          </List>
        </Paper>
      )}

      {/* Show "no results" message if search term exists but no results */}
      {searchTerm.length >= 2 && worksheets.length === 0 && !loading && (
        <Paper 
          sx={{ 
            p: 1, 
            mt: 1, 
            textAlign: 'center',
            borderRadius: 1,
            backgroundColor: 'white',
            border: 'none', // הסרת המסגרת לחלוטין
            boxShadow: 'none',
          }}
        >
          <Typography variant="body2" color="text.secondary" dir="rtl" sx={{ fontSize: '0.8rem' }}>
            לא נמצאו דפי עבודה מתאימים
          </Typography>
        </Paper>
      )}

      {/* Worksheet details dialog */}
      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialog}
        aria-describedby="worksheet-details-dialog"
        maxWidth="xs"
        fullWidth
      >
        {selectedWorksheet && (
          <>
            <DialogTitle dir="rtl" sx={{ pr: 6, bgcolor: 'white' }}>
              {selectedWorksheet.title}
              <IconButton
                aria-label="close"
                onClick={handleCloseDialog}
                sx={{
                  position: 'absolute',
                  left: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent dividers sx={{ bgcolor: 'white' }}>
              <Box dir="rtl">
                <Typography variant="body1" gutterBottom>
                  מידע על דף העבודה:
                </Typography>
                
                <Box sx={{ mt: 2 }}>
                  {selectedWorksheet.categoryName && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">קטגוריה:</Typography>
                      <Typography variant="body2">{selectedWorksheet.categoryName}</Typography>
                    </Box>
                  )}
                  
                  {selectedWorksheet.ageGroup && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">קבוצת גיל:</Typography>
                      <Typography variant="body2">{selectedWorksheet.ageGroup}</Typography>
                    </Box>
                  )}
                  
                  {selectedWorksheet.difficulty && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">רמת קושי:</Typography>
                      <Typography variant="body2">{selectedWorksheet.difficulty}</Typography>
                    </Box>
                  )}
                  
                  {selectedWorksheet.userName && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">יוצר:</Typography>
                      <Typography variant="body2">{selectedWorksheet.userName}</Typography>
                    </Box>
                  )}
                </Box>
              </Box>
            </DialogContent>
            <DialogActions sx={{ bgcolor: 'white' }}>
              <Button onClick={handleCloseDialog}>סגור</Button>
           
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default WorksheetSearchByCategory;