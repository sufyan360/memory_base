'use client'
import { writeBatch, doc, getDoc, collection } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { Container, Box, Typography, Grid, Card, CardActionArea, CardContent, Button, Paper, TextField, Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions, CircularProgress } from '@mui/material'
import { useState } from 'react'
import {React, useEffect} from 'react'
import { db } from '../../firebase'
import Navbar from '../navbar'

export default function Generate() {
    const { isLoaded, isSignedIn, user } = useUser()
    const [flashcards, setFlashcards] = useState([])
    const [flipped, setFlipped] = useState([])
    const [text, setText] = useState('')
    const [name, setName] = useState('')
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false);
    const router = useRouter()

    useEffect(() => {
        if (!isSignedIn){
            router.push('/');
        }
    }, [isSignedIn]);

    const handleSubmit = async () => {
        setLoading(true)
        fetch('api/generate', {
            method: 'POST',
            body: text,
        })
            .then((res) => {
                if (!res.ok) throw new Error('Network response was not ok');
                return res.json();
            })
            .then(data => {
                console.log(data)
                setFlashcards(data);
                setLoading(false)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false)
            });
    };

    const handleCardClick = (id) => {
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id],
        }))
    }

    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    const saveFlashcards = async () => {
        if (!name) {
            alert('Please enter a name')
            return
        }

        const batch = writeBatch(db)
        const userDocRef = doc(collection(db, 'users'), user.id)
        const docSnapshots = await getDoc(userDocRef)

        if (docSnapshots.exists()) {
            const collections = docSnapshots.data().flashcards || []

            if (collections.find((f) => f.name === name)) {
                alert('Flashcard collection with same name already exists')
                return
            }

            collections.push({ name })
            batch.set(userDocRef, { flashcards: collections }, { merge: true })
        }
        else {
            batch.set(userDocRef, { flashcards: [{ name }] })
        }

        const colRef = collection(userDocRef, name)
        flashcards.forEach(flashcard => {
            const cardDocRef = doc(colRef)
            batch.set(cardDocRef, flashcard)
        });

        await batch.commit()
        handleClose()
        router.push('/flashcards')
    }

    return (
        <Container maxWidth='md' sx={{paddingTop: '10vh'}}>
            <Navbar />
            <Box
                sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
                <Typography 
                    variant='h3' 
                    sx={{ 
                        mr: 2,
                        fontWeight: 'bold', 
                        background: 'linear-gradient(to bottom, #000080, #601EF9)', 
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
                        m: '4vh 4vw'
                        }}
                >
                    Generate Flashcards
                </Typography>
                <Paper sx={{ 
                    p: 4, width: '100%', 
                    display: 'flex',
                    flexDirection:'column',
                    justifyContent: 'center', 
                    alignItems: 'center'}}>
                    <TextField
                        value={text}
                        onChange={(e) =>
                            setText(e.target.value)}
                        label="Enter Topic"
                        fullWidth
                        multiline
                        rows={1}
                        variant='outlined'
                        sx={{ md: 2 }}
                    />
                    <Button
                        variant='contained'
                        sx={{color: 'white',
                            textAlign: 'center',
                            mt: 2,
                            width: '20vw',
                            borderRadius: 15,
                            backgroundColor: '#000080',
                            '&:hover':{
                                color: 'white',
                                backgroundColor: '#601EF9'
                            }
                        }}
                        onClick={handleSubmit}
                        fullWidth
                        disabled={loading}>
                        {loading ? <CircularProgress size={24} /> : 'Submit'}
                    </Button>
                </Paper>
            </Box>
            {flashcards.length > 0 && (
                <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}> 
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        <Typography 
                            variant='h3' 
                            align='center'
                            sx={{
                                background: 'linear-gradient(to bottom, #ADD8E6, #601EF9)', 
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
                                margin: '3vh auto'}}>
                            Flashcards Generated
                        </Typography>
                        <Button 
                            variant='contained' 
                            sx={{borderRadius: 15,
                                backgroundColor: '#601EF9',
                                '&:hover':{
                                    color: '#601EF9',
                                    backgroundColor: 'white'
                                }
                            }}
                            onClick={handleOpen}>
                            Save
                        </Button>
                    </Box>      
                    <Grid container spacing={3} justifyContent="center">
                        {flashcards.map((flashcard, index) => (
                            <Grid item xs={12} md={4} key={index}>
                                <Card>
                                    <CardActionArea onClick={() => { handleCardClick(index) }}>
                                        <CardContent>
                                            <Box sx={{
                                                perspective: '1000px',
                                                '& > div': {
                                                    transition: 'transform 0.5s',
                                                    transformStyle: 'preserve-3d',
                                                    position: 'relative',
                                                    width: '100%',
                                                    height: '200px',
                                                    boxShadow: '0 4px 8px 0 rgba(0, 0 ,0 , 0.2)',
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
            <Dialog open={open} onClose={handleClose} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent:"center", textAlign:'center'}}>
                <DialogTitle sx={{color: '#000080'}} >Save Flashcards</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{color: '#000080'}}>
                        Please enter a name for your flashcards collection
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Collection Name"
                        type='text'
                        fullWidth
                        value={name}
                        autoComplete='no'
                        onChange={(e) => setName(e.target.value)}
                        variant='outlined'
                    >
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={saveFlashcards}>Save</Button>
                </DialogActions>
            </Dialog>
        </Container>
    )
}
