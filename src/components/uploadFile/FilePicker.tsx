// import React, { ChangeEvent } from 'react';
// import {
//   Box,
//   Typography,
//   Button,
//   CircularProgress,
//   Chip,
//   styled
// } from '@mui/material';
// import { COLORS } from '../../COLORS';
// import { Upload } from 'lucide-react';
// import ImageIcon from '@mui/icons-material/Image';
// import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
// import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
// import DeleteIcon from '@mui/icons-material/Delete';
// import RefreshCwIcon from '@mui/icons-material/Refresh';

// const DropZone = styled(Box)<{ hasFile: boolean }>(({ hasFile }) => ({
//   padding: '2rem',
//   borderRadius: '16px',
//   border: `2px dashed ${hasFile ? COLORS[1] : COLORS[9]}`,
//   backgroundColor: hasFile ? 'rgba(130, 177, 217, 0.1)' : 'rgba(181, 205, 227, 0.05)',
//   textAlign: 'center',
//   transition: '0.3s ease',
// }));

// const FileInfoBox = styled(Box)(() => ({
//   backgroundColor: 'rgba(130, 177, 217, 0.2)',
//   padding: '1rem 1.5rem',
//   borderRadius: '10px',
//   display: 'inline-block',
// }));

// interface FilePickerProps {
//   handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
//   file: File | null;
//   uploading: boolean;
//   removeFile: () => void;
// }

// const FilePicker: React.FC<FilePickerProps> = ({
//   handleFileChange,
//   file,
//   uploading,
//   removeFile
// }) => {
//   return (
//     <Box>
//       <Typography variant="h5" fontWeight={700} mb={3} color={COLORS[2]} textAlign="center">
//         בחירת קובץ ציור
//       </Typography>

//       <DropZone hasFile={!!file}>
//         {uploading && (
//           <Box sx={{ mb: 2 }}>
//             <CircularProgress sx={{ color: COLORS[1] }} />
//           </Box>
//         )}

//         <Box sx={{ mb: 2 }}>
//           {file ? (
//             <InsertDriveFileIcon sx={{ fontSize: 64, color: COLORS[1] }} />
//           ) : (
//             <Upload size={64} color={COLORS[1]} strokeWidth={1.5} />
//           )}
//         </Box>

//         <input
//           type="file"
//           id="file-upload"
//           onChange={handleFileChange}
//           style={{ display: 'none' }}
//           accept="image/png,application/pdf"
//           disabled={uploading}
//         />

//         {!file ? (
//           <>
//             <Typography variant="body1" mb={2} color={COLORS[2]} fontWeight={500}>
//               גרור קובץ לכאן או לחץ לבחירה
//             </Typography>

//             <label htmlFor="file-upload">
//               <Button
//                 variant="contained"
//                 component="span"
//                 sx={{
//                   backgroundColor: COLORS[1],
//                   color: 'white',
//                   fontWeight: 600,
//                   px: 4,
//                   py: 1.5,
//                   borderRadius: '10px',
//                   boxShadow: '0 4px 14px rgba(85, 152, 197, 0.3)',
//                   '&:hover': {
//                     backgroundColor: COLORS[2],
//                   },
//                 }}
//                 startIcon={<Upload size={18} />}
//               >
//                 בחר קובץ
//               </Button>
//             </label>

//             <Box mt={3}>
//               <Chip icon={<ImageIcon />} label="PNG" sx={{ mx: 1 }} />
//               <Chip icon={<PictureAsPdfIcon />} label="PDF" sx={{ mx: 1 }} />
//             </Box>
//           </>
//         ) : (
//           <>
//             <FileInfoBox>
//               <Typography fontWeight={600} color={COLORS[2]}>
//                 {file.name}
//               </Typography>
//               <Typography variant="body2" color={COLORS[14]}>
//                 {(file.size / 1024).toFixed(2)} KB
//               </Typography>
//             </FileInfoBox>

//             <Box mt={3}>
//               <label htmlFor="file-upload">
//                 <Button
//                   variant="outlined"
//                   component="span"
//                   sx={{
//                     mx: 1,
//                     borderColor: COLORS[9],
//                     color: COLORS[2],
//                     backgroundColor: 'rgba(130, 177, 217, 0.1)',
//                     '&:hover': {
//                       backgroundColor: 'rgba(130, 177, 217, 0.2)',
//                       borderColor: COLORS[2],
//                     },
//                   }}
//                   startIcon={<RefreshCwIcon />}
//                 >
//                   החלף קובץ
//                 </Button>
//               </label>

//               <Button
//                 variant="outlined"
//                 onClick={removeFile}
//                 disabled={uploading}
//                 sx={{
//                   mx: 1,
//                   borderColor: COLORS[6],
//                   color: COLORS[8],
//                   backgroundColor: 'rgba(208, 208, 208, 0.2)',
//                   '&:hover': {
//                     backgroundColor: 'rgba(208, 208, 208, 0.3)',
//                     borderColor: COLORS[8],
//                   },
//                 }}
//                 startIcon={<DeleteIcon />}
//               >
//                 הסר
//               </Button>
//             </Box>
//           </>
//         )}
//       </DropZone>
//     </Box>
//   );
// };

// export default FilePicker;
