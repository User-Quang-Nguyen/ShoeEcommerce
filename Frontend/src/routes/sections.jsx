import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import DashboardLayout from 'src/layouts/dashboard';
import { ProtectedRouter } from 'src/routes/protected';

export const IndexPage = lazy(() => import('src/pages/app'));
export const OrderPage = lazy(() => import('src/pages/order'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const SignupPage = lazy(() => import('src/pages/signup'))
export const ProductsPage = lazy(() => import('src/pages/products'));
export const ProductDetail = lazy(() => import('src/pages/product-detail'));
export const UserInforPage = lazy(() => import('src/pages/profile'));
export const CartPage = lazy(() => import('src/pages/cart'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const account = useSelector(state => state.account);
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <ProductsPage />, index: true },
        { 
          path: 'user', 
          element: (
            <ProtectedRouter role={account.role} allowedRoles={[1]}>
              <UserPage />
            </ProtectedRouter>
          ) 
        },
        { 
          path: 'dashboard', 
          element: (
            <ProtectedRouter role={account.role} allowedRoles={[1]}>
              <IndexPage />
            </ProtectedRouter>
          ),
        },
        { path: 'order', element: <OrderPage /> },
        { path: 'cart', element: <CartPage />},
        { path: 'product', element: <ProductDetail />},
        { path: 'profile', element: <UserInforPage />},
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'signup',
      element: <SignupPage />
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
