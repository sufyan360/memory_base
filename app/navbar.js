"use client";
import { useEffect, useState} from "react";
import { AppBar, Button, Toolbar, Typography, Box } from "@mui/material";
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

    const handleGenerate = () => {
        router.push('/generate');
    };

    return (
        <AppBar position="absolute" 
            sx={{
                width: '100%',
                bgcolor: '#601EF9',
                zIndex: (theme) => theme.zIndex.appBar,
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                height: '10vh',
                display: 'flex',
                flexDirection: 'column', 
                justifyContent: 'center',
            }}>
            <Toolbar 
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                }}>
                <Typography 
                    onClick={handleClick} 
                    variant="h6" 
                    sx={{ display: 'flex', cursor: 'pointer', fontWeight: 700}}>
                    Memory Base
                </Typography>
                <div>
                    {isClient && (
                        <>
                            <SignedOut>
                                <Button 
                                    sx={{
                                         color: '#000080',
                                        backgroundColor: 'white',
                                        mr: 2,
                                        '&:hover': {
                                            backgroundColor: '#000080', 
                                            color: 'white',
                                        }
                                    }} 
                                    href="/sign-in">Login</Button>
                                <Button 
                                    sx={{
                                        color: '#000080',
                                        backgroundColor: 'white',
                                        '&:hover': {
                                            backgroundColor: '#000080', 
                                            color: 'white',
                                        }
                                        }} href="/sign-up">Sign Up</Button>
                            </SignedOut>

                            <Box sx={{display: 'flex', textAlign: 'center', justifyContent: 'space-between'}}>
                                <SignedIn>
                                <Button 
                                        variant="contained" 
                                        onClick={handleGenerate}
                                        sx={{
                                            mr: 2, 
                                            backgroundColor: '#000080',
                                            borderRadius: 20,
                                            color:'white',
                                            '&:hover': {
                                                color: '#000080',
                                                backgroundColor: 'white'
                                            }
                                        }}
                                        >
                                        Generate Cards
                                    </Button>
                                    <Button 
                                        variant="contained" 
                                        onClick={handleSavedCards}
                                        sx={{
                                            mr: 2, 
                                            backgroundColor: '#000080',
                                            borderRadius: 20,
                                            color:'white',
                                            '&:hover': {
                                                color: '#000080',
                                                backgroundColor: 'white'
                                            }
                                        }}
                                        >
                                        View Saved Cards
                                    </Button>
                                    <Box 
                                        sx={{ 
                                            mt: 'auto', 
                                            mb: 'auto', 
                                            flexGrow: 1
                                    }}>
                                        <UserButton />
                                    </Box>
                                </SignedIn>
                            </Box>
                        </>
                    )}
                </div>
            </Toolbar>
        </AppBar>
    );
}

