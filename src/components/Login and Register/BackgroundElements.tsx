import React from "react";
import Box from "@mui/material/Box";
import { motion } from "framer-motion";
import { COLORS } from "../../COLORS";

// פונקציה עזר לחישוב זוויות לאלמנטים אומנותיים
const getRandomAngle = () => Math.floor(Math.random() * 360);

const BackgroundElements: React.FC = () => {
  return (
    <>
      {/* רקע עם כתמי צבע */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.05, scale: 1 }}
        transition={{ duration: 1.5 }}
        sx={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS[1]} 0%, transparent 70%)`,
          zIndex: 0,
        }}
      />
      <Box
        component={motion.div}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.07, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.3 }}
        sx={{
          position: "absolute",
          bottom: -70,
          left: -70,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS[11]} 0%, transparent 70%)`,
          zIndex: 0,
          filter: "blur(2px)",
        }}
      />
      
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
              ? `rgba(${parseInt(COLORS[0].slice(1, 3), 16)}, ${parseInt(COLORS[0].slice(3, 5), 16)}, ${parseInt(COLORS[0].slice(5, 7), 16)}, 0.07)` // כחול בהיר עדין
              : i % 6 === 2
              ? `rgba(${parseInt(COLORS[11].slice(1, 3), 16)}, ${parseInt(COLORS[11].slice(3, 5), 16)}, ${parseInt(COLORS[11].slice(5, 7), 16)}, 0.07)` // כחול פלדה עדין
              : i % 6 === 3
              ? "rgba(255, 235, 59, 0.07)" // צהוב עדין
              : i % 6 === 4
              ? `rgba(${parseInt(COLORS[4].slice(1, 3), 16)}, ${parseInt(COLORS[4].slice(3, 5), 16)}, ${parseInt(COLORS[4].slice(5, 7), 16)}, 0.07)` // ירוק עדין
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
              ? `rgba(${parseInt(COLORS[1].slice(1, 3), 16)}, ${parseInt(COLORS[1].slice(3, 5), 16)}, ${parseInt(COLORS[1].slice(5, 7), 16)}, 0.3)` // כחול בינוני
              : i % 8 === 2
              ? "rgba(255, 193, 7, 0.3)" // צהוב עדין
              : i % 8 === 3
              ? `rgba(${parseInt(COLORS[4].slice(1, 3), 16)}, ${parseInt(COLORS[4].slice(3, 5), 16)}, ${parseInt(COLORS[4].slice(5, 7), 16)}, 0.3)` // ירוק בינוני
              : i % 8 === 4
              ? "rgba(156, 39, 176, 0.3)" // סגול עדין
              : i % 8 === 5
              ? "rgba(255, 152, 0, 0.3)" // כתום עדין
              : i % 8 === 6
              ? `rgba(${parseInt(COLORS[11].slice(1, 3), 16)}, ${parseInt(COLORS[11].slice(3, 5), 16)}, ${parseInt(COLORS[11].slice(5, 7), 16)}, 0.3)` // כחול פלדה
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
              ? `radial-gradient(circle, rgba(${parseInt(COLORS[0].slice(1, 3), 16)}, ${parseInt(COLORS[0].slice(3, 5), 16)}, ${parseInt(COLORS[0].slice(5, 7), 16)}, 0.15) 0%, transparent 80%)` // כחול בהיר
              : i % 10 === 2
              ? `radial-gradient(circle, rgba(${parseInt(COLORS[11].slice(1, 3), 16)}, ${parseInt(COLORS[11].slice(3, 5), 16)}, ${parseInt(COLORS[11].slice(5, 7), 16)}, 0.15) 0%, transparent 80%)` // כחול פלדה
              : i % 10 === 3
              ? "radial-gradient(circle, rgba(255, 241, 118, 0.15) 0%, transparent 80%)" // צהוב עדין
              : i % 10 === 4
              ? `radial-gradient(circle, rgba(${parseInt(COLORS[3].slice(1, 3), 16)}, ${parseInt(COLORS[3].slice(3, 5), 16)}, ${parseInt(COLORS[3].slice(5, 7), 16)}, 0.15) 0%, transparent 80%)` // ירוק בהיר
              : i % 10 === 5
              ? "radial-gradient(circle, rgba(206, 147, 216, 0.15) 0%, transparent 80%)" // סגול עדין
              : i % 10 === 6
              ? "radial-gradient(circle, rgba(255, 171, 145, 0.15) 0%, transparent 80%)" // כתום עדין
              : i % 10 === 7
              ? `radial-gradient(circle, rgba(${parseInt(COLORS[14].slice(1, 3), 16)}, ${parseInt(COLORS[14].slice(3, 5), 16)}, ${parseInt(COLORS[14].slice(5, 7), 16)}, 0.15) 0%, transparent 80%)` // כחול-אפור
              : i % 10 === 8
              ? `radial-gradient(circle, rgba(${parseInt(COLORS[9].slice(1, 3), 16)}, ${parseInt(COLORS[9].slice(3, 5), 16)}, ${parseInt(COLORS[9].slice(5, 7), 16)}, 0.15) 0%, transparent 80%)` // כחול חיוור
              : "radial-gradient(circle, rgba(179, 157, 219, 0.15) 0%, transparent 80%)", // לבנדר עדין
            top: `${5 + i * 9}%`,
            left: i % 2 === 0 ? `${75 + i * 2}%` : `${3 + i * 3}%`,
            filter: "blur(20px)",
            zIndex: 0,
          }}
        />
      ))}
    </>
  );
};

export default BackgroundElements;