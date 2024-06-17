import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'Thống kê',
    path: '/dashboard',
    icon: icon('ic_analytics'),
    role: "admin"
  },
  {
    title: 'Sản phẩm',
    path: '/',
    icon: icon('ic_shoe'),
  },
  {
    title: 'Giỏ hàng',
    path: '/cart',
    icon: icon('ic_cart'),
  },
  {
    title: 'Quản lý người dùng',
    path: '/user',
    icon: icon('ic_users'),
    role: "admin"
  },
  {
    title: 'Đơn hàng',
    path: '/order',
    icon: icon('ic_order'),
  },
  {
    title: 'Quản lý sản phẩm',
    path: '/manage',
    icon: icon('ic_management'),
    role: "admin"
  },
  {
    title: 'Trang cá nhân',
    path: '/profile',
    icon: icon('ic_user'),
  },
];

export default navConfig;
