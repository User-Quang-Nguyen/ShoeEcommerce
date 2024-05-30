import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const OrderPage = lazy(() => import('src/pages/order'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const SignupPage = lazy(() => import('src/pages/signup'))
export const ProductsPage = lazy(() => import('src/pages/products'));
export const ProductDetail = lazy(() => import('src/pages/product-detail'));
export const CartPage = lazy(() => import('src/pages/cart'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
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
        { path: 'user', element: <UserPage /> },
        { path: 'dashboard', element: <IndexPage /> },
        { path: 'order', element: <OrderPage /> },
        { path: 'cart', element: <CartPage />},
        { path: 'product', element: <ProductDetail />}
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
