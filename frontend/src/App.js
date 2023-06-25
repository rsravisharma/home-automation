import './App.css';

import { RouterProvider, useRoutes } from 'react-router-dom';
// import GlobalStyles from './components/GlobalStyles';
import Provider from "./theme/Provider";
import routes from './routes';

function App() {
  return (
    <Provider>
      {/* <GlobalStyles /> */}
      <RouterProvider router={routes}/>
    </Provider>
  );
}

export default App;
