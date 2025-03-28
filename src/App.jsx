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
import AdminAllProductPage from "./pages/adminPages/adminProductPages/AdminAllProductPage.jsx";
import AdminProductPage from "./pages/adminPages/adminProductPages/AdminProductPage.jsx";
import AdminAddNewProductPage from "./pages/adminPages/adminProductPages/AdminAddNewProductPage.jsx";
import AdminAllCustomerPage from "./pages/adminPages/adminCustomerPages/AdminAllCustomerPage.jsx";
import AdminCustomerPage from "./pages/adminPages/adminCustomerPages/AdminCustomerPage.jsx";
import AdminStaffManagement from "./pages/adminPages/AdminStaffPages/AdminStaffManagement.jsx";
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
import AdminCreateSupplier from "./pages/adminPages/adminSupplierPages/AdminCreateSupplier.jsx";
import AdminAllSuppliersPage from "./pages/adminPages/adminSupplierPages/AdminAllSuppliersPage.jsx";
import AdminSupplierViewPage from "./pages/adminPages/adminSupplierPages/AdminSupplierViewPage.jsx";
import AdminEntryPage from "./pages/adminPages/AdminEntryPage.jsx";
import AdminPurchaseEntryPage from "./pages/adminPages/adminPurchasePages/AdminPurchaseEntryPage.jsx";
import AdminAllPurchasesPage from "./pages/adminPages/adminPurchasePages/AdminAllPurchasesPage.jsx";
import AdminPurchaseViewPage from "./pages/adminPages/adminPurchasePages/AdminPurchaseViewPage.jsx";
import AdminBannerPage from "./pages/adminPages/adminBannerPages/AdminBannerPage.jsx";
import AdminCreateBannerPage from "./pages/adminPages/adminBannerPages/AdminCreateBannerPage.jsx";
import { getAdminCreateBannerStatus } from "./slices/adminSlice/adminBannerSlice.js";
import AdminEditBannerPage from "./pages/adminPages/adminBannerPages/AdminEditBannerPage.jsx";
import AdminLowInStockPage from "./pages/adminPages/adminProductPages/AdminLowInStockPage.jsx";

function App() {
    const dispatch = useDispatch()
    const handleRef = useRef(true)
    const handleRef2 = useRef(true)
    const handleRef3 = useRef(true)

    const isAdmin = useSelector(getAdmin)
    const user = useSelector(getUser)
    const userStatus = useSelector(getUserStatus)
    const bannerStatus = useSelector(getAdminCreateBannerStatus)

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
    <div>
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
            <Route path="product" element={<ClientLayout />} >
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
            {isAdmin &&

            <Route path='admin' element={ <AdminLayout /> }>
                <Route index element={<AdminHomePage />} />

                <Route path="dashboard" element={<AdminDashboardPage />} />
                <Route path="orders" element={<AdminOrderPage />} />

                <Route path="orders">
                    <Route index element={<AdminOrderPage />}/>
                    <Route path=":id" element={<AdminOrderViewPage/> } />
                </Route>

                <Route path="products">
                    <Route index element={<AdminProductPage />}/>
                    <Route path="new-product" element={<AdminAddNewProductPage />}/>
                    <Route path="all-product" element={<AdminAllProductPage />}/>
                    <Route path="low-in-stock" element={<AdminLowInStockPage />}/>
                    <Route path=":id" element={<AdminProductViewPage />}/>
                </Route>

                <Route path="customers">
                    <Route index element={<AdminAllCustomerPage />}/>
                    <Route path=":id" element={<AdminCustomerPage /> } />
                </Route>

                <Route path="entry">
                    <Route index element={<AdminEntryPage />}/>
                    <Route path="purchase-entry" element={<AdminPurchaseEntryPage /> } />
                    <Route path="all-purchases" element={<AdminAllPurchasesPage /> } />
                    <Route path="purchase/:id" element={<AdminPurchaseViewPage /> } />
                </Route>

                <Route path="supplier">
                    <Route index element={<AdminSupplierPage />}/>
                    <Route path="create-supplier" element={<AdminCreateSupplier />}/>
                    <Route path="all-supplier" element={<AdminAllSuppliersPage />}/>
                    <Route path=":id" element={<AdminSupplierViewPage />}/>
                </Route>

                <Route path="stock" element={<div>stock</div>} />
                <Route path="notification" element={<div>notification</div>} />

                <Route path="staff">
                    <Route index element={<AdminStaffManagement />}/>
                    <Route path="new-staff" element={<AdminAddNewStaffPage />}/>
                    <Route path="all-staff" element={<AdminAllStaffPage />}/>
                    <Route path=":id" element={<AdminStaffViewPage />}/>
                </Route>

                <Route path="payments" element={<div>payments</div>} />

                <Route path="banners">
                    <Route index element={<AdminBannerPage />}/>
                    <Route path="create-banner" element={<AdminCreateBannerPage />}/>
                    <Route path="edit-banner/:id" element={<AdminEditBannerPage />}/>
                </Route>
            </Route>
            }

            <Route path="testing" element={<TestingPage />} />
            <Route path="*" element={<PageNotFoundPage />} />
            <Route path="404" element={<PageNotFoundPage />} />
        </Route>

    </Routes>
    </div>
  )
}

export default App
