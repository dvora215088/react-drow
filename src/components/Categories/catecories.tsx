import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Grid, 
  Grow
} from '@mui/material';
import categoryService, { Category } from '../../services/categoriesService';
import LoadingView from './LoadingView';
import ErrorView from './ErrorView';
import EmptyCategoriesView from './EmptyCategoriesView';
import CategoryCard from './CategoryCard';
import NavigationMenu from '../NavigationMenu';

const CategoriesDisplay: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Changed background to white
  const pageBackground = 'white';
  
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
    <>
      <NavigationMenu></NavigationMenu>
      <Box sx={{ 
        background: pageBackground,
        minHeight: '100vh',
        pt: 4,
        pb: 10,
      }}>
        <Container maxWidth="lg" sx={{ direction: 'rtl' }}>
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
    </>
  );
};

export default CategoriesDisplay;