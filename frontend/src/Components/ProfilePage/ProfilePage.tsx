'use client'
import { useCallback, useState, useEffect } from 'react'
import { Loader2, CheckCircle, XCircle } from 'lucide-react'
import { useRouter } from 'next/navigation' 

import { Button } from '../ui/button' 
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

import { getProfile, updateProfile, UserProfile } from '../../services/authService'

export default function ProfilePage() {
    const [user, setUser] = useState<UserProfile>({ name: '', email: '' });
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const router = useRouter();

    useEffect(() => {
        const fetchUserData = async () => {
            setIsFetching(true);
            setError(null);
            try {
                const profile = await getProfile();
                setUser(profile);
                setName(profile.name);
                setEmail(profile.email);
            } catch (err: any) {
                console.error(err);
                setError('Erro ao carregar o perfil. Você pode precisar logar novamente.');
            } finally {
                setIsFetching(false);
            }
        };

        fetchUserData();
    }, []);


    const isFormDirty = name !== user.name || email !== user.email;

    const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);
        setIsLoading(true);

        const dataToUpdate: Partial<UserProfile> = {};
        if (name !== user.name) dataToUpdate.name = name;
        if (email !== user.email) dataToUpdate.email = email;

        if (Object.keys(dataToUpdate).length === 0) {
            setIsLoading(false);
            setError('Nenhuma alteração detectada.');
            return;
        }

        try {

            const response = await updateProfile(dataToUpdate);
            
            setUser({ name: response.user.name, email: response.user.email }); 
            setName(response.user.name);
            setEmail(response.user.email);
            
            setSuccessMessage(response.message || 'Dados atualizados com sucesso!');
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Falha ao atualizar dados. Tente novamente.');
        } finally {
            setIsLoading(false);
        }
    }, [name, email, user.name, user.email]);


    return (
        <section className="bg-[#F8FAFC] w-full min-h-screen flex items-center justify-center p-4">
            <Card className="w-full max-w-sm md:max-w-md py-10 px-6 shadow-2xl rounded-xl">
                <CardHeader className="text-center space-y-2 pt-0 pb-6">
                    <CardTitle className="text-3xl font-bold text-gray-900">Meu Perfil</CardTitle>
                    <p className="text-gray-600 text-lg font-medium">Edite seus dados pessoais</p>
                </CardHeader>
                
                {isFetching ? (
                    <div className="flex justify-center items-center h-48">
                        <Loader2 className="h-8 w-8 animate-spin text-[#8093F1]" />
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-6 pt-5 px-0">
                        
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-lg font-medium text-gray-700">Nome</Label>
                                <Input 
                                    id="name" 
                                    type="text" 
                                    placeholder="Seu nome completo" 
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
                                    placeholder="seu.email@exemplo.com" 
                                    className="h-12 border-gray-300 rounded-lg focus-visible:ring-[#8093F1]" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    disabled={isLoading}
                                />
                            </div>

                            {successMessage && (
                                <p className="text-sm font-medium text-green-700 bg-green-100 p-3 rounded-md border border-green-300 flex items-center">
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                    {successMessage}
                                </p>
                            )}

                            {error && (
                                <p className="text-sm font-medium text-red-500 bg-red-50 p-3 rounded-md border border-red-200 flex items-center">
                                    <XCircle className="mr-2 h-4 w-4" />
                                    {error}
                                </p>
                            )}

                        </CardContent>

                        <CardFooter className="flex flex-col space-y-4 pt-6 px-0">
                            <Button 
                                type="submit"
                                className="w-full bg-[#8093F1] text-white h-12 rounded-lg text-lg font-semibold hover:bg-[#5C66C0] transition-colors duration-300 ease-in-out shadow-md active:scale-[0.98]"
                                disabled={isLoading || isFetching || !isFormDirty} 
                            >
                                {isLoading ? (
                                    <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Salvando...</>
                                ) : (
                                    'Salvar Alterações' 
                                )}
                            </Button>
                        </CardFooter>
                    </form>
                )}
            </Card>
        </section>
    );
}