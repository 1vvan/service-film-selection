import React from "react";
import categories from "../categories";
import "./ChooseCategory.scss";

const ChooseCategory = ({
  setSelectedCategories,
  selectedCategories,
  isCategoriesVisible,
  setIsCategoriesVisible,
}) => {
  const handleSelectCategory = (category) => {
    if (selectedCategories.includes(category)) {
      // Если категория уже выбрана, удалите ее из списка выбранных категорий
      setSelectedCategories(
        selectedCategories.filter(
          (selectedCategory) => selectedCategory !== category
        )
      );
    } else {
      // Если категория еще не выбрана, добавьте ее в список выбранных категорий
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleClickSubmitButton = () => {
    setIsCategoriesVisible(false);
  };

  return (
    <>
      <div
        className={`categories ${
          isCategoriesVisible === false ? "categories__hidden" : ""
        }`}
      >
        <div className="categories__body">
          <div className="categories__list">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`category__item ${
                  selectedCategories.includes(category) ? "selected" : ""
                }`}
                onClick={() => handleSelectCategory(category)}
                variant="success"
              >
                {category.name}
              </button>
            ))}
          </div>
          <button
            onClick={handleClickSubmitButton}
            className={`access-btn ${
              selectedCategories.length > 0 ? "access-btn__active" : ""
            }`}
          >
            Подтвердить
          </button>
        </div>
      </div>
    </>
  );
};

export default ChooseCategory;
