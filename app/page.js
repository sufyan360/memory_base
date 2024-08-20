"use client"
import { useUser } from '@clerk/nextjs'
import getStripe from "@/utils/get-stripe";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import Head from "next/head";
import { useRouter } from 'next/navigation'
import Navbar from './navbar'

export default function Home() {
  const { isLoaded, isSignedIn, user } = useUser()
  const router = useRouter()

  const handleGetStarted = () => {
    if (isSignedIn) {
      router.push('/generate')
    } else {
      router.push('/sign-in')
    }
  }

  const handleChooseBasic = () => {
    router.push('/generate')
  }

  const handleSubmit = async () => {
    const checkoutSession = await fetch('api/checkout_session', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        successUrl: `${window.location.origin}/result`,
        cancelUrl: `${window.location.origin}`,
      }),
    })

    const checkoutSessionJson = await checkoutSession.json()

    if (checkoutSession.status === 500) {
      console.error(checkoutSession.statusText)
      return
    }

    const stripe = await getStripe()
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id
    })

    if (error) {
      console.warn(error.message)
    }
  }

  return (
    <Container maxWidth="100vw">
      <Head>
        <title>Memory Base</title>
        <meta name="description" content="Enter topic to create Flashcards" />
      </Head>
      <Navbar />
      <Box
        sx={{
          textAlign: 'center',
          my: 4,
        }}>
        <Typography variant="h2" gutterBottom>Welcome to Memory Base</Typography>
        <Typography variant="h5" gutterBottom>
          The best way to make Flashcards from SCRATCH
        </Typography>
        <Button variant="contained" color='primary' sx={{ mt: 2 }} onClick={handleGetStarted}>Get Started</Button>
      </Box>
      <Box sx={{ my: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom>Features</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>Easy to use</Typography>
            <Typography>Simply enter your text and let us do the rest. Flashcards have never been easier.</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>Smart Flashcards</Typography>
            <Typography>Our AI breaks down complex concepts into smaller chunks. Perfect for studying.</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>Accessible Anywhere</Typography>
            <Typography>Access your flashcards from anywhere, any device, any time. Study on the go with ease.</Typography>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ my: 6, textAlign: 'center' }}>
        <Typography variant="h4" component="h2" gutterBottom>Pricing</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 3,
                border: '1px solid',
                borderColor: 'grey.300',
                borderRadius: 2,
              }}>
              <Typography variant="h5" gutterBottom>Basic</Typography>
              <Typography variant="h6" gutterBottom>FREE</Typography>
              <Typography>
                Access to basic flashcard features and limited storage.
              </Typography>
              <Button variant="contained" color="primary" onClick={handleChooseBasic}>Choose Basic</Button>     
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 3,
                border: '1px solid',
                borderColor: 'grey.300',
                borderRadius: 2,
              }}>
              <Typography variant="h5" gutterBottom>Pro</Typography>
              <Typography variant="h6" gutterBottom>$10 / month</Typography>
              <Typography>
                Unlimited flashcards and storage with priority support.
              </Typography>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={handleSubmit}
              >
                Choose Pro
              </Button>     
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
