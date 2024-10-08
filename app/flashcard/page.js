"use client"
import {useUser} from "@clerk/nextjs"
import {useEffect, useState} from 'react'
import {collection, doc, getDocs} from 'firebase/firestore'
import {db} from "../../firebase"
import { Container, Box, Typography, Grid, Card, CardActionArea, CardContent } from '@mui/material'
import { useSearchParams } from "next/navigation"
import Navbar from '../navbar'
import { useRouter } from "next/navigation"

export default function Flashcard() {
    const {isLoaded, isSignedIn, user} = useUser()
    const [flashcards, setFlashcards] = useState([])
    const [flipped, setFlipped] = useState([])
    const router = useRouter()

    useEffect(() => {
        if (!isSignedIn){
            router.push('/');
        }
    }, [isSignedIn, router]);

    const searchParams = useSearchParams()
    const search = searchParams.get('id')

    function capitalizeName(name) {
        if (!name) return '';
        return name.replace(/\b\w/g, (char) => char.toUpperCase());
    }

    useEffect(() => {
        async function getFlashcard(){
            if(!search || !user) return

            const colRef = collection(doc(collection(db, 'users'), user.id), search)
            const docs = await getDocs(colRef)
            const flashcards = []

            docs.forEach((doc)=>{
                flashcards.push({id: doc.id, ...doc.data()})
            })
            setFlashcards(flashcards)
        }
        getFlashcard()
    }, [user, search])

    const handleCardClick = (id) => {
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id],
        }))
    }

    const handleSavedCards = () => {
        router.push('/flashcards')
    }

    if (!isLoaded || !isSignedIn) {
        return <></>
    }
    
    return (
        <Container maxWidth='md' sx={{paddingTop: '10vh'}}>
            <Navbar />
            {flashcards.length > 0 && (
                <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        <Typography 
                            sx={{
                                background: 'linear-gradient(to bottom, #ADD8E6, #601EF9)', 
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
                                margin: '3vh auto'}}
                            variant='h3' 
                            align='center'>
                            {capitalizeName(search)}
                        </Typography>
                    </Box>                    
                    <Grid container spacing={3} justifyContent="center">
                        {flashcards.map((flashcard, index) => (
                            <Grid item xs={12} md={4} key={index}>
                                <Card>
                                    <CardActionArea onClick={() => handleCardClick(index)}>
                                        <CardContent>
                                            <Box sx={{
                                                perspective: '1000px',
                                                '& > div': {
                                                    transition: 'transform 0.5s',
                                                    transformStyle: 'preserve-3d',
                                                    position: 'relative',
                                                    width: '100%',
                                                    height: '200px',
                                                    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
                                                    transform: flipped[index] ? 'rotateY(180deg)' : 'rotateY(0deg)'
                                                },
                                                '& > div > div': {
                                                    position: 'absolute',
                                                    width: '100%',
                                                    height: '100%',
                                                    backfaceVisibility: 'hidden',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    padding: 2,
                                                    boxSizing: 'border-box',
                                                    overflow: 'auto',
                                                },
                                                '& > div > div:nth-of-type(2)': {
                                                    transform: 'rotateY(180deg)',
                                                    paddingTop: '15px', 
                                                    paddingBottom: '10px',  
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'flex-start', 
                                                }
                                            }}>
                                                <div>
                                                    <div>
                                                        <Typography variant='body1' component='div' align="center">
                                                            {flashcard.front}
                                                        </Typography>
                                                    </div>
                                                    <div>
                                                        <Typography variant='body1' component='div' align="center">
                                                            {flashcard.back}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </Box>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            )}
        </Container>
    )
}
