import React, { useState } from "react";
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
import Alert from "@mui/material/Alert";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// Material Icons
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Login: React.FC = () => {
  const { login, error } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Custom theme with teal/blue/gray color scheme
  const theme = createTheme({
    palette: {
      primary: {
        main: "#26a69a", // teal
      },
      secondary: {
        main: "#4fc3f7", // light blue
      },
      background: {
        default: "#f5f5f5",
        paper: "#ffffff",
      },
      text: {
        primary: "#455a64",
        secondary: "#78909c",
      },
    },
    shape: {
      borderRadius: 8,
    },
    typography: {
      fontFamily: "Roboto, 'Segoe UI', Arial, sans-serif",
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            fontWeight: 500,
          },
        },
      },
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login({ email, password });
      navigate("/dashboard");
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
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          bgcolor: "background.default",
          p: 2,
        }}
      >
        <Fade in timeout={800}>
          <Card
            sx={{
              maxWidth: 380,
              width: "100%",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.05)",
              overflow: "visible",
              position: "relative",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: -24,
                left: "50%",
                transform: "translateX(-50%)",
                bgcolor: "primary.main",
                color: "white",
                borderRadius: "50%",
                width: 56,
                height: 56,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 12px rgba(38, 166, 154, 0.4)",
              }}
            >
              <AccountCircleIcon fontSize="large" />
            </Box>

            <CardContent sx={{ pt: 5, pb: 3, px: 3, mt: 2 }}>
              <Typography
                variant="h5"
                component="h1"
                sx={{ textAlign: "center", mb: 3, fontWeight: 500, color: "text.primary", dir: "rtl" }}
              >
                התחברות
              </Typography>

              {error && (
                <Alert severity="error" sx={{ mb: 2, dir: "rtl" }}>
                  {error}
                </Alert>
              )}

              <Box component="form" onSubmit={handleSubmit} sx={{ dir: "rtl" }}>
                <TextField
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

                <TextField
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
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mb: 1, direction: "rtl" }}
                />

                <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
                  <Link href="#" underline="hover" fontSize="small" color="secondary.main">
                    שכחת סיסמה?
                  </Link>
                </Box>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                  disabled={loading}
                  sx={{
                    py: 1.5,
                    mb: 2,
                    background: "linear-gradient(45deg, #26a69a 30%, #4db6ac 90%)",
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
                </Button>

                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="body2" color="text.secondary" component="span">
                    אין לך חשבון?{" "}
                  </Typography>
                  <Link href="#" underline="hover" color="secondary.main">
                    הירשם עכשיו
                  </Link>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Fade>
      </Box>
    </ThemeProvider>
  );
};

export default Login;