import categories from "./components/categories/categories.component"
import Directory from "./components/directory/Directory.component"

const App = () => {
  return (
<Directory categories={categories}/>
  );
};

export default App;
