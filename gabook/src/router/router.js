import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Main from '../pages/Main';
import History from '../pages/History';

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
