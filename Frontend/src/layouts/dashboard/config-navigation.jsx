import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard',
    icon: icon('ic_analytics'),
    role: "admin"
  },
  {
    title: 'product',
    path: '/',
    icon: icon('ic_shoe'),
  },
  {
    title: 'Cart',
    path: '/cart',
    icon: icon('ic_cart'),
  },
  {
    title: 'users',
    path: '/user',
    icon: icon('ic_users'),
    role: "admin"
  },
  {
    title: 'order',
    path: '/order',
    icon: icon('ic_order'),
  },
  {
    title: 'Product Management',
    path: '/manage',
    icon: icon('ic_management'),
    role: "admin"
  },
  {
    title: 'Profile',
    path: '/profile',
    icon: icon('ic_user'),
  },
];

export default navConfig;
