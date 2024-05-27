import Home from '../pages/Home/Home'
import Product from '../pages/Product/Product'
import Category from '../pages/Category/Category';
import Login from '../pages/Login/Login';
import Register from '../pages/Login/Register';
import User from '../pages/User/User';
import Error404 from '../pages/Error404/Error404';
import ProductDetails from '../pages/Product/ProductDetails/ProductDetails';
const publicRoutes = [
    {path: '/', component: Login},
    {path: '/product', component: Product},
    {path: '/category', component: Category},
    {path: '/home', component: Home},
    {path: '/register', component: Register},
    {path: '/user', component: User},
    {path: '/error404', component: Error404},
    {path: '/product_details/:id', component: ProductDetails}
]

const privateRoutes = []

export {publicRoutes, privateRoutes };