"use client"
import { useUser } from '@clerk/nextjs'
import getStripe from "@/utils/get-stripe";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import Head from "next/head";
import { useRouter } from 'next/navigation'
import Navbar from './navbar'
import { useState, useEffect } from 'react';

export default function Home() {
  const { isLoaded, isSignedIn, user } = useUser()
  const router = useRouter()
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleGetStarted = () => {
    if (isSignedIn) {
      router.push('/generate')
    } else {
      router.push('/sign-in')
    }
  }

  const handleSubmit = async () => {
    if (isSignedIn) {
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
    } else{
      router.push('/sign-in')
    }
  }

  return (
  <>
    <Navbar />
    <Container maxWidth="100vw" sx={{position: 'absolute', paddingTop: '10vh', bgcolor: 'white'}}>
      <Head>
        <title>Memory Base</title>
        <meta name="description" content="Enter topic to create Flashcards" />
      </Head>
      <Grid container sx={{ height: '90vh', alignItems: 'center', justifyContent: 'center', my: 4}}>
        <Grid item xs={12} md={7.5} lg={7.5}>
          <Box  
            sx={{
              background: 'linear-gradient(to bottom, #601EF9, #AB67EA)',
              opacity: animate ? 1 : 0,
              transform: animate ? 'translateX(0)' : 'translateX(-100vw)',
              transition: 'all 1s ease-out',
              width: '90%',
              color: 'white',
              padding: '5vw',
              textAlign: 'center',
              borderRadius: '25px',
              ml: 'auto',
              mr: 'auto',
              height: '80vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
            <Typography variant="h2" gutterBottom sx={{ fontWeight: 800 }}>Welcome to Memory Base</Typography>
            <Typography variant="h5" sx={{ fontWeight: 500 }} gutterBottom>
              The best way to make Flashcards from SCRATCH
            </Typography>
            <Button 
              variant="contained" 
              color='primary' 
              sx={{   
                color: '#601EF9',
                backgroundColor: 'white', 
                mt: 2,
                width: '12vw',
                ml: 'auto',
                mr: 'auto',
                borderRadius: '20px',
                padding: 1,
                '&:hover': {
                  color: 'white',
                  backgroundColor: '#AB67EA',
                }
              }} 
              onClick={handleGetStarted}
            >
              Get Started
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={4.5} lg={4.5} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box
            component="img"
            src='mind.jpg'
            alt="Memory Base"
            sx={{
              width: '100%',
              height: '80vh',
              borderRadius: '15px',
              float: 'left'
            }}
          />
        </Grid>
      </Grid>
      <Box sx={{ my: 6, background: 'linear-gradient(to bottom, #ADD8E6, #000080)', p: '5vh 5vw', width: '100vw', position:'absolute', height: '90vh', left: 0}} >
        <Typography 
        sx ={{
          textAlign: 'center', 
          fontWeight: 'bold', 
          background: 'linear-gradient(to bottom, #A987F1, #601EF9)', 
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
          mb: '4vh'
        }}
        variant="h4" 
        component="h2" 
        gutterBottom>
          Features
        </Typography>
        <Grid container spacing={5}>
          <Grid item xs={12} md={4} sx={{width: '20vh'}}>
            <Box 
              sx={{ 
                  background: 'linear-gradient(to bottom, #AB67EA, #CFA8F3)',
                  boxSizing: 'border-box',
                  height: '50vh', 
                  width: '25vw',
                  padding: '5vh 5vw',
                  borderRadius: 5,
                  color: 'white',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',   
                  }}>
              <Typography align='center' sx={{ fontWeight: 'bold', mb: '6vh', fontSize: '2rem'}} gutterBottom>Easy to use</Typography>
              <Typography align='center' sx={{fontWeight: 500, fontSize: '1.3rem'}}>Simply enter your text and let us do the rest. Flashcards have never been easier.</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
              <Box 
                sx={{ 
                    background: 'linear-gradient(to bottom, #AB67EA, #CFA8F3)',
                    boxSizing: 'border-box',
                    height: '50vh', 
                    width: '25vw',
                    padding: '5vh 5vw',
                    borderRadius: 5,
                    color: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',   
                    }}>
                <Typography align='center' sx={{fontWeight: 'bold', mb: '6vh', fontSize: '2rem'}} gutterBottom >Smart Flashcards</Typography>
                <Typography align='center' sx={{fontWeight: 500, fontSize: '1.3rem'}}>Our AI breaks down complex concepts into smaller chunks. Perfect for studying.</Typography>
              </Box>
          </Grid>
          <Grid item xs={12} md={4}>
          <Box 
                sx={{ 
                    background: 'linear-gradient(to bottom, #AB67EA, #CFA8F3)',
                    mt: '3%',
                    boxSizing: 'border-box',
                    height: '50vh', 
                    width: '25vw',
                    padding: '5vh 5vw',
                    borderRadius: 5,
                    color: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',   
                    }}>
              <Typography align='center' sx={{fontWeight: 'bold', mb: '6vh', fontSize: '2rem'}} gutterBottom>Accessible Anywhere</Typography>
              <Typography align='center' sx={{fontWeight: 500, fontSize: '1.3rem'}}>Access your flashcards from anywhere, any device, any time. Study on the go with ease.</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ my: 6, textAlign: 'center', mt: '108vh', height: '80vh'}}>
        <Typography 
          sx ={{
            textAlign: 'center', 
            fontWeight: 'bold', 
            background: 'linear-gradient(to bottom, #A987F1, #601EF9)', 
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
            m: '0 4vw'
          }} 
          variant="h4" 
          component="h2" 
          gutterBottom>
          Pricing
        </Typography>
        <Grid container spacing={4} sx={{height: '100%'}}>
          <Grid item xs={12} md={6} sx ={{mt:'auto', mb:'auto'}}>
            <Box
              sx={{
                background: 'linear-gradient(to bottom, #CFA8F3, #601EF9)',
                color: 'white',
                p: '6vh 3vw',
                border: '1px solid',
                borderColor: 'grey.300',
                borderRadius: 5,
                height: "50vh",
              }}>
              <Typography  sx ={{fontWeight: 800}} variant="h6" gutterBottom>Basic</Typography>
              <Typography sx ={{fontWeight: 800}} variant="h4" gutterBottom>FREE</Typography>
              <Typography sx ={{fontWeight: 600, mb: '5vh'}} variant="h5">
                Access to basic flashcard features and limited storage.
              </Typography>
              <Button 
                variant="contained" 
                sx={{
                  backgroundColor:"white", 
                  color:'#601EF9',
                  borderRadius: '20px',
                  p: 1,
                  fontWeight: 'bold',
                  '&:hover': {
                    color: 'white',
                    backgroundColor: '#AB67EA'
                  }
                }} 
                onClick={handleGetStarted}>
                  Choose Basic
              </Button>     
            </Box>
          </Grid>
          <Grid item xs={12} md={6} sx ={{mt:'auto', mb:'auto'}}>
            <Box
              sx={{
                background: 'linear-gradient(to bottom, #CFA8F3, #601EF9)',
                p: '6vh 3vw',
                border: '1px solid',
                borderColor: 'grey.300',
                borderRadius: 5,
                color: 'white',
                height: "50vh"
              }}>
              <Typography sx ={{fontWeight: 800}} variant="h6" gutterBottom>Pro</Typography>
              <Typography sx ={{fontWeight: 800}} variant="h4" gutterBottom>$10 / month</Typography>
              <Typography sx ={{fontWeight: 600, mb: '5vh'}} variant="h5">
                Unlimited flashcards and storage with priority support.
              </Typography>
              <Button 
                variant="contained" 
                sx={{
                  backgroundColor:"white", 
                  color:'#601EF9',
                  borderRadius: '20px',
                  fontWeight: 'bold',
                  p: 1,
                  '&:hover': {
                    color: 'white',
                    backgroundColor: '#AB67EA'
                  }
                }}
                onClick={handleSubmit}
              >
                Choose Pro
              </Button>     
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  </>
  );
}
