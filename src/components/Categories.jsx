import { Menu } from "antd";
import categoriesArray from "../asset/categoriesArray";

const Categories = () => {
  const categories = categoriesArray.map((e, index) => {
    return {
      label: e.categories,
      key: `category_${e.categories}_${index}`,
      children: e.subCategories,
    };
  });
  console.log("render cate");
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
