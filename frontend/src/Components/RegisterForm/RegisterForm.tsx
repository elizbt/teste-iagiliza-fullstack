'use client'
import Link from "next/link"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { fetchWrapper } from "../../services/authService"
import { useState, useCallback } from 'react'
import { Loader2 } from 'lucide-react'

export default function RegisterForm() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)

    const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError(null)
        setSuccessMessage(null)
        setIsLoading(true)

        try {
            const data = { name, email, password }
            await fetchWrapper('/register', data);
            
            setSuccessMessage('Conta criada com sucesso! Agora você pode fazer login.')
            setName('')
            setEmail('')
            setPassword('')
            
        } catch (err: any) {
            console.error(err)
            setError(err.message || 'Ocorreu um erro ao tentar criar a conta.');
        } finally {
            setIsLoading(false)
        }
    }, [name, email, password])


    return (
        <section className="bg-[#F8FAFC] w-full min-h-screen flex items-center justify-center p-4">
            <Card className="w-full max-w-md p-8 shadow-2xl rounded-xl sm:px-6">
                <CardHeader className="text-center space-y-2">
                        <Link href="/" className="block">
                                <CardTitle className="text-3xl font-bold text-gray-900 cursor-pointer hover:opacity-80 transition">
                                AgiliChat
                                </CardTitle>
                        </Link>
                    <p className="text-gray-600 text-lg font-medium">Crie sua Conta</p>
                </CardHeader>
                
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-6 pt-5">
                       
                        <div className="space-y-2">
                            <Label htmlFor="nomeCompleto" className="text-lg font-medium text-gray-700">Nome completo</Label>
                            <Input 
                                id="nomeCompleto" 
                                type="text" 
                                placeholder="" 
                                className="h-12 border-gray-300 rounded-lg focus-visible:ring-[#8093F1]" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                disabled={isLoading}
                            />
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-lg font-medium text-gray-700">Email</Label>
                            <Input 
                                id="email" 
                                type="email" 
                                placeholder="" 
                                className="h-12 border-gray-300 rounded-lg focus-visible:ring-[#8093F1]" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={isLoading}
                            />
                        </div>
                     
                        <div className="space-y-2">
                            <Label htmlFor="senha" className="text-lg font-medium text-gray-700">Senha</Label>
                            <Input 
                                id="senha" 
                                type="password" 
                                placeholder="" 
                                className="h-12 border-gray-300 rounded-lg focus-visible:ring-[#8093F1]" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={isLoading}
                            />
                        </div>

                        {error && (
                            <p className="text-sm font-medium text-red-500 bg-red-50 p-3 rounded-md border border-red-200">
                                {error}
                            </p>
                        )}
                        {successMessage && (
                            <p className="text-sm font-medium text-green-700 bg-green-50 p-3 rounded-md border border-green-200">
                                {successMessage}
                            </p>
                        )}
                    </CardContent>

                    <CardFooter className="flex flex-col space-y-4 pt-6">
                        <Button 
                            type="submit"
                            className="w-full bg-[#8093F1] text-white h-12 rounded-lg text-lg font-semibold hover:bg-[#5C66C0] transition-colors duration-300 ease-in-out shadow-md active:scale-[0.98]"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processando</>
                            ) : (
                                'Entrar' 
                            )}
                        </Button>
                        
                        <div className="text-center mt-4 text-gray-600 text-sm">
                            Já tem uma conta?{" "}
                            <Link href="/login" className="text-[#8093F1] font-bold hover:text-[#5C66C0] transition-colors">
                                Entrar
                            </Link>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </section>
    );
}