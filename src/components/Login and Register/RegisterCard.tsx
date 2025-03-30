import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "@mui/material/Link";
import Fade from "@mui/material/Fade";
import Zoom from "@mui/material/Zoom";
import Slide from "@mui/material/Slide";
import Alert from "@mui/material/Alert";
import { motion } from "framer-motion";

// Material Icons
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PersonIcon from '@mui/icons-material/Person';


// לוגו
import logo from "../../assets/logo.png";
import { COLORS } from "../../COLORS";
import { AnimatedButton, AnimatedTextField } from "./AnimatedButton";

interface RegisterCardProps {
  register: (userData: { firstName: string; lastName: string; email: string; password: string }) => Promise<void>;
  error: string | null;
}

const RegisterCard: React.FC<RegisterCardProps> = ({ register, error }) => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [validationError, setValidationError] = useState("");

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

  return (
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
          backgroundImage: "linear-gradient(to bottom right, #ffffff, #f7faff)",
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
                boxShadow: `0 4px 20px ${COLORS[1]}40`,
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
            backgroundColor: COLORS[0],
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
            backgroundColor: COLORS[11],
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
            backgroundColor: COLORS[1],
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
            backgroundColor: COLORS[11],
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
            backgroundColor: COLORS[0],
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
            backgroundColor: COLORS[1],
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
                  color: "#34495e",
                  dir: "rtl",
                }}
              >
                הרשמה
              </Typography>
            </Slide>
            <Fade in timeout={1200}>
              <Typography
                variant="body2"
                sx={{ 
                  textAlign: "center", 
                  dir: "rtl",
                  color: "#5d768a" 
                }}
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
                    onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setFirstName(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon sx={{ color: COLORS[1] }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ 
                      direction: "rtl",
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#dde6f3",
                        },
                        "&:hover fieldset": {
                          borderColor: "#90a4b7",
                        },
                      },
                    }}
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
                    onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setLastName(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon sx={{ color: COLORS[1] }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ 
                      direction: "rtl",
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#dde6f3",
                        },
                        "&:hover fieldset": {
                          borderColor: "#90a4b7",
                        },
                      },
                    }}
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
                  onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setEmail(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon sx={{ color: COLORS[1] }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ 
                    mb: 2, 
                    direction: "rtl",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#dde6f3",
                      },
                      "&:hover fieldset": {
                        borderColor: "#90a4b7",
                      },
                    },
                  }}
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
                  onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setPassword(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon sx={{ color: COLORS[1] }} />
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
                              background: `${COLORS[1]}14`,
                            },
                          }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ 
                    mb: 2, 
                    direction: "rtl",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#dde6f3",
                      },
                      "&:hover fieldset": {
                        borderColor: "#90a4b7",
                      },
                    },
                  }}
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
                  onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setConfirmPassword(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon sx={{ color: COLORS[1] }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ 
                    mb: 3, 
                    direction: "rtl",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#dde6f3",
                      },
                      "&:hover fieldset": {
                        borderColor: "#90a4b7",
                      },
                    },
                  }}
                />
              </Box>
            </Fade>

            <Fade in timeout={1000} style={{ transitionDelay: "600ms" }}>
              <Box>
                <AnimatedButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading}
                  sx={{
                    py: 1.5,
                    mb: 2,
                    background: `linear-gradient(45deg, ${COLORS[1]} 30%, ${COLORS[0]} 90%)`,
                    boxShadow: `0 6px 20px ${COLORS[1]}40`,
                    borderRadius: 3,
                    transition: "transform 0.2s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.03)",
                    },
                    "&:active": {
                      transform: "scale(0.98)",
                    },
                    textTransform: "none",
                    fontWeight: 600,
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
                  sx={{ color: "#5d768a", dir: "rtl" }}
                >
                  כבר יש לך חשבון?{" "}
                </Typography>
                <Link 
                  href="/login" 
                  underline="none"
                  sx={{
                    color: COLORS[1],
                    fontWeight: 500,
                    position: "relative",
                    transition: "all 0.3s",
                    "&:hover": {
                      color: COLORS[2],
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
                      backgroundColor: COLORS[2],
                      transition: "width 0.3s",
                    },
                  }}
                >
                  התחבר
                </Link>
              </Box>
            </Fade>
          </Box>
        </CardContent>
      </Card>
    </Fade>
  );
};

export default RegisterCard;