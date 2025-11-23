import Card from "./components/Card";
import Message from "./components/Message";
import Svgs from "./components/Svgs";
import { useState } from "react";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="App">
      <Svgs />
      <Card setIsLoading={setIsLoading} />
      <Message isLoading={isLoading} setIsLoading={setIsLoading} />
    </div>
  );
};

export default App;
