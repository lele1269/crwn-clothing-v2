import Category from "../category/Category.component"
import "./categories.styles.scss"

const Directory = ({categories}) => {
  return (
    <div className="categories-container">
      {categories.map((category) => (
        <Category key={category.id} category={category} />
      ))}
    </div>
  );
}

export default Directory;