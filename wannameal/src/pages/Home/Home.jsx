import FoodIngreientSlider from "../../components/FoodIngreientSlider/FoodIngreientSlider";
import LandingPage from "../../components/landingPage/LandingPage";
import MealsSlider from "../../components/mealsSlider/mealsSlider";
import styles from "./page.module.css";

export default function Home() {
    return (
        <>
            <LandingPage />
            <div className="container-lg" style={{ maxHeight: "100vh" }}>
                <h1 className={`w-100 mx-auto my-5 text-center  ${styles.mainTitle}`}>
                    Make Your <span>Own Meal</span>
                </h1>
            </div>
            <FoodIngreientSlider />
            <MealsSlider />
        </>
    );
}
