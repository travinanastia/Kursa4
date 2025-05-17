/** @format */

import useTitle from '../../hooks/useTitle';
import useAuth from '../../hooks/useAuth';
import { useSubscriptionPaymentQuery } from '../../features/recipe/recipeApiSlice';

import { Button } from '../../components';
import { Container, Typography, Box, CircularProgress, Alert, Paper } from '@mui/material';
import { useParams } from 'react-router-dom';

const Subscription = () => {
  useTitle('Gazdyna - AI Recipe Subscription');

  const { id } = useParams();
  const { data, isLoading, isError } = useSubscriptionPaymentQuery({ userId: id });

  const user = useAuth();
  if (isLoading) {
    return (
      <Container maxWidth='sm' sx={{ mt: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant='body1' mt={2}>
          Loading subscription options...
        </Typography>
      </Container>
    );
  }

  if (isError || !data) {
    return (
      <Container maxWidth='sm' sx={{ mt: 4 }}>
        <Alert severity='error'>Failed to load subscription data.</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth='md' sx={{ mt: 6 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant='h4' gutterBottom>
          Subscribe to Gazdyna
        </Typography>
        <Typography variant='body1' gutterBottom>
          Welcome{user?.name ? `, ${user.name}` : ''}! Get unlimited access to AI-generated recipes and more.
        </Typography>

        <Box mt={4} mb={2}>
          <Button
            variant='contained'
            color='primary'
            size='large'
            handleClick={() => window.open(data.apiResponse.url_privatpay, '_blank')}
            content={'Buy Now'}
          ></Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Subscription;
