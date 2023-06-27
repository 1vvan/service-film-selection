import React, { useState } from "react";
import ChooseCategory from "../ChooseCategory/ChooseCategory";
import VideoBackground from "../VideoBackgroud/VideoBackground";
import "./MainPage.scss";
import FilmCard from "../FilmCard/FilmCard";

const MainPage = () => {
  const [isCategoriesVisible, setIsCategoriesVisible] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState([]);

  return (
    <>
      <VideoBackground />
      <main className="main">
        <div className="main__container _container">
          <ChooseCategory
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            isCategoriesVisible={isCategoriesVisible}
            setIsCategoriesVisible={setIsCategoriesVisible}
          />
          <div
            className={`main__body ${
              isCategoriesVisible === false ? "main__body-visible" : ""
            }`}
          >
            <FilmCard
              selectedCategories={selectedCategories}
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default MainPage;
