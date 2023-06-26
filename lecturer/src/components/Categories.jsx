import { Menu } from "antd";
import categoriesArray from "../asset/categoriesArray";

const Categories = () => {
  const categories = categoriesArray.map((item, index) => {
    return {
      label: item.categories,
      key: item.categories,
      children: item.subCategories,
    };
  });
  const items = [
    {
      label: <a href="/#">Categories</a>,
      key: "categories",
      children: categories,
    },
  ];
  return <Menu items={items} />;
};
export default Categories;
