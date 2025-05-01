// import React from 'react';
// import {
//   Box,
//   Typography,
//   LinearProgress,
//   Alert,
//   AlertTitle,
//   Fade,
//   styled
// } from '@mui/material';
// import { COLORS } from '../../COLORS';
// import CloudDoneIcon from '@mui/icons-material/CloudDone';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

// // Container כללי
// const StatusContainer = styled(Box)(() => ({
//   position: 'relative',
// }));

// // קופסה של progress
// const ProgressContainer = styled(Box)(() => ({
//   padding: '1.5rem',
//   borderRadius: '16px',
//   backgroundColor: 'rgba(237, 242, 247, 0.5)',
//   border: '1px solid rgba(226, 232, 240, 0.8)',
//   marginBottom: '1rem',
// }));

// // פס טעינה מותאם
// const StyledLinearProgress = styled(LinearProgress)(() => ({
//   height: 8,
//   borderRadius: 4,
//   backgroundColor: 'rgba(226, 232, 240, 0.8)',
//   '& .MuiLinearProgress-bar': {
//     borderRadius: 4,
//   },
// }));

// // התראות (שגיאה/הצלחה)
// const StyledAlert = styled(Alert)(() => ({
//   borderRadius: '12px',
//   padding: '16px',
//   alignItems: 'flex-start',
//   direction: 'rtl',
//   '& .MuiAlert-icon': {
//     marginRight: 0,
//     marginLeft: '12px',
//     padding: '2px',
//   },
// }));

// // פונקציית צבע לפי התקדמות
// const getProgressColor = (progress: number) => {
//   if (progress < 30) return COLORS[0];
//   if (progress < 70) return COLORS[1];
//   if (progress === 100) return COLORS[4];
//   return COLORS[2];
// };

// interface UploadStatusProps {
//   error: string;
//   success: boolean;
//   progress: number;
//   uploading: boolean;
// }

// const UploadStatus: React.FC<UploadStatusProps> = ({
//   error,
//   success,
//   progress,
//   uploading
// }) => {
//   return (
//     <StatusContainer>
//       {uploading && (
//         <Fade in={uploading} timeout={500}>
//           <ProgressContainer>
//             <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//               <Box display="flex" alignItems="center">
//                 <CloudUploadIcon sx={{ color: COLORS[1], mr: 1 }} />
//                 <Typography variant="body1" fontWeight={600} sx={{ color: COLORS[14] }}>
//                   מעלה את הקובץ...
//                 </Typography>
//               </Box>
//               <Typography variant="body1" fontWeight={700} sx={{ color: COLORS[1] }}>
//                 {progress}%
//               </Typography>
//             </Box>

//             <StyledLinearProgress
//               variant="determinate"
//               value={progress}
//               sx={{
//                 '& .MuiLinearProgress-bar': {
//                   backgroundColor: getProgressColor(progress),
//                   transition: 'all 0.3s ease-out',
//                 },
//               }}
//             />

//             <Box display="flex" justifyContent="space-between" mt={1}>
//               <Typography variant="caption" sx={{ color: progress >= 25 ? COLORS[2] : COLORS[8] }}>
//                 הכנה
//               </Typography>
//               <Typography variant="caption" sx={{ color: progress >= 50 ? COLORS[2] : COLORS[8] }}>
//                 העלאה
//               </Typography>
//               <Typography variant="caption" sx={{ color: progress >= 75 ? COLORS[2] : COLORS[8] }}>
//                 עיבוד
//               </Typography>
//               <Typography variant="caption" sx={{ color: progress === 100 ? COLORS[2] : COLORS[8] }}>
//                 סיום
//               </Typography>
//             </Box>
//           </ProgressContainer>
//         </Fade>
//       )}

//       {/* שגיאה */}
//       {error && (
//         <Fade in={!!error} timeout={500}>
//           <StyledAlert
//             severity="error"
//             icon={<ErrorOutlineIcon />}
//             sx={{
//               backgroundColor: 'rgba(254, 226, 226, 0.6)',
//               borderColor: 'rgba(239, 68, 68, 0.2)',
//               '& .MuiAlert-icon': { color: '#E74C3C' }
//             }}
//           >
//             <AlertTitle sx={{ fontWeight: 700, mb: 0.5 }}>שגיאה בהעלאה</AlertTitle>
//             <Typography variant="body2" sx={{ color: '#B91C1C' }}>
//               {error}
//             </Typography>
//           </StyledAlert>
//         </Fade>
//       )}

//       {/* הצלחה */}
//       {success && (
//         <Fade in={success} timeout={500}>
//           <StyledAlert
//             severity="success"
//             icon={<CloudDoneIcon />}
//             sx={{
//               backgroundColor: 'rgba(236, 253, 245, 0.6)',
//               borderColor: 'rgba(110, 231, 183, 0.3)',
//               '& .MuiAlert-icon': { color: COLORS[4] }
//             }}
//           >
//             <AlertTitle sx={{ fontWeight: 700, mb: 0.5, color: COLORS[5] }}>
//               העלאה הושלמה בהצלחה
//             </AlertTitle>
//             <Typography variant="body2" sx={{ color: COLORS[4] }}>
//               הציור נוסף למערכת ויוצג בקרוב בגלריה.
//             </Typography>
//           </StyledAlert>
//         </Fade>
//       )}

//       {/* רקע דקורטיבי קטן */}
//       {(uploading || success || error) && (
//         <Box
//           sx={{
//             position: 'absolute',
//             top: -20,
//             left: -20,
//             width: 80,
//             height: 80,
//             borderRadius: '50%',
//             background: `linear-gradient(45deg, ${COLORS[9]}10, ${COLORS[2]}20)`,
//             filter: 'blur(20px)',
//             zIndex: -1
//           }}
//         />
//       )}
//     </StatusContainer>
//   );
// };

// export default UploadStatus;
