import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux'

import { fetchUser, getAdmin, getUser, getUserStatus } from "./slices/authSlice/authSlice.js";

import { addAllAddress } from "./slices/clientSlice/AddressSlice.js";
import { addCartProduct } from "./slices/clientSlice/CartSlice.js";

import LoginPage from "./pages/authPages/LoginPage.jsx";
import SignupPage from "./pages/authPages/SignupPage.jsx";

import AdminLayout from "./layout/AdminLayout.jsx";
import ClientLayout from "./layout/ClientLayout.jsx";

import HomePage from "./pages/clientPages/HomePage.jsx";
import AllProductPages from "./pages/clientPages/productPages/AllProductPages.jsx";
import UserProfilePage from "./pages/clientPages/accountPages/UserProfilePage.jsx";

import AdminHomePage from "./pages/adminPages/AdminHomePage.jsx";
import AdminDashboardPage from "./pages/adminPages/AdminDashboardPage.jsx";
import AdminOrderPage from "./pages/adminPages/adminOrderPage/AdminOrderPage.jsx";
import AdminOrderViewPage from "./pages/adminPages/adminOrderPage/AdminOrderViewPage.jsx";
import AdminProductPage from "./pages/adminPages/adminProductPages/AdminProductPage.jsx";
import AdminAddNewProductPage from "./pages/adminPages/adminProductPages/AdminAddNewProductPage.jsx";
import AdminCustomerPage from "./pages/adminPages/adminCustomerPages/AdminCustomerPage.jsx";
import AdminStaffManagementPage from "./pages/adminPages/AdminStaffPages/AdminStaffManagementPage.jsx";
import AdminAddNewStaffPage from "./pages/adminPages/AdminStaffPages/AdminAddNewStaffPage.jsx";
import AdminAllStaffPage from "./pages/adminPages/AdminStaffPages/AdminAllStaffPage.jsx";
import AdminStaffViewPage from "./pages/adminPages/AdminStaffPages/AdminStaffViewPage.jsx";

import ProductPage from "./pages/clientPages/productPages/ProductPage.jsx";
import CartPage from "./pages/clientPages/cartPages/CartPage.jsx";
import CheckOutPage from "./pages/clientPages/orderPages/CheckOutPage.jsx";
import OrderPage from "./pages/clientPages/orderPages/OrderPage.jsx";
import OrderViewPage from "./pages/clientPages/orderPages/OrderViewPage.jsx";
import VerifyCheckOutOrderPage from "./pages/clientPages/orderPages/VerifyCheckOutOrderPage.jsx";

import PageNotFoundPage from "./pages/PageNotFoundPage.jsx";
import TestingPage from "./pages/TestingPage.jsx";


import { ToastContainer } from 'react-toastify';
import AdminProductViewPage from "./pages/adminPages/adminProductPages/AdminProductViewPage.jsx";
import AdminSupplierPage from "./pages/adminPages/adminSupplierPages/AdminSupplierPage.jsx";
import AdminSupplierViewPage from "./pages/adminPages/adminSupplierPages/AdminSupplierViewPage.jsx";
import AdminPurchaseEntryPage from "./pages/adminPages/adminPurchasePages/AdminPurchaseEntryPage.jsx";
import AdminAllPurchasesPage from "./pages/adminPages/adminPurchasePages/AdminAllPurchasesPage.jsx";
import AdminPurchaseViewPage from "./pages/adminPages/adminPurchasePages/AdminPurchaseViewPage.jsx";
import AdminBannerPage from "./pages/adminPages/adminBannerPages/AdminBannerPage.jsx";
import AdminCreateBannerPage from "./pages/adminPages/adminBannerPages/AdminCreateBannerPage.jsx";
import { getAdminCreateBannerStatus } from "./slices/adminSlice/adminBannerSlice.js";
import AdminEditBannerPage from "./pages/adminPages/adminBannerPages/AdminEditBannerPage.jsx";
import AdminEditProductPage from "./pages/adminPages/adminProductPages/AdminEditProductPage.jsx";
import AdminViewCustomerPage from "./pages/adminPages/adminCustomerPages/AdminViewCustomerPage.jsx";
import AdminGroupsCategoriesPage from "./pages/adminPages/adminGroups&CategoriesPages/AdminGroupsCategoriesPage.jsx"
import AdminBrandPage from './pages/adminPages/adminBrandPages/AdminBrandPage.jsx'
import AdminAddNewBrandPage from './pages/adminPages/adminBrandPages/AdminAddNewBrandPage.jsx'
import AdminEditBrandPage from "./pages/adminPages/adminBrandPages/AdminEditBrandPage.jsx";
import AdminViewBrandPage from './pages/adminPages/adminBrandPages/AdminViewBrandPage.jsx'
import AdminAddGroupPage from "./pages/adminPages/adminGroups&CategoriesPages/AdminAddGroupPage.jsx";
import AdminAddCategoryPage from './pages/adminPages/adminGroups&CategoriesPages/AdminAddCategoryPage.jsx'
import AdminEditCustomerPage from "./pages/adminPages/adminCustomerPages/AdminEditCustomerPage.jsx";
import AdminPurchasePage from "./pages/adminPages/adminProductPages/AdminPurchasePage.jsx";

import AdminCreateSupplierPage from "./pages/adminPages/adminSupplierPages/AdminCreateSupplierPage.jsx";



function App() {
    const dispatch = useDispatch()
    const handleRef = useRef(true)
    const handleRef2 = useRef(true)
    const handleRef3 = useRef(true)

    const user = useSelector(getUser)
    const userStatus = useSelector(getUserStatus)

    useEffect(()=>{
        if(handleRef.current){
            dispatch(fetchUser())
            handleRef.current = false
        }
        if(handleRef2.current && user){
            dispatch(addCartProduct(user.cart))
            handleRef2.current = false
        }
        if(handleRef3.current && user){
            dispatch(addAllAddress(user))
            handleRef3.current = false
        }
        }, [user]
    )

    if(userStatus == 'loading'){ return <div>loading...</div> }

  return (
    <>
    <ToastContainer />
    <Routes>

        <Route path="/">
            <Route index element={<HomePage />} />

{/* Auth */}
            <Route path="auth">
                <Route path="login" element={<LoginPage />} />
                <Route path="signup" element={<SignupPage />} />
            </Route>

{/* User Profile */}
            <Route path="profile" element={<ClientLayout />}>
                <Route index element={<UserProfilePage/>}/>
            </Route>

{/* Products */}
            <Route path="products" element={<ClientLayout />} >
                <Route index element={<AllProductPages/>}/>
                <Route path=':id' element={<ProductPage/>}/>
            </Route>

{/* Cart */}
            <Route path="cart" element={<ClientLayout />} >
                <Route index element={<CartPage/>}/>
            </Route>

{/* Checkout */}
            <Route path="checkout" element={<ClientLayout />} >
                <Route index element={<CheckOutPage/>}/>
                <Route path="verify_checkout_order" element={<VerifyCheckOutOrderPage />} />
            </Route>

{/* Order */}
            <Route path="order" element={<ClientLayout />} >
                <Route index element={<OrderPage/>}/>
                <Route path=":id" element={<OrderViewPage/>}/>
            </Route>

{/* Admin */}

            <Route path='admin' element={ <AdminLayout /> }>
                <Route path="home" element={<AdminHomePage />} />

                <Route path="dashboard" element={<AdminDashboardPage />} />
                <Route path="orders" element={<AdminOrderPage />} />

                <Route path="orders">
                    <Route index element={<AdminOrderPage />}/>
                    <Route path="order_id/:id" element={<AdminOrderViewPage/> } />
                </Route>

                <Route path="products">
                    <Route index element={<AdminProductPage />}/>
                    <Route path="new-product" element={<AdminAddNewProductPage />}/>
                    <Route path="edit/:id" element={<AdminEditProductPage />}/>
                    <Route path="low-in-stock" element={<div>Low in Stock</div>}/>
                    <Route path="product_id/:id" element={<AdminProductViewPage />}/>
                </Route>

                <Route path="groups-categories">
                    <Route index element={<AdminGroupsCategoriesPage  />}/>
                    <Route path="new-group" element={<AdminAddGroupPage />}/>
                    <Route path="new-category" element={<AdminAddCategoryPage />}/>

                </Route>

                <Route path="brands">
                    <Route index element={<AdminBrandPage />}/>
                    <Route path="new-brand" element={<AdminAddNewBrandPage />}/>
                    <Route path="edit/:id" element={<AdminEditBrandPage />}/>
                    <Route path=":id" element={<AdminViewBrandPage />}/>
                </Route>

                <Route path="customer">
                    <Route index element={<AdminCustomerPage />}/>
                    <Route path="customer_id/:id" element={<AdminViewCustomerPage /> } />
                    <Route path="edit/customer_id/:id" element={<AdminEditCustomerPage /> } />
                </Route>

                <Route path="purchase">
                    <Route index element={<AdminPurchasePage />}/>
                    <Route path="purchase-entry" element={<AdminPurchaseEntryPage /> } />
                    <Route path="all-purchases" element={<AdminAllPurchasesPage /> } />
                    <Route path="purchase/:id" element={<AdminPurchaseViewPage /> } />
                </Route>

                <Route path="supplier">
                    <Route index element={<AdminSupplierPage />}/>
                    <Route path="supplier_id/:id" element={<AdminSupplierViewPage />}/>
                    <Route path="create-supplier" element={<AdminCreateSupplierPage />}/>
                    <Route path="edit/supplier_id/:id" element={<div>Edit Supplier</div>}/>
                </Route>

                <Route path="stock" element={<div>stock</div>} />
                <Route path="notification" element={<div>notification</div>} />

                <Route path="staff">
                    <Route index element={<AdminStaffManagementPage />}/>
                    <Route path="create-staff" element={<AdminAddNewStaffPage />}/>
                    <Route path="all-staff" element={<AdminAllStaffPage />}/>
                    <Route path="staff_id/:id" element={<AdminStaffViewPage />}/>
                </Route>

                <Route path="payments" element={<div>payments</div>} />

                <Route path="banners">
                    <Route index element={<AdminBannerPage />}/>
                    <Route path="create-banner" element={<AdminCreateBannerPage />}/>
                    <Route path="edit-banner/:id" element={<AdminEditBannerPage />}/>
                </Route>
            </Route>

            <Route path="testing" element={<TestingPage />} />
            <Route path="*" element={<PageNotFoundPage />} />
            <Route path="404" element={<PageNotFoundPage />} />
        </Route>

    </Routes>
    </>
  )
}

export default App
