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
        .then((res) => {
            if(!res.ok) {
                throw new Error('Có lỗi xảy ra ' + res.status);
            }
            res.json()
        })
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
            .then((res) => {
                if(!res.ok) {
                    throw new Error('Có lỗi xảy ra ' + res.status);
                }
                res.json()
            })
                
    )
};
export const createNewProduct =(title,price,description,categoryId,images) => {
    return (
        fetch('https://api.escuelajs.co/api/v1/products/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: title,
                price: price,
                description: description,
                categoryId: categoryId,
                images: images
            })
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Có lỗi xảy ra ' + res.status);
                }
                res.json()})
    )
}
export const postAddNewUser = (name, email,avatar, password, role) => {
    return (
        fetch('https://api.escuelajs.co/api/v1/users/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: name,
                email: email,
                avatar: avatar,
                password: password,
                role: role
            })
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Có lỗi xảy ra ' + res.status);
                }
                res.json()})
    )
};
export const getProductsByLimit = (off, limit) => {
    return (
        fetch(`https://api.escuelajs.co/api/v1/products?offset=${off}&limit=${limit}`)
            .then(res => res.json())
    )
};
export const deleteCategory = (id) => {
    return (
        fetch(`https://api.escuelajs.co/api/v1/categories/${id}`,{
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: id
            })
        })
            .then((res) => {
                if (!res.ok) {
                    if (res.status === 401) {
                        throw new Error('Unauthorized access - Error 401');
                    } else {
                        throw new Error('Có lỗi xảy ra: ' + res.status);
                    }
                }
                res.json()
            })
                
    )
};
