"use client"
import { useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { doc, getDoc, setDoc, collection, writeBatch, getDocs } from 'firebase/firestore'
import { db } from '../../firebase'
import { useRouter } from 'next/navigation'
import { Container, Grid, Card, CardActionArea, CardContent, Button, Typography, Box } from '@mui/material'
import Navbar from '../navbar'

export default function Flashcards() {
    const { isLoaded, isSignedIn, user } = useUser()
    const [flashcards, setFlashcards] = useState([])
    const router = useRouter()

    useEffect(() => {
        if (!isSignedIn){
            router.push('/');
        }
    }, [isSignedIn, router]);

    useEffect(() => {
        async function getFlashcards() {
            if (!user) return
            const docRef = doc(collection(db, 'users'), user.id)
            const docSnapshots = await getDoc(docRef)

            if (docSnapshots.exists()) {
                const collections = docSnapshots.data().flashcards || []
                setFlashcards(collections)
            } else {
                await setDoc(docRef, { flashcards: [] })
            }
        }
        getFlashcards()
    }, [user])

    function capitalizeName(name) {
        if (!name) return '';
        return name.replace(/\b\w/g, (char) => char.toUpperCase());
    }

    if (!isLoaded || !isSignedIn) {
        return null
    }

    const handleCardClick = (name) => {
        router.push(`/flashcard?id=${name}`)
    }

    const handleDelete = async (name) => {
        if (!confirm(`Are you sure you want to delete the flashcard collection "${name}"?`)) {
            return
        }

        const userDocRef = doc(collection(db, 'users'), user.id)
        const batch = writeBatch(db)

        // Delete the specific collection
        const colRef = collection(userDocRef, name)
        const colSnapshot = await getDocs(colRef)
        colSnapshot.forEach(doc => {
            batch.delete(doc.ref)
        })

        // Update the user's flashcards array in the main document
        const docSnapshot = await getDoc(userDocRef)
        if (docSnapshot.exists()) {
            const collections = docSnapshot.data().flashcards || []
            const updatedCollections = collections.filter(flashcard => flashcard.name !== name)
            batch.update(userDocRef, { flashcards: updatedCollections })
        }

        await batch.commit()
        setFlashcards(prevFlashcards => prevFlashcards.filter(flashcard => flashcard.name !== name))
    }

    const sendHome = () => {
        router.push('/generate')
    }

    return (
        <Container maxWidth='100vw' sx={{paddingTop: '10vh', background: 'linear-gradient(to bottom, white, #DFC5FE)', height: '100vh'}}>
            <Navbar />
            <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', mb: 4}}>
                    <Typography 
                        variant='h3'  
                        align='center' 
                        sx={{ 
                            mr: 2,
                            fontWeight: 'bold', 
                            background: 'linear-gradient(to bottom, #AB67EA, #601EF9)', 
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
                            m: '4vh 4vw'
                         }}>
                        Saved Cards
                    </Typography>
                    <Button 
                        variant='contained' 
                        onClick={sendHome}
                        sx={{
                            borderRadius: 15,
                            backgroundColor: '#000080',
                            '&:hover':{
                                backgroundColor: '#601EF9'
                            }
                        }}>
                        Generate New
                    </Button>
                </Box>
                <Grid container spacing={3} justifyContent="center">
                    {flashcards.map((flashcard, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                <CardActionArea sx={{flexGrow: 1}} onClick={() => handleCardClick(flashcard.name)}>
                                    <CardContent>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Typography variant='h6'>{capitalizeName(flashcard.name)}</Typography>
                                        </Box>
                                    </CardContent>
                                </CardActionArea>
                                <Button
                                    variant="outlined"
                                    sx={{
                                        mr: 2, 
                                        color: '#ADD8E6',
                                        '&:hover':{
                                            color: '#000080'
                                        }
                                        }}
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent triggering the card click
                                        handleDelete(flashcard.name)
                                    }}>
                                    Delete
                                </Button>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    )
}
