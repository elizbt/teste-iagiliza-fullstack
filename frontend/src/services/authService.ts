export interface UserProfile {
    name: string
    email: string
}

export interface AuthResponse {
    token: string
    user: UserProfile
}

export interface UpdateProfileResponse {
    message: string
    user: UserProfile
}

const API_BASE_URL = 'http://localhost:3334'

function getAuthToken(): string | null {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('agilichat-token')
    }
    return null
}

export async function fetchWrapper(
    endpoint: string, 
    data?: any, 
    method: 'POST' | 'PUT' | 'GET' | 'PATCH' = 'POST'
): Promise<any> {
    
    const token = getAuthToken()
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    }

    if (token) {
        headers['Authorization'] = `Bearer ${token}`
    }

    let url: string;
    
    if (endpoint.startsWith('/api')) {
        url = `${API_BASE_URL}${endpoint}`; 
    } else {
        url = `${API_BASE_URL}/auth${endpoint}`;
    }
    
    const config: RequestInit = {
        method,
        headers,
    }

    if (method !== 'GET' && data) {
        config.body = JSON.stringify(data)
    }
    
    const response = await fetch(url, config)

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
            name: responseData.user?.name || data.email.split('@')[0], 
            email: data.email 
        };
        if (user.name) {
            localStorage.setItem('agilichat-user-name', user.name);
        }
        localStorage.setItem('agilichat-user-email', user.email);
        return { token: responseData.token, user: user }
    } 

    if (endpoint === '/register') {
        return { message: responseData.message || 'Registro bem-sucedido.' }
    }
    
    return responseData
}


export async function updateProfile(data: Partial<UserProfile>): Promise<UpdateProfileResponse> {
    const response = await fetchWrapper('/api/me', data, 'PATCH') 
    
    if (response.email) {
        localStorage.setItem('agilichat-user-email', response.email);
    }
    if (response.name) {
        localStorage.setItem('agilichat-user-name', response.name);
    }
    
    return { 
        message: 'Perfil atualizado com sucesso!', 
        user: { name: response.name, email: response.email }
    } as UpdateProfileResponse
}

export async function getProfile(): Promise<UserProfile> {
    const response = await fetchWrapper('/api/me', undefined, 'GET') 
    return { name: response.name, email: response.email } as UserProfile
}