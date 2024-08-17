"use client";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import {useRouter} from 'next/navigation'

export default function Navbar() {
    const router = useRouter()

    const handleClick = () => {
          router.push('/')
    }
    return(
        <AppBar position="static" width='100vw'>
            <Toolbar 
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between', // Space between items
                    alignItems: 'center', // Center items vertically
                }}>
            <Typography onClick={handleClick} variant = "h6" style={{display: 'flex', cursor: 'pointer'}}>Memory Base</Typography>
            <div>
                <SignedOut>
                    <Button color="inherit" href="/sign-in">Login</Button>
                    <Button color="inherit" href="/sign-up">Sign Up</Button>
                </SignedOut>

                <SignedIn>
                    <UserButton/>
                </SignedIn>
            </div>
            </Toolbar>
        </AppBar>
    );
}