
import React from 'react';
export const useUser = () => {
    const [user, setUser] = React.useState(null)
    const [isLoading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)
    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')


    const fetchUser = React.useCallback(async () => {
        try {
            setLoading(true)
        /* Fetching the user from the server. */
            const resp = await fetch('/api/user')
            const data = await resp.json()
            setUser(data)
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }
        , [])
    
    const handleNameChange = (e) => {
        setName(e.target.value)
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const resp = await fetch('/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            })
            const data = await resp.json()
            setUser(data)
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }
    






   