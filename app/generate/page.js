'use client'
export default function Generate(){
    const {isLoaded, isSignedIn,user} = useUser()
    const [flashcards, setFlashcards] = useState([])
    const [flipped, setFlipped] = useState([])
    const [text, setText] = useState('')
    const [name, setName] = useState('')
    const [open, setOpen] = useState(false)
    const router = useRouter()

    const handleSubmit=async ()=>{
        fetch('api/generate', {
            method: 'POST',
            body: text,
        })
            .then((res) => res.json())
            .then(data > setFlashcards(data))
    }

    const handleCardClick = (id) => {
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id],
        }))
    }

    const handleOpen = () => {
        setOpenI(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
}