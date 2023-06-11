import { Dropdown } from "antd";
import React from "react";
import categoriesArray from "../asset/categoriesArray";

function HorizontalMenuDropdown() {
  const menu = categoriesArray.map((category) => {
    return (
      <Dropdown
        key={category.categories}
        menu={{ items: category.subCategories }}
        className="mx-3"
        placement="bottom"
      >
        <a href="/">{category.categories}</a>
      </Dropdown>
    );
  });
  return (
    <div className="shadow-md flex justify-center place-items-center h-14">
      {!!categoriesArray ? menu : <p>Loading categories</p>}
    </div>
  );
}

export default HorizontalMenuDropdown;
