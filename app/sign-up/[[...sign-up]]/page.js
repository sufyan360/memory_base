import Navbar from '../../navbar'
import { SignUp } from '@clerk/nextjs'
import { Container, Typography, Button,Box} from '@mui/material'
import Link from 'next/link'

export default function SignUpPage() {
    return (
        <Container maxWidth="100vw" sx={{paddingTop: '10vh', height: '100vh'}}>
            <Navbar/>
            <Box 
                display = "flex"
                flexDirection = "column"
                alignItems="center"
                justifyContent="center"
                >
                    <Typography 
                        variant ="h4" sx ={{
                            textAlign: 'center', 
                            fontWeight: 'bold', 
                            background: 'linear-gradient(to bottom, #CFA8F3, #601EF9)', 
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
                            m: '4vh 0'
                          }} >Sign Up</Typography>
                    <SignUp />
                </Box>
        </Container>
    )
}