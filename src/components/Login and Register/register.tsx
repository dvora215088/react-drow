import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { useAuth } from "../../context/AuthContext";
import { COLORS } from "../../COLORS";
import RegisterCard from "./RegisterCard";
import BackgroundElements from "./BackgroundElements";


const Register: React.FC = () => {
  const { register, error } = useAuth();
  const [, setAnimationComplete] = useState(false);

  // ערכת עיצוב עם הצבעים ישירות מהCOLORS
  const theme = createTheme({
    palette: {
      primary: {
        main: COLORS[1], // medium blue
        light: COLORS[0], // light blue
        dark: COLORS[2], // dark blue
      },
      secondary: {
        main: COLORS[11], // steel blue
        light: COLORS[9], // pale blue
        dark: COLORS[14], // blue-gray
      },
      background: {
        default: "#f5f9ff",
        paper: "#ffffff",
      },
      text: {
        primary: "#34495e", // כחול אפור כהה
        secondary: "#5d768a", // כחול אפור
      },
      success: {
        main: COLORS[1], // medium blue
      },
      grey: {
        100: "#f3f6fd",
        200: "#e8eef8",
        300: "#dde6f3",
        400: "#b3c5d7",
        500: "#90a4b7",
        600: "#607d9b",
        700: "#4a6585",
        800: "#34495e",
        900: "#243241",
      },
    },
    shape: {
      borderRadius: 12,
    },
    typography: {
      fontFamily: "Roboto, 'Segoe UI', Arial, sans-serif",
      h5: {
        fontWeight: 600,
      },
      button: {
        fontWeight: 600,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            fontWeight: 600,
            boxShadow: "none",
            "&:hover": {
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: "linear-gradient(to bottom right, #ffffff, #f7faff)",
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#dde6f3",
              },
              "&:hover fieldset": {
                borderColor: "#90a4b7",
              },
            },
          },
        },
      },
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          background: "#ffffff",
          position: "relative",
          overflow: "hidden",
          p: 2,
        }}
      >
        {/* רקע אנימציה */}
        <BackgroundElements />
        
        {/* טופס הרשמה */}
        <RegisterCard register={register} error={error} />
      </Box>
    </ThemeProvider>
  );
};

export default Register;