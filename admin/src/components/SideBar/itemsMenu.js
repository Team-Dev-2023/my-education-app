export const itemMenus = (userInfo) => {
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

  const items = [
    getItem(null, null, null, [getItem("Home", "0")], "group"),
    getItem("Course", "Course", null, [getItem("List Course", "1")], "group"),
    getItem(
      "User",
      "User",
      null,
      userInfo.data.role === 0
        ? [getItem("List user", "2"), getItem("Create Account Admin", "3")]
        : [getItem("List user", "2")],
      "group"
    ),
    getItem(
      "Category",
      "Category",
      null,
      [
        getItem("Category", "4"),
        getItem("SubCategory", "5"),
        getItem("Topic", "6"),
      ],
      "group"
    ),
  ];
  return items;
};
