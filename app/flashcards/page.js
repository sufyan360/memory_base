"use client"
import {useUser} from '@clerk/nextjs'
import {useEffect, useState} from 'react'
import {CollectionReference, doc, getDoc, setDoc, collection} from 'firebase/firestore'
import {db} from '../../firebase'
import {useRouter} from 'next/navigation'
import { Container, Box, Typography, Grid, Card, CardActionArea, CardContent, Button, Paper, TextField, Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions, CircularProgress} from '@mui/material'
import Navbar from '../navbar'

export default function flashcards() {
    const {isLoaded, isSignedIn, user} = useUser()
    const [flashcards, setFlashcards] = useState([])
    const router = useRouter()

    useEffect(() => {
        async function getFlashcards(){
            if(!user) return
            const docRef = doc(collection(db, 'users'), user.id)
            const docSnapshots = await getDoc(docRef)

            if(docSnapshots.exists()){
                const collections = docSnapshots.data().flashcards || []
                setFlashcards(collections)
            } 
            else{
                await setDoc(docRef, {flashCards: []})
            }
        }
        getFlashcards()
    }, [user])

    if(!isLoaded || !isSignedIn) {
        return
    }

    const handleCardClick = (id) => {
        router.push(`/flashcard?id=${id}`)
    }

    return(
        <Container maxWidth='100vw'>
            <Navbar/>
            <Grid container spacing={3} sx={{mt:4}}>
                {flashcards.map((flashcard, index) => (
                    <Grid item xs={12} sm= {6} md={4} key={index}>
                       <Card>
                            <CardActionArea onClick={() => handleCardClick(flashcard.name)}>
                                <CardContent>
                                    <Typography variant='h6'>{flashcard.name}</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card> 
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}