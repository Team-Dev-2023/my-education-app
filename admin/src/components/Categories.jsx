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
      label: "Categories",
      key: "Categories",
      children: categories,
    },
  ];
  return <Menu mode="horizontal" items={items} />;
};
export default Categories;
