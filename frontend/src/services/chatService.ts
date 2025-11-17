const API_BASE_URL = 'http://localhost:3334' 

export interface Message {
    id: string 
    content: string
    role: 'USER' | 'AI' 
    createdAt: string
    userId: string
}

async function getAuthHeaders() {
    const token = localStorage.getItem('agilichat-token')
    
    if (!token) {
        throw new Error('Usuário não autenticado. Por favor, faça login novamente.')
    }

    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, 
    }
}

export async function fetchMessageHistory(): Promise<Message[]> {
    const headers = await getAuthHeaders()

    const url = `${API_BASE_URL}/api/messages` 

    const response = await fetch(url, {
        method: 'GET',
        headers: headers,
    })

    if (!response.ok) {
        throw new Error('Falha ao carregar o histórico. Token inválido ou expirado.')
    }
    return response.json()
}

export async function sendMessage(content: string): Promise<Message> {
    const headers = await getAuthHeaders()
    const url = `${API_BASE_URL}/api/message` 

    const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ content }),
    })

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || 'Erro ao enviar mensagem para o servidor.')
    }
    
    return response.json()
}