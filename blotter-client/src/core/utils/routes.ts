export interface Route {
  id: number;
  title: string;
  path: string;
  // icon: (OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & { muiName: string }) | null;
}

export type RoutesType = {
  index: Route;
  signin: Route;
  signup: Route;
  users: Route;
};

export const routes: RoutesType = {
  index: {
    id: 1,
    title: '',
    path: '/',
  },
  signin: {
    id: 2,
    title: 'Вход',
    path: '/signin',
  },
  signup: {
    id: 3,
    title: 'Регистрация',
    path: '/signup',
  },
  users: {
    id: 4,
    title: 'Пользователи',
    path: '/users',
  },
};

export const NavPath = [];
