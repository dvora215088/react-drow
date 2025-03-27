"use client"

import type React from "react"
import { Card, CardActionArea, CardContent, CardMedia, Typography, alpha, Box } from "@mui/material"
import { styled } from "@mui/material/styles"
import { CATEGORY_COLORS } from "./COLORS"

interface CategoryCardProps {
  category: any
  onClick: () => void
  index?: number
  logoUrl?: string
}

// Helper function to get a color from our palette
const getColor = (index = 0) => {
  return CATEGORY_COLORS[index % CATEGORY_COLORS.length]
}

const StyledCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== "cardIndex",
})<{ cardIndex?: number }>(({ cardIndex = 0 }) => {
  const primaryColor = getColor(cardIndex)
  const secondaryColor = getColor(cardIndex + 1)
  const accentColor = getColor(cardIndex + 2)

  return {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    transition: "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    position: "relative",
    borderRadius: "20px",
    border: `1px solid ${alpha(primaryColor, 0.3)}`,
    background: alpha("#FFFFFF", 0.95),
    backdropFilter: "blur(6px)",
    boxShadow: `0 10px 25px -10px ${alpha(primaryColor, 0.3)}`,
    "&:hover": {
      transform: "translateY(-15px) scale(1.02)",
      boxShadow: `0 25px 35px -18px ${alpha(secondaryColor, 0.4)}`,
      "& .card-content": {
        borderTop: `2px solid ${alpha(accentColor, 0.5)}`,
      },
      "& .logo-container": {
        transform: "rotate(10deg) scale(1.1)",
      },
    },
  }
})

const StyledCardContent = styled(CardContent)(({}) => ({
  borderTop: `2px solid ${alpha(CATEGORY_COLORS[0], 0.2)}`,
  transition: "all 0.3s ease",
  position: "relative",
}))

const CategoryTitle = styled(Typography)(({}) => ({
  color: CATEGORY_COLORS[2],
  fontWeight: 600,
  position: "relative",
  "&::after": {
    content: '""',
    position: "absolute",
    width: "40px",
    height: "3px",
    background: CATEGORY_COLORS[1],
    bottom: "-8px",
    left: "0",
    borderRadius: "2px",
  },
}))

const CategoryDescription = styled(Typography)(({}) => ({
  color: alpha(CATEGORY_COLORS[7], 0.9),
  marginTop: "16px",
}))

const LogoContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "-30px",
  right: "20px",
  width: "60px",
  height: "60px",
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "white",
  padding: "3px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  zIndex: 10,
  transition: "all 0.4s ease",
  overflow: "hidden",
}))

const LogoImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "contain",
})

const MediaOverlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "linear-gradient(135deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 50%)",
  zIndex: 1,
}))

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  onClick,
  index = 0,
  logoUrl = "src/assets/logo.png", // Default placeholder, replace with your logo
}) => {
  const primaryColor = getColor(index)
  const secondaryColor = getColor(index + 1)

  return (
    <StyledCard cardIndex={index}>
      <CardActionArea onClick={onClick}>
        <Box sx={{ position: "relative" }}>
          <CardMedia
            image={category.fileUrl}
            title={category.title}
            style={{
              height: 280,
              borderBottom: `1px solid ${alpha(getColor(index), 0.1)}`,
            }}
          />
          <MediaOverlay />

          {/* Logo watermark in the corner of the image */}
          <Box
            sx={{
              position: "absolute",
              top: "15px",
              left: "15px",
              opacity: 0.8,
              filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
              width: "40px",
              height: "40px",
              zIndex: 2,
              transition: "all 0.3s ease",
              "&:hover": {
                opacity: 1,
                transform: "scale(1.1)",
              },
            }}
          >
           
          </Box>
        </Box>

        <StyledCardContent className="card-content">
          <LogoContainer
            className="logo-container"
            sx={{
              border: `2px solid ${alpha(secondaryColor, 0.3)}`,
              background: `linear-gradient(135deg, white, ${alpha(secondaryColor, 0.1)})`,
            }}
          >
            <LogoImage src={logoUrl} alt="Logo" />
          </LogoContainer>

          <CategoryTitle variant="h6">{category.title}</CategoryTitle>
          <CategoryDescription variant="body2">{category.description}</CategoryDescription>
        </StyledCardContent>
      </CardActionArea>
    </StyledCard>
  )
}

export default CategoryCard

