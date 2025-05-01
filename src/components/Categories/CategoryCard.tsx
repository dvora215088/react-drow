
import { useEffect, useRef, useState } from "react"
import { Card, CardActionArea, CardContent, CardMedia, Typography, alpha, Box } from "@mui/material"
import { styled } from "@mui/material/styles"
import { COLORS } from "../../COLORS"
import worksheetServiceInstance from "../../services/worksheetService"
import WorksheetCardImage from "../WorkSheet/WorksheetCardImage"

interface CategoryCardProps {
  category: any
  onClick: () => void
  index?: number
  logoUrl?: string
}

// Helper function to get a color from our palette
const getColor = (index = 0) => {
  return COLORS[index % COLORS.length]
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
  borderTop: `2px solid ${alpha(COLORS[0], 0.2)}`,
  transition: "all 0.3s ease",
  position: "relative",
}))

const CategoryTitle = styled(Typography)(({}) => ({
  color: COLORS[2],
  fontWeight: 600,
  position: "relative",
  "&::after": {
    content: '""',
    position: "absolute",
    width: "40px",
    height: "3px",
    background: COLORS[1],
    bottom: "-8px",
    left: "0",
    borderRadius: "2px",
  },
}))

const CategoryDescription = styled(Typography)(({}) => ({
  color: alpha(COLORS[7], 0.9),
  marginTop: "16px",
}))

const LogoContainer = styled(Box)(({  }) => ({
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

const MediaOverlay = styled(Box)(({  }) => ({
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
  const [categoryWorksheets, setCategoryWorksheets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [, setError] = useState("");

  const hasEffectRun = useRef(false);

  useEffect(() => {
    // בדיקה אם הפונקציה כבר רצה
    if (hasEffectRun.current) {
      return; // אם כבר רצה, לא עושים כלום
    }
    
    // מסמנים שהפונקציה רצה
    hasEffectRun.current = true;
    
    // פונקציה לטעינת וורקשיטים 
    const loadWorksheets = async () => {
      try {
        setLoading(true);
        
        // קבלת כל הקטגוריות עם הוורקשיטים שלהן
        const data = await worksheetServiceInstance.getWorksheetsByCategories();
        
        // מציאת הנתונים לקטגוריה הספציפית - בדיקה אם category לא undefined
        if (category && data) {
          const thisCategoryData = data.find((item) => 
            item.categoryId === category.id || 
            Number(item.categoryId) === Number(category.id)
          );
          
          if (thisCategoryData && thisCategoryData.hasWorksheet) {
            // אם יש וורקשיט לקטגוריה זו, השתמש בו
            setCategoryWorksheets([thisCategoryData.worksheet]);
          } else {
            // אין וורקשיטים לקטגוריה זו
            setCategoryWorksheets([]);
          }
        }
      } catch (err) {
        console.error('Error loading worksheets:', err);
        setError('Error loading worksheets');
      } finally {
        setLoading(false);
      }
    };
    
    // טעינת הנתונים
    loadWorksheets();
    
    // אין צורך בתלויות כי אנחנו רוצים שזה ירוץ פעם אחת בלבד
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
          <MediaOverlay>
            {/* Use the original WorksheetCardImage component with the worksheet for this category */}
            {categoryWorksheets.length > 0 ? (
              <WorksheetCardImage 
                worksheet={categoryWorksheets[0]} 
                isLoaded={!loading}
              />
            ) : (
              // Elegant, subtle loading or empty state
              <Box 
                sx={{ 
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: `linear-gradient(135deg, ${alpha(COLORS[8], 0.05)}, ${alpha(COLORS[9], 0.1)})`,
                  backdropFilter: 'blur(2px)'
                }}
              >
                {loading ? (
                  // Subtle loading animation
                  <Box 
                    sx={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      border: `2px solid ${alpha(primaryColor, 0.2)}`,
                      borderTopColor: primaryColor,
                      animation: 'spin 1.2s linear infinite',
                      '@keyframes spin': {
                        '0%': { transform: 'rotate(0deg)' },
                        '100%': { transform: 'rotate(360deg)' }
                      }
                    }}
                  />
                ) : (
                  // Subtle placeholder with fade-in
                  <Box
                    sx={{
                      opacity: 0.6,
                      transition: 'opacity 0.5s ease',
                      animation: 'fadeIn 0.5s ease',
                      '@keyframes fadeIn': {
                        '0%': { opacity: 0 },
                        '100%': { opacity: 0.6 }
                      }
                    }}
                  >
                    <img 
                      src="/placeholder-image.jpg" 
                      alt="No worksheet available" 
                      style={{ 
                        maxHeight: '70%', 
                        maxWidth: '70%', 
                        objectFit: 'contain',
                        filter: 'grayscale(0.5) opacity(0.7)',
                        transition: 'all 0.3s ease'
                      }} 
                    />
                  </Box>
                )}
              </Box>
            )}
          </MediaOverlay>
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