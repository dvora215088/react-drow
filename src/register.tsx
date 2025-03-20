import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

// Material UI Imports
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "@mui/material/Link";
import Fade from "@mui/material/Fade";
import Zoom from "@mui/material/Zoom";
import Slide from "@mui/material/Slide";
import Alert from "@mui/material/Alert";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { motion } from "framer-motion";

// Material Icons
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PersonIcon from '@mui/icons-material/Person';

// Logo import
import logo from "./assets/logo.png";

// Custom styled components
import { styled } from "@mui/material/styles";

const AnimatedButton = styled(Button)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "200%",
    height: "100%",
    background: `linear-gradient(90deg, 
      rgba(255,255,255,0) 0%, 
      rgba(255,255,255,0.2) 50%, 
      rgba(255,255,255,0) 100%)`,
    transform: "translateX(-100%)",
    animation: "shimmer 2.5s infinite",
  },
  "@keyframes shimmer": {
    "0%": {
      transform: "translateX(-100%)",
    },
    "100%": {
      transform: "translateX(100%)",
    },
  },
}));

const AnimatedTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    transition: "transform 0.3s, box-shadow 0.3s",
    "&:hover, &.Mui-focused": {
      transform: "translateY(-3px)",
      boxShadow: "0 4px 12px rgba(25, 118, 210, 0.15)",
    },
  },
}));

const Register: React.FC = () => {
  const { register, error } = useAuth();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [validationError, setValidationError] = useState("");
  animationComplete
  // Custom theme with blue color scheme
  const theme = createTheme({
    palette: {
      primary: {
        main: "#1976d2", // כחול בינוני
        light: "#42a5f5", // כחול בהיר
        dark: "#0d47a1", // כחול כהה
      },
      secondary: {
        main: "#5c6bc0", // indigo
        light: "#8e99f3", // indigo בהיר
        dark: "#26418f", // indigo כהה
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
        main: "#2196f3",
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

  useEffect(() => {
    // Check if passwords match whenever either password field changes
    if (confirmPassword) {
      setPasswordsMatch(password === confirmPassword);
    } else {
      setPasswordsMatch(true); // Don't show error when confirm password is empty
    }
  }, [password, confirmPassword]);

  const validateForm = () => {
    if (!firstName.trim()) {
      setValidationError("נא להזין שם פרטי");
      return false;
    }
    if (!lastName.trim()) {
      setValidationError("נא להזין שם משפחה");
      return false;
    }
    if (!email.trim()) {
      setValidationError("נא להזין כתובת אימייל");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setValidationError("נא להזין כתובת אימייל תקינה");
      return false;
    }
    if (password.length < 6) {
      setValidationError("הסיסמה חייבת להכיל לפחות 6 תווים");
      return false;
    }
    if (password !== confirmPassword) {
      setValidationError("הסיסמאות אינן תואמות");
      return false;
    }
    
    setValidationError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    try {
      const userData = { firstName, lastName, email, password };
      await register(userData);
      navigate("/login");
    } catch (err) {
      console.error("Registration failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  // פונקציה עזר לחישוב זוויות לאלמנטים אומנותיים
  const getRandomAngle = () => Math.floor(Math.random() * 360);

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
        {/* כתמי צבע מים - עדינים וצבעוניים על רקע לבן */}
        {[...Array(10)].map((_, i) => (
          <Box
            key={`watercolor-${i}`}
            component={motion.div}
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ 
              scale: [0.95, 1.05, 0.95],
              opacity: [0.04, 0.06, 0.04]
            }}
            transition={{ 
              duration: 10,
              repeat: Infinity,
              delay: i * 0.3
            }}
            sx={{
              position: "absolute",
              height: 90 + i * 15,
              width: 90 + i * 15,
              borderRadius: "50%",
              background: i % 10 === 0 
                ? "radial-gradient(circle, rgba(244, 143, 177, 0.15) 0%, transparent 80%)" // ורוד עדין
                : i % 10 === 1 
                ? "radial-gradient(circle, rgba(144, 202, 249, 0.15) 0%, transparent 80%)" // כחול בהיר עדין
                : i % 10 === 2
                ? "radial-gradient(circle, rgba(128, 222, 234, 0.15) 0%, transparent 80%)" // טורקיז עדין
                : i % 10 === 3
                ? "radial-gradient(circle, rgba(255, 241, 118, 0.15) 0%, transparent 80%)" // צהוב עדין
                : i % 10 === 4
                ? "radial-gradient(circle, rgba(165, 214, 167, 0.15) 0%, transparent 80%)" // ירוק בהיר עדין
                : i % 10 === 5
                ? "radial-gradient(circle, rgba(206, 147, 216, 0.15) 0%, transparent 80%)" // סגול עדין
                : i % 10 === 6
                ? "radial-gradient(circle, rgba(255, 171, 145, 0.15) 0%, transparent 80%)" // כתום עדין
                : i % 10 === 7
                ? "radial-gradient(circle, rgba(159, 168, 218, 0.15) 0%, transparent 80%)" // אינדיגו עדין
                : i % 10 === 8
                ? "radial-gradient(circle, rgba(129, 212, 250, 0.15) 0%, transparent 80%)" // תכלת עדין
                : "radial-gradient(circle, rgba(179, 157, 219, 0.15) 0%, transparent 80%)", // לבנדר עדין
              top: `${5 + i * 9}%`,
              left: i % 2 === 0 ? `${75 + i * 2}%` : `${3 + i * 3}%`,
              filter: "blur(20px)",
              zIndex: 0,
            }}
          />
        ))}
        
        {/* אלמנטים אומנותיים מתנועעים עדינים וקלים */}
        {[...Array(6)].map((_, i) => (
          <Box
            key={`color-splash-${i}`}
            component={motion.div}
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              opacity: 0
            }}
            animate={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              opacity: [0.03, 0.05, 0.03],
              rotate: getRandomAngle()
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 20 + i * 3, 
              ease: "easeInOut",
              delay: i * 0.6 
            }}
            sx={{
              position: "absolute",
              height: 50 + i * 20,
              width: 50 + i * 20,
              borderRadius: i % 3 === 0 ? "50%" : i % 3 === 1 ? "30% 70% 70% 30% / 30% 30% 70% 70%" : "50% 20% 50% 80% / 25% 80% 20% 75%",
              background: i % 6 === 0 
                ? "rgba(233, 30, 99, 0.07)" // ורוד עדין
                : i % 6 === 1 
                ? "rgba(33, 150, 243, 0.07)" // כחול עדין
                : i % 6 === 2
                ? "rgba(0, 188, 212, 0.07)" // טורקיז עדין
                : i % 6 === 3
                ? "rgba(255, 235, 59, 0.07)" // צהוב עדין
                : i % 6 === 4
                ? "rgba(76, 175, 80, 0.07)" // ירוק עדין
                : "rgba(156, 39, 176, 0.07)", // סגול עדין
              filter: "blur(15px)",
              zIndex: 0,
            }}
          />
        ))}

        {/* קווי מכחול צבעוניים ועדינים */}
        {[...Array(8)].map((_, i) => (
          <Box
            key={`paint-stroke-${i}`}
            component={motion.div}
            initial={{ opacity: 0, x: -50 }}
            animate={{ 
              opacity: [0.04, 0.08, 0.04],
              x: 0,
              rotate: i % 2 === 0 ? [0, 2, 0] : [0, -2, 0]
            }}
            transition={{ 
              duration: 15,
              repeat: Infinity,
              repeatType: "reverse",
              delay: i * 0.5
            }}
            sx={{
              position: "absolute",
              height: 3 + i * 1.2,
              width: 120 + i * 30,
              borderRadius: "30px",
              background: i % 8 === 0 
                ? "rgba(244, 67, 54, 0.3)" // אדום עדין
                : i % 8 === 1 
                ? "rgba(33, 150, 243, 0.3)" // כחול עדין
                : i % 8 === 2
                ? "rgba(255, 193, 7, 0.3)" // צהוב עדין
                : i % 8 === 3
                ? "rgba(76, 175, 80, 0.3)" // ירוק עדין
                : i % 8 === 4
                ? "rgba(156, 39, 176, 0.3)" // סגול עדין
                : i % 8 === 5
                ? "rgba(255, 152, 0, 0.3)" // כתום עדין
                : i % 8 === 6
                ? "rgba(0, 188, 212, 0.3)" // טורקיז עדין
                : "rgba(233, 30, 99, 0.3)", // ורוד עדין
              boxShadow: "0 0 8px rgba(0, 0, 0, 0.05)",
              top: `${10 + i * 10}%`,
              left: i % 2 === 0 ? "5%" : "auto",
              right: i % 2 === 0 ? "auto" : "5%",
              transform: `rotate(${(i % 2 === 0 ? 1 : -1) * (20 + i * 4)}deg)`,
              zIndex: 0,
            }}
          />
        ))}

        <Fade in timeout={1000}>
          <Card
            component={motion.div}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            sx={{
              maxWidth: 450,
              width: "100%",
              boxShadow: "0 8px 30px rgba(0, 0, 0, 0.07)",
              overflow: "visible",
              position: "relative",
              borderRadius: 3,
              zIndex: 1,
              background: "#ffffff",
            }}
          >
            {/* לוגו מעוצב */}
            <Box
              sx={{
                position: "absolute",
                top: -34,
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 2,
              }}
            >
              <Zoom in timeout={1000}>
                <Box
                  sx={{
                    width: 68,
                    height: 68,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#ffffff",
                    boxShadow: "0 4px 20px rgba(25, 118, 210, 0.25)",
                    padding: 1,
                    background: "#ffffff",
                  }}
                >
                  <Box
                    component="img"
                    src={logo}
                    alt="Logo"
                    sx={{
                      width: "80%",
                      height: "80%",
                      objectFit: "contain",
                    }}
                  />
                </Box>
              </Zoom>
            </Box>

            {/* האלמנטים הקטנים צבעוניים בכרטיס */}
            <Box
              component={motion.div}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, duration: 0.4 }}
              sx={{
                position: "absolute",
                top: 20,
                left: 20,
                width: 15,
                height: 15,
                borderRadius: "50%",
                backgroundColor: "#42a5f5",
                opacity: 0.7,
              }}
            />
            <Box
              component={motion.div}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.1, duration: 0.4 }}
              sx={{
                position: "absolute",
                top: 15,
                left: 40,
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: "#5c6bc0",
                opacity: 0.7,
              }}
            />
            <Box
              component={motion.div}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.2, duration: 0.4 }}
              sx={{
                position: "absolute",
                top: 30,
                left: 55,
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: "#2196f3",
                opacity: 0.7,
              }}
            />

            {/* אלמנטים בצד ימין */}
            <Box
              component={motion.div}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, duration: 0.4 }}
              sx={{
                position: "absolute",
                top: 15,
                right: 25,
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: "#5c6bc0",
                opacity: 0.7,
              }}
            />
            <Box
              component={motion.div}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.1, duration: 0.4 }}
              sx={{
                position: "absolute",
                top: 30,
                right: 40,
                width: 15,
                height: 15,
                borderRadius: "50%",
                backgroundColor: "#42a5f5",
                opacity: 0.7,
              }}
            />
            <Box
              component={motion.div}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.2, duration: 0.4 }}
              sx={{
                position: "absolute",
                top: 20,
                right: 60,
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "#1976d2",
                opacity: 0.7,
              }}
            />

            <CardContent sx={{ pt: 5, pb: 4, px: 4, mt: 2 }}>
              <Box sx={{ mb: 3, mt: 2, textAlign: "center" }}>
                <Slide direction="down" in timeout={800}>
                  <Typography
                    variant="h5"
                    component="h1"
                    sx={{
                      textAlign: "center",
                      mb: 1,
                      fontWeight: 600,
                      color: "text.primary",
                      dir: "rtl",
                    }}
                  >
                    הרשמה
                  </Typography>
                </Slide>
                <Fade in timeout={1200}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ textAlign: "center", dir: "rtl" }}
                  >
                    צור חשבון חדש כדי להתחיל
                  </Typography>
                </Fade>
              </Box>

              {(error || validationError) && (
                <Alert 
                  severity="error" 
                  sx={{ 
                    mb: 3, 
                    dir: "rtl",
                    borderRadius: 2,
                    animation: "shake 0.5s",
                    "@keyframes shake": {
                      "0%, 100%": { transform: "translateX(0)" },
                      "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-5px)" },
                      "20%, 40%, 60%, 80%": { transform: "translateX(5px)" },
                    }
                  }}
                >
                  {validationError || error}
                </Alert>
              )}

              <Box 
                component="form" 
                onSubmit={handleSubmit} 
                sx={{ dir: "rtl" }}
              >
                {/* Row for first name and last name */}
                <Box sx={{ display: "flex", gap: 2, mb: 1 }}>
                  <Fade in timeout={1000} style={{ transitionDelay: "100ms" }}>
                    <Box sx={{ flex: 1 }}>
                      <AnimatedTextField
                        fullWidth
                        label="שם פרטי"
                        variant="outlined"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonIcon color="primary" />
                            </InputAdornment>
                          ),
                        }}
                        sx={{ direction: "rtl" }}
                      />
                    </Box>
                  </Fade>

                  <Fade in timeout={1000} style={{ transitionDelay: "200ms" }}>
                    <Box sx={{ flex: 1 }}>
                      <AnimatedTextField
                        fullWidth
                        label="שם משפחה"
                        variant="outlined"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonIcon color="primary" />
                            </InputAdornment>
                          ),
                        }}
                        sx={{ direction: "rtl" }}
                      />
                    </Box>
                  </Fade>
                </Box>

                <Fade in timeout={1000} style={{ transitionDelay: "300ms" }}>
                  <Box>
                    <AnimatedTextField
                      fullWidth
                      label="אימייל"
                      variant="outlined"
                      type="email"
                      margin="normal"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon color="primary" />
                          </InputAdornment>
                        ),
                      }}
                      sx={{ mb: 2, direction: "rtl" }}
                    />
                  </Box>
                </Fade>

                <Fade in timeout={1000} style={{ transitionDelay: "400ms" }}>
                  <Box>
                    <AnimatedTextField
                      fullWidth
                      label="סיסמה"
                      variant="outlined"
                      type={showPassword ? "text" : "password"}
                      margin="normal"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon color="primary" />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleTogglePassword}
                              edge="end"
                              sx={{
                                transition: "all 0.3s",
                                "&:hover": {
                                  background: "rgba(25, 118, 210, 0.08)",
                                },
                              }}
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      sx={{ mb: 2, direction: "rtl" }}
                    />
                  </Box>
                </Fade>

                <Fade in timeout={1000} style={{ transitionDelay: "500ms" }}>
                  <Box>
                    <AnimatedTextField
                      fullWidth
                      label="אימות סיסמה"
                      variant="outlined"
                      type={showPassword ? "text" : "password"}
                      margin="normal"
                      required
                      error={!passwordsMatch}
                      helperText={!passwordsMatch ? "הסיסמאות אינן תואמות" : ""}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon color="primary" />
                          </InputAdornment>
                        ),
                      }}
                      sx={{ mb: 3, direction: "rtl" }}
                    />
                  </Box>
                </Fade>

                <Fade in timeout={1000} style={{ transitionDelay: "600ms" }}>
                  <Box>
                    <AnimatedButton
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      size="large"
                      disabled={loading}
                      sx={{
                        py: 1.5,
                        mb: 2,
                        background: "linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)",
                        boxShadow: "0 6px 20px rgba(25, 118, 210, 0.3)",
                        borderRadius: 3,
                        transition: "transform 0.2s ease-in-out",
                        "&:hover": {
                          transform: "scale(1.03)",
                        },
                        "&:active": {
                          transform: "scale(0.98)",
                        }
                      }}
                    >
                      {loading ? (
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
                          מבצע הרשמה...
                        </Box>
                      ) : (
                        "הירשם"
                      )}
                    </AnimatedButton>
                  </Box>
                </Fade>

                <Fade in timeout={1000} style={{ transitionDelay: "700ms" }}>
                  <Box sx={{ textAlign: "center", mt: 2 }}>
                    <Typography 
                      variant="body2" 
                      component="span"
                      sx={{ color: "text.secondary", dir: "rtl" }}
                    >
                      כבר יש לך חשבון?{" "}
                    </Typography>
                    <Link 
                      href="/login" 
                      underline="none"
                      sx={{
                        color: "primary.main",
                        fontWeight: 500,
                        position: "relative",
                        transition: "all 0.3s",
                        "&:hover": {
                          color: "primary.dark",
                          "&::after": {
                            width: "100%",
                          },
                        },
                        "&::after": {
                          content: '""',
                          position: "absolute",
                          bottom: -1,
                          left: 0,
                          width: 0,
                          height: 1,
                          backgroundColor: "primary.dark",
                          transition: "width 0.3s",
                        },
                      }}
                    >
                     Copyהתחבר
</Link>
                  </Box>
                </Fade>
              </Box>
            </CardContent>
          </Card>
        </Fade>
      </Box>
    </ThemeProvider>
  );
};

export default Register;