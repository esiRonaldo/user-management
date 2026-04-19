const API_URL = 'http://127.0.0.1:8000/users'

async function request(url, options = {}) {
    const res = await fetch(url, options)

    if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.detail || 'Request failed')
    }

    return res.status === 204 ? null : res.json()
}

export default {
    getAllUsers() {
        return request(API_URL)
    },

     getUserById(id) {
        return response = request(`${API_URL}/${id}`)
    },

    createUser(user) {
        return request(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        })
    },

    updateUser(id, user) {
        return request(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        })
    },

    deleteUser(id) {
        return request(`${API_URL}/${id}`, {
            method: 'DELETE',
        })
    },
}
