import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

import { persistor, store } from "./store";

import { Routing, AddTaskButton } from "pages";
import { withProviders } from "./providers";

import "./styles/index.scss";

const App = () => {
  return (
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>
        <div className="app">
          <Routing />
          <AddTaskButton />
        </div>
      </Provider>
    </PersistGate>
  );
};

export default withProviders(App);
