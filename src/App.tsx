import React from "react";
import { Routes, Route } from "react-router-dom";
import { TodoPage } from "./ui/pages/TodoPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<TodoPage />} />
    </Routes>
  );
}

export default App;
