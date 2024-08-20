"use client"
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { CircularProgress, Container, Typography, Box } from '@mui/material'

const ResultPage = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const session_id = searchParams.get('session_id')

    const [loading, setLoading] = useState(true)
    const [session, setSession] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchCheckoutSession = async () => {
            if (!session_id) {
                router.push('/') // Redirect to homepage if session_id is not found
                return
            }

            try {
                const res = await fetch(`/api/checkout_session?session_id=${session_id}`)
                const sessionData = await res.json()
                
                if (res.ok) {
                    setSession(sessionData)
                } else {
                    setError(sessionData.error || 'Failed to retrieve session data.')
                    router.push('/') // Redirect to homepage on error
                }
            } catch (err) {
                setError('An error occurred while fetching the session data.')
                router.push('/') // Redirect to homepage on error
            } finally {
                setLoading(false)
            }
        }

        fetchCheckoutSession()
    }, [session_id, router])

    if (loading) {
        return (
            <Container maxWidth='100vw' sx={{ textAlign: 'center', mt: 4 }}>
                <CircularProgress />
                <Typography variant='h6'>Loading...</Typography>
            </Container>
        )
    }

    if (!session) {
        // This condition will be hit before the redirect happens.
        return null
    }

    return (
        <Container maxWidth='100vw' sx={{ textAlign: 'center', mt: 4 }}>
            {session.payment_status === "paid" ? (
                <>
                    <Typography variant='h4'>Thank you for your purchase!</Typography>
                    <Box sx={{ mt: 2 }}>
                        <Typography variant='h6'>Session ID: {session_id}</Typography>
                        <Typography variant='body1'>
                            We have received your payment. You will receive an email with the order details shortly.
                        </Typography>
                    </Box>
                </>
            ) : (
                <>
                    <Typography variant='h4' color="error">Payment Failed</Typography>
                    <Box sx={{ mt: 2 }}>
                        <Typography variant='body1'>
                            Your payment was not successful. Please try again.
                        </Typography>
                    </Box>
                </>
            )}
        </Container>
    )
}

export default ResultPage
