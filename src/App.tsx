import { observer } from 'mobx-react-lite';
import { HashRouter, useRoutes } from 'react-router-dom';
import { routes } from './router';

const AppRoutes = () => {
  const element = useRoutes(routes);
  return element;
};

export const App = observer(() => {
  return (
    <HashRouter>
      <AppRoutes />
    </HashRouter>
  );
});
