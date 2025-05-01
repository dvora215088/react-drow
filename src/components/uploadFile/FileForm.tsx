// import React from 'react';
// import { 
//   Box, 
//   Typography, 
//   TextField, 
//   MenuItem, 
  
//   Grid,
//   InputAdornment,
//   Fade
// } from '@mui/material';
// import { styled } from '@mui/system';
// import { COLORS } from '../../COLORS';
// import ArtTrackIcon from '@mui/icons-material/ArtTrack';
// import AccessTimeIcon from '@mui/icons-material/AccessTime';
// import SchoolIcon from '@mui/icons-material/School';

// const HeaderTypography = styled(Typography)(() => ({
//   color: COLORS[2],
//   fontWeight: 700,
//   marginBottom: '1.5rem',
//   position: 'relative',
//   display: 'inline-block',
//   '&::after': {
//     content: '""',
//     position: 'absolute',
//     bottom: '-10px',
//     right: 0,
//     left: 0,
//     height: '3px',
//     background: `linear-gradient(90deg, transparent, ${COLORS[2]}, transparent)`,
//     borderRadius: '2px',
//   }
// }));

// const StyledTextField = styled(TextField)(() => ({
//   '& .MuiOutlinedInput-root': {
//     '&:hover fieldset': {
//       borderColor: COLORS[9],
//     },
//     '&.Mui-focused fieldset': {
//       borderColor: COLORS[2],
//       borderWidth: '2px',
//     },
//   },
//   '& .MuiInputLabel-root.Mui-focused': {
//     color: COLORS[2],
//   },
//   marginBottom: '1rem',
//   direction: 'rtl',
// }));

// interface FileFormProps {
//   drawingName: string;
//   setDrawingName: (value: string) => void;
//   ageGroup: string;
//   setAgeGroup: (value: string) => void;
//   difficulty: string;
//   setDifficulty: (value: string) => void;
//   disabled: boolean;
// }

// const FileForm: React.FC<FileFormProps> = ({
//   drawingName,
//   setDrawingName,
//   ageGroup,
//   setAgeGroup,
//   difficulty,
//   setDifficulty,
//   disabled
// }) => {
//   const difficultyOptions = [
//     { value: 'easy', label: 'קל' },
//     { value: 'medium', label: 'בינוני' },
//     { value: 'hard', label: 'מאתגר' },
//   ];

//   return (
//     <Fade in={true} timeout={800}>
//       <Box
//         sx={{
//           px: { xs: 2, md: 4 },
//           py: 4,
//           backgroundColor: 'transparent',
//           borderRadius: '16px',
//           position: 'relative',
//           overflow: 'hidden',
//         }}
//       >
//         <Box textAlign="center" mb={4}>
//           <HeaderTypography variant="h4" align="center">
//             <ArtTrackIcon sx={{ fontSize: 28, mr: 1, verticalAlign: 'middle' }} />
//             פרטי הציור
//           </HeaderTypography>
//         </Box>

//         <Box>
//           <StyledTextField
//             fullWidth
//             label="שם הציור"
//             variant="outlined"
//             value={drawingName}
//             onChange={(e) => setDrawingName(e.target.value)}
//             placeholder="למשל: נוף כפרי בשקיעה"
//             disabled={disabled}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <Box 
//                     sx={{ 
//                       width: 12, 
//                       height: 12, 
//                       borderRadius: '50%', 
//                       backgroundColor: COLORS[2],
//                       mr: 1 
//                     }} 
//                   />
//                 </InputAdornment>
//               ),
//             }}
//           />

//           <Grid container spacing={3} sx={{ mt: 1 }}>
//             <Grid item xs={12} md={6}>
//               <StyledTextField
//                 fullWidth
//                 label="טווח גילאים"
//                 variant="outlined"
//                 value={ageGroup}
//                 onChange={(e) => setAgeGroup(e.target.value)}
//                 placeholder="למשל: 10-15"
//                 disabled={disabled}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <AccessTimeIcon sx={{ color: COLORS[9] }} />
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <StyledTextField
//                 select
//                 fullWidth
//                 label="רמת קושי"
//                 variant="outlined"
//                 value={difficulty}
//                 onChange={(e) => setDifficulty(e.target.value)}
//                 disabled={disabled}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <SchoolIcon sx={{ color: COLORS[9] }} />
//                     </InputAdornment>
//                   ),
//                 }}
//               >
//                 <MenuItem value="" disabled>
//                   בחר רמת קושי
//                 </MenuItem>
//                 {difficultyOptions.map((option) => (
//                   <MenuItem key={option.value} value={option.value}>
//                     {option.label}
//                   </MenuItem>
//                 ))}
//               </StyledTextField>
//             </Grid>
//           </Grid>
//         </Box>

//         {/* אלמנט דקורטיבי עדין */}
//         <Box 
//           sx={{ 
//             position: 'absolute', 
//             bottom: -50, 
//             right: -50, 
//             width: 200, 
//             height: 200, 
//             borderRadius: '50%', 
//             background: `linear-gradient(45deg, ${COLORS[2]}10, ${COLORS[9]}20)`,
//             zIndex: 0 
//           }} 
//         />
//       </Box>
//     </Fade>
//   );
// };

// export default FileForm;
