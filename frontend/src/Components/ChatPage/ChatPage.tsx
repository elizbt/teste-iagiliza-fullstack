'use client'
import { useState, useRef, useEffect, useCallback } from 'react'
import { Input } from "../ui/input" 
import { Button } from "../ui/button"
import { FaPaperPlane } from 'react-icons/fa' 
import { FiLogOut, FiUser } from 'react-icons/fi'
import { AiOutlineLoading3Quarters } from 'react-icons/ai' 
import { fetchMessageHistory, sendMessage, Message } from "@/services/chatService" 
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import React from 'react'
import MessageBubble from './MessageBubble' 

interface UserProfileInfo {
    name: string
    email: string
}

const getProfileFromLocalStorage = (): UserProfileInfo | null => {
    const storedEmail = localStorage.getItem('agilichat-user-email')
    
    if (storedEmail) {
        const storedName = localStorage.getItem('agilichat-user-name') 
        return { name: storedName || storedEmail.split('@')[0], email: storedEmail }
    }
    return null
}

export default function ChatPage() {
    const router = useRouter()
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false) 
    const [isHistoryLoading, setIsHistoryLoading] = useState(true) 
    const [userProfile, setUserProfile] = useState<UserProfileInfo | null>(null)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        document.body.style.backgroundColor = '#F8FAFC' 
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [])

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])


    const handleLogout = useCallback(() => {
        localStorage.removeItem('agilichat-token')
        localStorage.removeItem('agilichat-user-email')
        localStorage.removeItem('agilichat-user-name') 
        router.push('/login') 
    }, [router])

    const handleClearChat = () => {
        setMessages([])
    }

    useEffect(() => {
        const loadChat = async () => {
            const profile = getProfileFromLocalStorage()
            setUserProfile(profile)
            
            if (!localStorage.getItem('agilichat-token')) {
                return handleLogout()
            }
            
            try {
                const history = await fetchMessageHistory()
                setMessages(history)
            } catch (error) {
                console.error("Erro ao carregar chat:", error)
                handleLogout() 
            } finally {
                setIsHistoryLoading(false)
            }
        }
        loadChat()
    }, [handleLogout])

    const handleSendMessage = useCallback(async (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim() || isLoading) return

        const userContent = input
        
        const userMessagePlaceholder: Message = { 
            id: String(Date.now()), 
            content: userContent, 
            role: 'USER',
            createdAt: new Date().toISOString(),
            userId: userProfile?.email || ''
        }
        setMessages(prev => [...prev, userMessagePlaceholder])
        setInput('')
        setIsLoading(true)

        try {
            const aiMessage = await sendMessage(userContent)
            setMessages(prev => [...prev.filter(msg => msg.id !== userMessagePlaceholder.id), userMessagePlaceholder, aiMessage])

        } catch (error) {
            console.error("Erro ao obter resposta do chat:", error)
            setMessages(prev => [...prev, { 
                id: String(Date.now()), 
                content: "Desculpe, falha na comunicação. Tente novamente.", 
                role: 'AI', 
                createdAt: new Date().toISOString(),
                userId: '' 
            }])
        } finally {
            setIsLoading(false)
        }
    }, [input, isLoading, userProfile])

    if (isHistoryLoading) {
        return (
            <div className="bg-[#F8FAFC] w-screen h-screen flex items-center justify-center">
                <AiOutlineLoading3Quarters className="h-8 w-8 animate-spin text-[#8093F1]" />
                <p className="ml-3 text-lg text-gray-700">Carregando Chat...</p>
            </div>
        )
    }

    return (
        <div className="bg-[#F8FAFC] w-screen h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-lg h-full md:max-h-[85vh] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden">

                <header className="shrink-0 p-4 flex justify-between items-center z-10 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-[#CBB0F0] text-white flex items-center justify-center font-bold text-sm shrink-0">AC</div>
                        <div className="flex flex-col">
                            <h1 className="text-lg font-bold text-gray-800">AgiliChat Bot</h1>
                            <span className="text-xs text-green-500 font-medium">Online</span>
                        </div>
                    </div>
                    
                    <div className="flex space-x-2">
                        <Link href="/profile" passHref>
                            <Button
                                variant="ghost"
                                className="text-gray-600 hover:bg-gray-100 transition-colors duration-200 p-2"
                                title="Ver Perfil"
                            >
                                <FiUser size={20} />
                            </Button>
                        </Link>
                    
                        <Button
                            onClick={handleLogout}
                            variant="ghost"
                            className="text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors duration-200 p-2"
                            title="Deslogar"
                        >
                            <FiLogOut size={20} />
                        </Button>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-white">
                    {messages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500 text-center text-sm">
                            <FiUser size={24} className="mb-2 text-[#8093F1]"/>
                            <span className='max-w-xs'>
                                Olá {userProfile?.name || 'usuário'}! Meu nome é AgiliChat Bot. Como posso te ajudar hoje?
                            </span>
                        </div>
                    ) : (
                        messages.map((msg) => (
                            <MessageBubble key={msg.id} message={msg} /> 
                        ))
                    )}
                    
                    {isLoading && (
                        <div className="flex justify-start mb-3">
                            <div className="max-w-[80%] p-3 shadow-md bg-[#CBB0F0] rounded-t-xl rounded-br-xl text-white text-sm md:text-base flex items-center pl-1 ml-2">
                                <AiOutlineLoading3Quarters className="mr-2 h-4 w-4 animate-spin" /> Digitanto...
                            </div>
                        </div>
                    )}
                    
                    <div ref={messagesEndRef} />
                </main>

                <footer className="shrink-0 bg-white p-4 z-10 border-t border-gray-100">
                    <form onSubmit={handleSendMessage} className="flex items-center">
                        <Input
                            type="text"
                            placeholder="Digite sua mensagem..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            disabled={isLoading}
                            className="flex-1 h-10 rounded-lg px-4 border-gray-300 focus-visible:ring-[#8093F1] focus-visible:ring-offset-0"
                        />
                        <Button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className="ml-3 h-10 w-12 rounded-lg bg-[#4A4E69] hover:bg-[#3B3F54] transition-colors duration-200 p-0"
                        >
                            <FaPaperPlane size={18} />
                        </Button>
                    </form>
                </footer>
            </div>
        </div>
    )
}