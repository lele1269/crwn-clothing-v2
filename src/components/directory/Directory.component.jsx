import Category from "../category/Category.component"

const Directory = ({categories}) => {
    console.log(categories)
  return (
    <div className="categories-container">
      {categories.map((category) => (
        <Category key={category.id} category={category} />
      ))}
    </div>
  );
}

export default Directory;