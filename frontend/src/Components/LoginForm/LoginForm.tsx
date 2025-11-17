'use client'
import Link from "next/link"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { fetchWrapper } from "../../services/authService" 
import { useState, useCallback } from 'react'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation' 

export default function LoginForm() {

    const router = useRouter()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError(null)
        setIsLoading(true)

        try {
            const data = { email, password }
          
            const response = await fetchWrapper('/login', data)

            localStorage.setItem('agilichat-token', response.token)
            localStorage.setItem('agilichat-user-email', data.email)

            router.push('/chat')
            
        } catch (err: any) {
            console.error(err)
            setError(err.message || 'Falha ao realizar login. Verifique suas credenciais.');
        } finally {
            setIsLoading(false)
        }
    }, [email, password])

    return (
        <section className="bg-[#F8FAFC] w-full min-h-screen flex items-center justify-center p-4">
    
            <Card className="w-full max-w-sm md:max-w-md py-10 px-6 shadow-2xl rounded-xl">
                <CardHeader className="text-center space-y-2 pt-0 pb-6">
                    <CardTitle className="text-3xl font-bold text-gray-900">AgiliChat</CardTitle>
                    <p className="text-gray-600 text-lg font-medium">Entre na sua Conta</p>
                </CardHeader>
                
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-6 pt-5 px-0">
                 
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

                    </CardContent>

                    <CardFooter className="flex flex-col space-y-4 pt-6 px-0">
                        <Button 
                            type="submit"
                            className="w-full bg-[#8093F1] text-white h-12 rounded-lg text-lg font-semibold hover:bg-[#5C66C0] transition-colors duration-300 ease-in-out shadow-md active:scale-[0.98]"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Entrando</>
                            ) : (
                                'Entrar' 
                            )}
                        </Button>
                        
                        <div className="text-center mt-4 text-gray-600 text-sm">
                            Não tem uma conta?{" "}
                            <Link href="/register" className="text-[#8093F1] font-bold hover:text-[#5C66C0] transition-colors">
                                Crie sua Conta
                            </Link>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </section>
    );
}