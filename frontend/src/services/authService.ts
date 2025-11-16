export interface UserProfile {
  name: string
  email: string
}

export interface AuthResponse {
    token: string
    user: UserProfile
}

export async function fetchWrapper(endpoint: string, data: any): Promise<AuthResponse> {
 
    const API_BASE_URL = 'http://localhost:3334'
    const url = `${API_BASE_URL}/auth${endpoint}`
  
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    const responseData = await response.json().catch(() => ({}))

    if (!response.ok) {
        
        if (responseData && responseData.message) {
             throw new Error(responseData.message)
        }
        
        if (responseData && responseData.issues) {
             const firstIssueKey = Object.keys(responseData.issues)[0]
             const issueMessage = responseData.issues[firstIssueKey]._errors?.[0] || 'Erro de validação de campo.'
             throw new Error(`Validação: ${firstIssueKey} - ${issueMessage}`)
        }
   
        throw new Error(`Erro ${response.status}: Falha na comunicação com o servidor.`)
    }

    if (endpoint === '/login' && responseData.token) {
        const user: UserProfile = { 
            name: responseData.user?.name || 'Usuário', 
            email: data.email 
        }; 
        return { token: responseData.token, user: user }
    } 

    if (endpoint === '/register') {
       
        return { token: 'registration-success', user: { name: data.name, email: data.email } }
    }
    throw new Error('Resposta de API inesperada no sucesso.')
}