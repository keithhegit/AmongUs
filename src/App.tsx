import { observer } from 'mobx-react-lite';
import { RouterProvider } from 'react-router-dom';
import router from './router';

export const App = observer(() => {
  return <RouterProvider router={router} />;
});
