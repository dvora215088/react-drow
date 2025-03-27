import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Grid, 

  Grow,
  useTheme,
  alpha
} from '@mui/material';
import categoryService, { Category } from '../../services/categoriesService';
import LoadingView from './LoadingView';
import ErrorView from './ErrorView';
import PageHeader from './PageHeader';
import EmptyCategoriesView from './EmptyCategoriesView';
import CategoryCard from './CategoryCard';

// Import constants

const CategoriesDisplay: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();
  const navigate = useNavigate();

  // Page background with gradient
  const pageBackground = `
    linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.05)} 0%, 
    ${alpha(theme.palette.background.default, 0.02)} 50%,
    ${alpha(theme.palette.secondary.light, 0.05)} 100%)
  `;
  
  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await categoryService.getAllCategories();
        setCategories(data);
        setError(null);
      } catch (err) {
        console.error('שגיאה בטעינת הקטגוריות:', err);
        setError('לא ניתן לטעון את הקטגוריות. אנא נסה שוב מאוחר יותר.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);



  // Function to navigate to worksheets page
  const navigateToWorksheets = (categoryId: number | string) => {
    navigate(`/worksheets/${categoryId.toString()}`);
  };

  // Handle creating a new category
  const handleCreateCategory = () => {
    // Implement category creation logic or navigation
    console.log('Create new category clicked');
  };

  if (loading) {
    return <LoadingView />;
  }

  if (error) {
    return <ErrorView  />;
  }

  return (
    <Box sx={{ 
      background: pageBackground,
      minHeight: '100vh',
      pt: 4,
      pb: 10,
    }}>
      <Container maxWidth="lg" sx={{ direction: 'rtl' }}>
        <PageHeader 
          title="הקטגוריות שלנו"
          subtitle="סייר בקטגוריות המרהיבות שלנו ומצא השראה לציורים הבאים שלך"
        />
        
        {categories.length === 0 ? (
          <EmptyCategoriesView onCreateNewCategory={handleCreateCategory} />
        ) : (
          <>
            <Grid container spacing={4}>
              {categories.map((category, index) => {
                return (
                  <Grid item xs={12} sm={6} md={4} key={category.id}>
                    <Grow 
                      in={true} 
                      timeout={(index + 1) * 200}
                      style={{ transformOrigin: '50% 50%' }}
                    >
                      <div> {/* Div wrapper needed for Grow */}
                        <CategoryCard 
                          category={category}
                          onClick={() => navigateToWorksheets(category.id)}
                        />
                      </div>
                    </Grow>
                  </Grid>
                );
              })}
            </Grid>

           
            
          </>
        )}
      </Container>
    </Box>
  );
};

export default CategoriesDisplay;