import { SignIn } from '@clerk/nextjs'
import {Container, Typography, Button,Box} from '@mui/material'
import Navbar from '../../navbar'
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
                    <Typography variant ="h4">Sign In</Typography>
                    <SignIn />
                </Box>
    </Container>
    )
}