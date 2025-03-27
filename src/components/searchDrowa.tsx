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
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import worksheetServiceInstance from '../services/worksheetService';

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
  const handleDownload = async (worksheetId: number) => {
    try {
      const blob = await worksheetServiceInstance.downloadWorksheet(worksheetId);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `worksheet-${worksheetId}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 360, mx: 'auto' }}>
      {/* Search field */}
      <Paper 
        elevation={2} 
        sx={{ 
          p: 2, 
          mb: 1, 
          borderRadius: 2,
          boxShadow: '0 2px 10px rgba(0,0,0,0.08)'
        }}
      >
        <Typography 
          variant="h6" 
          component="h2" 
          gutterBottom 
          dir="rtl"
          sx={{ fontSize: '1.1rem', fontWeight: 500 }}
        >
          חיפוש דפי עבודה
        </Typography>
        
        <TextField
          fullWidth
          dir="rtl"
          placeholder="הקלד שם דף עבודה..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {loading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <SearchIcon color="primary" />
                )}
              </InputAdornment>
            ),
            sx: { borderRadius: 1 }
          }}
        />
        
        {searchTerm.length > 0 && searchTerm.length < 2 && (
          <Typography 
            variant="caption" 
            color="text.secondary" 
            dir="rtl"
            sx={{ display: 'block', mt: 1, textAlign: 'right' }}
          >
            הקלד לפחות 2 תווים כדי להתחיל בחיפוש
          </Typography>
        )}
      </Paper>

      {/* Results list */}
      {worksheets.length > 0 && (
        <Paper 
          elevation={1} 
          sx={{ 
            mt: 1, 
            maxHeight: 400, 
            overflow: 'auto',
            borderRadius: 2
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
                    py: 1.5,
                    transition: 'all 0.2s',
                    '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' },
                    cursor: 'pointer'
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography 
                        variant="body1" 
                        dir="rtl" 
                        sx={{ fontWeight: 500 }}
                      >
                        {worksheet.title}
                      </Typography>
                    }
                    secondary={
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        dir="rtl"
                        sx={{ mt: 0.5, fontSize: '0.75rem' }}
                      >
                        {worksheet.categoryName && `קטגוריה: ${worksheet.categoryName}`}
                      </Typography>
                    }
                  />
                  <IconButton edge="end" size="small" onClick={() => handleWorksheetClick(worksheet)}>
                    <InfoIcon fontSize="small" />
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
            p: 2, 
            mt: 1, 
            textAlign: 'center',
            borderRadius: 2,
            bgcolor: '#f5f5f5'
          }}
        >
          <Typography variant="body2" color="text.secondary" dir="rtl">
            לא נמצאו דפי עבודה התואמים לחיפוש
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
            <DialogTitle dir="rtl" sx={{ pr: 6 }}>
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
            <DialogContent dividers>
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
            <DialogActions>
              <Button onClick={handleCloseDialog}>סגור</Button>
              <Button 
                onClick={() => handleDownload(selectedWorksheet.id)} 
                startIcon={<FileDownloadIcon />}
                variant="contained"
                color="primary"
                dir="ltr"
              >
                הורד
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default WorksheetSearchByCategory;