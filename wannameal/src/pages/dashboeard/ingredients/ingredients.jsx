import React, { useEffect } from "react";
import style from "./ingredients.module.css";
import Pagination from "../../../components/pagination/pagination";
import { useDispatch, useSelector } from 'react-redux';
import { fetchIngredients } from "../../../redux/slices/ingredients"; // Adjust the path to your slice

export default function Ingredients() {
  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.ingredients.items);
  const status = useSelector((state) => state.ingredients.status);
  const error = useSelector((state) => state.ingredients.error);
  console.log(ingredients);
  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'failed') {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="px-5 my-4">
      <div className={`${style.confirm_recipe}`}>
        <button className={style.confirm_btn}>Add Ingredient</button>
      </div>
      <div className="bg-body rounded-4 p-3">
        <div
          className="row m-3 pb-3 flex-wrap align-items-start justify-content-center"
          style={{ gap: "40px", borderBottom: "1px solid var(--text_black)" }}
        >
          {ingredients?.map((ing, index) => (
            <div
              key={index}
              className={`d-flex flex-column justify-content-center gap-3 ${style.ing_div}`}
            >
              <h1>🥩</h1>
              <p>{ing.name || 'Meat'}</p>
            </div>
          ))}
        </div>
        <Pagination />
      </div>
    </div>
  );
}
