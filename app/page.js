import { getStripe } from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { AppBar, Box, Button, Container, Grid, Toolbar, Typography } from "@mui/material";
import Head from "next/head";

export default function Home() {
  return (
    <Container maxWidth = "100vw">
      <Head>
        <title>Memory Base</title>
        <meta name = "description" content = "Enter topic to create Flashcards" />
      </Head>

      <AppBar position="static">
        <Toolbar>
          <Typography variant = "h6" style={{flexGrow: 1}}>Memory Base</Typography>

          <SignedOut>
            <Button color="inherit">Login</Button>
            <Button color="inherit">Sign Up</Button>
          </SignedOut>

          <SignedIn>
            <UserButton/>
          </SignedIn>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          textAlign:'center',
          my: 4,
        }}>
        <Typography variant="h2" gutterBottom>Welcome to Memory Base</Typography>
        <Typography variant="h5" gutterBottom>
          {''}
          The best way to make Flashcards from SCRATCH
        </Typography>
        <Button variant="contained" color='primary' sx={{mt: 2}}>Get Started</Button>
      </Box>
      <Box sx={{my: 6}}>
        <Typography variant="h4" components="h2" gutterBottom>Features</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>Easy to use</Typography>
            <Typography>Simply enter your text and let us do the rest. Flashcards have never been easier</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>Smart Flashcards</Typography>
            <Typography>Our AI breaks down complex concepts into smaller chunks. Perfect for studying</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>Accessible Anywhere</Typography>
            <Typography>Access your flashcards from anywhere, any device, any time. Study on the go with ease.</Typography>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{my: 6, textAlign: 'center'}}>
        <Typography variant="h4" components="h2" gutterBottom>Pricing</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p:3,
                border: '1px solid',
                borderColor: 'grey.300',
                borderRadius: 2,
              }}>
              <Typography variant="h5" gutterBottom>Basic</Typography>
              <Typography variant="h6" gutterBottom>$5 / month</Typography>
              <Typography>
                {' '}
                Access to basic flashcard features and limited storage.
              </Typography>
              <Button variant="contained" color="primary">Choose Basic</Button>     
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
                sx={{
                  p:3,
                  border: '1px solid',
                  borderColor: 'grey.300',
                  borderRadius: 2,
                }}>
                <Typography variant="h5" gutterBottom>Pro</Typography>
                <Typography variant="h6" gutterBottom>$10 / month</Typography>
                <Typography>
                  {' '}
                  Unlimited flashcards and storage with priority support.
                </Typography>
                <Button variant="contained" color="primary">Choose Pro</Button>     
              </Box>
            </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
