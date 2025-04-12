import { useState } from "react";
import Sidebar from "./components/Sidebar";
import ListProducts from "./components/ListProducts";

import { tabList } from "./data";

function App() {
  const [selectedPage, setPage] = useState(tabList[0].name);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar selectedPage={selectedPage} setPage={setPage} />
      {selectedPage === "Produtos" && <ListProducts />}
    </div>
  );
}

export default App;
