"use client";
import { useEffect, useState } from "react";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleClick = () => {
        router.push('/');
    };

    const handleSavedCards = () => {
        router.push('/flashcards');
    };

    return (
        <AppBar position="static" sx={{ width: '100vw' }}>
            <Toolbar 
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                }}>
                <Typography 
                    onClick={handleClick} 
                    variant="h6" 
                    sx={{ display: 'flex', cursor: 'pointer' }}>
                    Memory Base
                </Typography>
                <div>
                    {isClient && (
                        <>
                            <SignedOut>
                                <Button color="inherit" href="/sign-in">Login</Button>
                                <Button color="inherit" href="/sign-up">Sign Up</Button>
                            </SignedOut>

                            <SignedIn>
                                <Button variant="contained" onClick={handleSavedCards}>View Saved Cards</Button>
                                <UserButton />
                            </SignedIn>
                        </>
                    )}
                </div>
            </Toolbar>
        </AppBar>
    );
}

