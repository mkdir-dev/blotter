export interface Route {
  id: number;
  title: string;
  path: string;
  icon: null;
}

export type RoutesType = {
  index: Route;
  signin: Route;
  signup: Route;
};

export const routes: RoutesType = {
  index: {
    id: 1,
    title: '',
    path: '/',
    icon: null,
  },
  signin: {
    id: 2,
    title: 'Sign In',
    path: '/signin',
    icon: null,
  },
  signup: {
    id: 3,
    title: 'Sign Up',
    path: '/signup',
    icon: null,
  },
};
