import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

// כפתור עם אנימציה
export const AnimatedButton = styled(Button)(() => ({
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

// שדה טקסט עם אנימציה
export const AnimatedTextField = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    transition: "transform 0.3s, box-shadow 0.3s",
    "&:hover, &.Mui-focused": {
      transform: "translateY(-3px)",
      boxShadow: "0 4px 12px rgba(25, 118, 210, 0.15)",
    },
  },
}));