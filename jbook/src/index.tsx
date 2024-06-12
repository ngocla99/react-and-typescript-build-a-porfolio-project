import "bulmaswatch/superhero/bulmaswatch.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { CellList } from "./components";
import { store } from "./state";
import React from "react";
import startEsbuild from "./bundler/startEsbuild";

const App = () => {
  const [isLoaing, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      try {
        await startEsbuild();
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoaing) return <div>Loading...</div>;

  return (
    <Provider store={store}>
      <div className="">
        <CellList />
      </div>
    </Provider>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<App />);
