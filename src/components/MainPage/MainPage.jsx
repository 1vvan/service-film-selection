import React, { useState } from "react";
import ChooseCategory from "../ChooseCategory/ChooseCategory";
import VideoBackground from "../VideoBackgroud/VideoBackground";
import FilmCard from "../FilmCard/FilmCard";
import returnBtn from '../../assets/backIcon.png'
import "./MainPage.scss";

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
            <button
              className={`return__btn ${
                isCategoriesVisible === false ? "return__btn-visible" : ""
              }`}
              onClick={() => setIsCategoriesVisible(true)}
            >
              <img src={returnBtn} alt="" />
            </button>
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
