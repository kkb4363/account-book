import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import History from '../pages/History';
import Main from '../pages/Main';

const router = createBrowserRouter([
  {
    path: '',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Main />,
      },
      {
        path: '/history',
        element: <History />,
      },
    ],
  },
]);

export default router;
