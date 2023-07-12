import { Dropdown } from "antd";
import React from "react";
import categoriesArray from "../../asset/categoriesArray";

function HorizontalMenuDropdown() {
  const menu = categoriesArray.map((category) => {
    return (
      <div className="list-item list-none" key={category.categories}>
        <div className="relative block h-full w-full">
          <Dropdown
            menu={{ items: category.subCategories }}
            className="mx-3 h-14 relative inline-flex justify-center items-center align-middle"
            placement="bottom"
          >
            <a href="/">{category.categories}</a>
          </Dropdown>
        </div>
      </div>
    );
  });
  return (
    <div className="shadow-md flex flex-wrap justify-center place-items-center h-14 overflow-y-hidden list-none">
      {!!categoriesArray ? menu : <p>Loading categories</p>}
    </div>
  );
}

export default HorizontalMenuDropdown;
