const findCategory = (categoriesData, categoryId) => {
  const categoryName = categoriesData?.data.find(
    (category) => category._id === categoryId
  );
  return categoryName?.name;
};

export default findCategory;
