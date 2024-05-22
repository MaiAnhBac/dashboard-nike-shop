export const login = (email, password) => {
    return (
        fetch('https://api.escuelajs.co/api/v1/auth/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then((res) => res.json())
    )
};
export const authorization = (accessToken) => {
    return (
        fetch('https://api.escuelajs.co/api/v1/auth/profile', {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${accessToken}`,
            }
        })
            .then((res) => res.json())
            .then((data) => {
                localStorage.setItem('user', JSON.stringify(data))
            })
    )
};
export const getAllCategory = () => {
    return (
        fetch('https://api.escuelajs.co/api/v1/categories')
            .then(res => res.json())
    )
};
export const getCatesByCate = (cate) => {
    return (
        fetch(`https://api.escuelajs.co/api/v1/categories/${cate}`)
            .then(res => res.json())
    )
};
export const getAllProducts = () => {
    return (
        fetch('https://api.escuelajs.co/api/v1/products')
            .then(res => res.json())
    )
};
export const getProductsByCate = (cate) => {
    return (
        fetch(`https://api.escuelajs.co/api/v1/products/?categoryId=${cate}`)
            .then(res => res.json())
    )
};
export const getSearchProduct = (title) => {
    return (
        fetch(`https://api.escuelajs.co/api/v1/products/?title=${title}`)
            .then((res) => res.json())
    )
};
export const getAllUser = () => {
    return (
        fetch('https://api.escuelajs.co/api/v1/users')
            .then(res => res.json())
    )
};
export const deleteProduct = (id) => {
    return (
        fetch(`https://api.escuelajs.co/api/v1/products/${id}`,{
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: id
            })
        })
            .then((res) => res.json())
    )
}
export const deleteUser = (id) => {
    return (
        fetch(`https://api.escuelajs.co/api/v1/users/${id}`,{
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: id
            })
        })
            .then((res) => res.json())
    )
}