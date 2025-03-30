import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
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
import PaletteIcon from '@mui/icons-material/Palette';
import BrushIcon from '@mui/icons-material/Brush';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import FormatPaintIcon from '@mui/icons-material/FormatPaint';


// לוגו
import logo from "../../assets/logo.png";
import { COLORS } from "../../COLORS";
import { AnimatedButton, AnimatedTextField } from "./AnimatedButton";

interface LoginCardProps {
  login: (credentials: { email: string; password: string }) => Promise<void>;
  error: string | null;
}

const LoginCard: React.FC<LoginCardProps> = ({ login, error }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login({ email, password });
      navigate("/categories");
    } catch (err) {
      console.error("Login failed:", err);
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
          maxWidth: 420,
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
          <Box sx={{ mb: 4, mt: 2, textAlign: "center" }}>
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
                התחברות
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
                ברוכים הבאים! אנא הזינו את פרטי הכניסה שלכם
              </Typography>
            </Fade>
          </Box>

          {error && (
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
              {error}
            </Alert>
          )}

          <Box 
            component="form" 
            onSubmit={handleSubmit} 
            sx={{ dir: "rtl" }}
          >
            <Fade in timeout={1000} style={{ transitionDelay: "200ms" }}>
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
                        <EmailIcon sx={{ color: COLORS[1] }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ 
                    mb: 2.5, 
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
                    mb: 1, 
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
                    mb: 2.5,
                    background: `linear-gradient(45deg, ${COLORS[1]} 30%, ${COLORS[0]} 90%)`,
                    boxShadow: `0 6px 20px ${COLORS[1]}50`,
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
                      מתחבר...
                    </Box>
                  ) : (
                    "התחבר"
                  )}
                </AnimatedButton>
              </Box>
            </Fade>

            <Box sx={{ mt: 3, display: "flex", justifyContent: "center", opacity: 0.7 }}>
              <Box
                component={motion.div}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                sx={{ mx: 1 }}
              >
                <PaletteIcon sx={{ color: COLORS[11] }} fontSize="small" />
              </Box>
              <Box
                component={motion.div}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
                sx={{ mx: 1 }}
              >
                <BrushIcon sx={{ color: COLORS[1] }} fontSize="small" />
              </Box>
              <Box
                component={motion.div}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
                sx={{ mx: 1 }}
              >
                <ColorLensIcon sx={{ color: COLORS[11] }} fontSize="small" />
              </Box>
              <Box
                component={motion.div}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 14, ease: "linear" }}
                sx={{ mx: 1 }}
              >
                <FormatPaintIcon sx={{ color: COLORS[1] }} fontSize="small" />
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Fade>
  );
};

export default LoginCard;