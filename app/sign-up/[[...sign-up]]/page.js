import Navbar from '../../navbar'
import { SignUp } from '@clerk/nextjs'
import { Container, Typography, Button,Box} from '@mui/material'
import Link from 'next/link'

export default function SignUpPage() {
    return (
        <Container maxWidth="100vw">
            <Navbar/>
            <Box 
                display = "flex"
                flexDirection = "column"
                alignItems="center"
                justifyContent="center"
                >
                    <Typography variant ="h4">Sign Up</Typography>
                    <SignUp />
                </Box>
        </Container>
    )
}