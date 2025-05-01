import { useState, ChangeEvent } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Select, 
  MenuItem, 
  Button, 
  Paper, 
  FormControl, 
  Alert, 
  CircularProgress,
  IconButton,
  InputAdornment,
  SelectChangeEvent,
  Snackbar
} from '@mui/material';
import { styled } from '@mui/system';
import EmailIcon from '@mui/icons-material/Email';
import PaletteIcon from '@mui/icons-material/Palette';
import EditIcon from '@mui/icons-material/Edit';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import SaveIcon from '@mui/icons-material/Save';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const API_BASE_URL = 'https://server-drow.onrender.com';

// עיצוב מותאם אישית
const RoundedPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: '16px',
  maxWidth: '500px',
  margin: '0 auto',
  boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.1)',
  position: 'relative',
  overflow: 'hidden',
  background: 'linear-gradient(to bottom right, #ffffff, #f8fbff)',
}));

const StyledIconButton = styled(IconButton)(({  }) => ({
  backgroundColor: '#e6f2f9',
  '&:hover': {
    backgroundColor: '#d0e8f7',
    transform: 'scale(1.1)',
  },
  transition: 'all 0.2s',
  marginRight: '8px',
}));

const BlueDot = styled('div')({
  width: '14px',
  height: '14px',
  borderRadius: '50%',
  backgroundColor: '#90c4e6',
  position: 'absolute',
  opacity: 0.7,
  transition: 'all 0.3s',
  '&:hover': {
    transform: 'scale(1.2)',
    opacity: 0.9,
  }
});

const FormTitle = styled(Typography)({
  textAlign: 'center',
  fontWeight: 'bold',
  marginBottom: '30px',
  fontSize: '28px',
  background: 'linear-gradient(45deg, #4c8bf5, #90c4e6)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
});

const FileUploadForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [, setProgress] = useState<number>(0);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  // שדות נוספים מהמשתמש
  const [ageGroup, setAgeGroup] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [drawingName, setDrawingName] = useState('');

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setError('');
      setSuccess(false);
    }
  };

  const handleDifficultyChange = (e: SelectChangeEvent) => {
    setDifficulty(e.target.value);
  };

  const uploadFile = async () => {
    if (!file || !ageGroup || !difficulty || !drawingName) {
      setError('יש למלא את כל השדות ולבחור קובץ');
      return;
    }

    try {
      setUploading(true);
      setProgress(0);

      const response = await fetch(`${API_BASE_URL}/api/upload/presigned-url?fileName=${encodeURIComponent(file.name)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) throw new Error('שגיאה בקבלת presigned URL');

      const { url, key } = await response.json();

      const uploadResponse = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': file.type },
        body: file
      });

      if (!uploadResponse.ok) throw new Error('שגיאה בהעלאת הקובץ');

      const fileUrl = `https://s3.us-east-1.amazonaws.com/drows.testpnoren/${key}`;

      const worksheetData = {
        title: drawingName,
        fileUrl,
        ageGroup,
        difficulty,
      };

      const saveResponse = await fetch(`${API_BASE_URL}/api/worksheets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(worksheetData),
      });

      if (!saveResponse.ok) throw new Error('שגיאה בהוספת הקובץ לדאטה-בס');

      setSuccess(true);
      setFile(null);
      setAgeGroup('');
      setDifficulty('');
      setDrawingName('');
    } catch (err) {
      setError(`שגיאה בהעלאת הקובץ: ${(err as Error).message}`);
    } finally {
      setUploading(false);
    }
  };

  const saveImage = () => {
    if (!file) {
      setError('יש לבחור קובץ תמונה תחילה');
      return;
    }

    // יוצר אובייקט URL לקובץ שנבחר
    const imageUrl = URL.createObjectURL(file);
    
    // יוצר אלמנט קישור להורדת הקובץ
    const downloadLink = document.createElement('a');
    downloadLink.href = imageUrl;
    downloadLink.download = file.name;
    
    // לוחץ על הקישור באופן אוטומטי להתחלת ההורדה
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    
    // שחרור אובייקט ה-URL
    URL.revokeObjectURL(imageUrl);
    
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <RoundedPaper>
      {/* כדורים כחולים לעיצוב */}
      <BlueDot style={{ top: '20px', left: '20px' }} />
      <BlueDot style={{ top: '30px', left: '50px' }} />
      <BlueDot style={{ top: '15px', left: '80px' }} />
      <BlueDot style={{ top: '20px', right: '20px' }} />
      <BlueDot style={{ top: '15px', right: '50px' }} />
      <BlueDot style={{ top: '30px', right: '80px' }} />

      <FormTitle dir="rtl">העלאת ציור</FormTitle>

      <Box sx={{ mb: 3 }} dir="rtl">
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Typography sx={{ mr: 1, fontWeight: 'medium' }}>שם הציור</Typography>
          <Box sx={{ flexGrow: 1, height: '1px', backgroundColor: '#e0e0e0', ml: 1 }} />
        </Box>
        <TextField
          fullWidth
          variant="outlined"
          value={drawingName}
          onChange={(e) => setDrawingName(e.target.value)}
          placeholder="הזן שם לציור"
          sx={{
            backgroundColor: '#f0f7ff',
            borderRadius: '8px',
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
            }
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <PaletteIcon sx={{ color: '#90c4e6' }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box sx={{ mb: 3 }} dir="rtl">
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Typography sx={{ mr: 1, fontWeight: 'medium' }}>טווח גילאים</Typography>
          <Box sx={{ flexGrow: 1, height: '1px', backgroundColor: '#e0e0e0', ml: 1 }} />
        </Box>
        <TextField
          fullWidth
          variant="outlined"
          value={ageGroup}
          onChange={(e) => setAgeGroup(e.target.value)}
          placeholder="למשל: 10-15"
          sx={{
            backgroundColor: '#f0f7ff',
            borderRadius: '8px',
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
            }
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <EmailIcon sx={{ color: '#90c4e6' }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box sx={{ mb: 3 }} dir="rtl">
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Typography sx={{ mr: 1, fontWeight: 'medium' }}>בחר רמה</Typography>
          <Box sx={{ flexGrow: 1, height: '1px', backgroundColor: '#e0e0e0', ml: 1 }} />
        </Box>
        <FormControl fullWidth>
          <Select
            value={difficulty}
            onChange={handleDifficultyChange}
            displayEmpty
            sx={{
              backgroundColor: '#f0f7ff',
              borderRadius: '8px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
              }
            }}
          >
            <MenuItem value="" disabled>
              <em>בחר רמה</em>
            </MenuItem>
            <MenuItem value="easy">קל</MenuItem>
            <MenuItem value="medium">בינוני</MenuItem>
            <MenuItem value="hard">קשה</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ mb: 3 }} dir="rtl">
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Typography sx={{ mr: 1, fontWeight: 'medium' }}>בחר קובץ</Typography>
          <Box sx={{ flexGrow: 1, height: '1px', backgroundColor: '#e0e0e0', ml: 1 }} />
        </Box>
        
        <Box sx={{ 
          border: '2px dashed #90c4e6', 
          borderRadius: '12px', 
          padding: '20px', 
          textAlign: 'center',
          backgroundColor: 'rgba(224, 242, 254, 0.4)',
          transition: 'all 0.3s',
          '&:hover': {
            backgroundColor: 'rgba(224, 242, 254, 0.7)',
            borderColor: '#4c8bf5'
          }
        }}>
          <input
            type="file"
            id="file-upload"
            style={{ display: 'none' }}
            onChange={handleFileChange}
            accept="image/png,application/pdf"
            disabled={uploading}
          />
          <label htmlFor="file-upload" style={{ cursor: 'pointer', display: 'block' }}>
            <InsertDriveFileIcon sx={{ fontSize: 48, color: '#4c8bf5', mb: 1 }} />
            <Typography variant="body1" sx={{ mb: 1, fontWeight: 'medium', color: '#4c8bf5' }}>
              גרור ושחרר או לחץ לבחירת קובץ
            </Typography>
            <Typography variant="body2" sx={{ color: '#666' }}>
              PNG, PDF (מקסימום 10MB)
            </Typography>
          </label>
          {file && (
            <Box sx={{ 
              mt: 2, 
              p: 2, 
              borderRadius: '8px', 
              backgroundColor: 'rgba(76, 139, 245, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <InsertDriveFileIcon sx={{ mr: 1, color: '#4c8bf5' }} />
              <Typography>
                {file.name} ({(file.size / 1024).toFixed(2)} KB)
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>הקובץ הועלה בהצלחה!</Alert>}
      <Snackbar
        open={saveSuccess}
        autoHideDuration={3000}
        onClose={() => setSaveSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" icon={<CheckCircleIcon fontSize="inherit" />}>
          התמונה נשמרה בהצלחה!
        </Alert>
      </Snackbar>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <StyledIconButton>
            <PaletteIcon />
          </StyledIconButton>
          <StyledIconButton>
            <EditIcon />
          </StyledIconButton>
          <StyledIconButton>
            <PaletteIcon />
          </StyledIconButton>
          <StyledIconButton>
            <InsertDriveFileIcon />
          </StyledIconButton>
        </Box>
      </Box>

      {/* כפתורים של העלאה ושמירה */}
      <Box sx={{ display: 'flex', gap: 2, mt: 3 }} dir="rtl">
        <Button
          fullWidth
          variant="contained"
          onClick={uploadFile}
          disabled={!file || uploading}
          sx={{
            borderRadius: '30px',
            padding: '12px',
            backgroundColor: '#4c8bf5',
            boxShadow: '0 4px 10px rgba(76, 139, 245, 0.3)',
            transition: 'all 0.3s',
            '&:hover': {
              backgroundColor: '#3b7ae4',
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 15px rgba(76, 139, 245, 0.4)',
            },
            '&.Mui-disabled': {
              backgroundColor: '#ccc',
            }
          }}
        >
          {uploading ? (
            <>
              <CircularProgress size={24} sx={{ mr: 1, color: 'white' }} />
              מעלה...
            </>
          ) : (
            <>
              <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
                <InsertDriveFileIcon sx={{ mr: 1 }} />
                העלאת קובץ
              </Box>
            </>
          )}
        </Button>

        <Button
          fullWidth
          variant="contained"
          onClick={saveImage}
          disabled={!file}
          sx={{
            borderRadius: '30px',
            padding: '12px',
            backgroundColor: '#43a047',
            boxShadow: '0 4px 10px rgba(67, 160, 71, 0.3)',
            transition: 'all 0.3s',
            '&:hover': {
              backgroundColor: '#2e7d32',
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 15px rgba(67, 160, 71, 0.4)',
            },
            '&.Mui-disabled': {
              backgroundColor: '#ccc',
            }
          }}
        >
          <>
            <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
              <SaveIcon sx={{ mr: 1 }} />
              שמירת תמונה
            </Box>
          </>
        </Button>
      </Box>
    </RoundedPaper>
  );
};

export default FileUploadForm;