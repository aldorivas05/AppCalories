import AsyncStorage from "@react-native-async-storage/async-storage";
import { Meal }     from "../types";
import { isToday } from "date-fns";

const MY_FOOD_KEY = '@MyFood:Key';

const MY_TODAY_FOOD_KEY = '@MyTodayFood:Key';

const useFoodStorage = () => {

  const saveInfoToStorage = async (storageKey: string, meal: Meal) => {
    try {
      const currentSavedFood = await AsyncStorage.getItem(storageKey);

      if (currentSavedFood !== null) {
        const currentSavedFoodParsed = JSON.parse(currentSavedFood);
        currentSavedFoodParsed.push(meal);

        await AsyncStorage.setItem(storageKey, JSON.stringify(currentSavedFoodParsed));
        return Promise.resolve();
      }
      //Esto es para cuando no se ha guardado ninguna comida, o el usuario abre por primera vez la app.
      await AsyncStorage.setItem(storageKey, JSON.stringify([meal, ]))
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error)
    }
  }
  // Para agregar nuevas comidas.
  const handleSaveFood = async ({calories, name, portion}: Meal) => {
    try {
      const result = await saveInfoToStorage(MY_FOOD_KEY, {
        calories,
        name,
        portion
      })
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error)
    }
    
  }
  //Para obtener las comidas guardadas.
  //Region Obtener comidas.
  const handleGetFoods = async () => {
    try {
      const foods = await AsyncStorage.getItem(MY_FOOD_KEY);
      if (foods !== null) {
        const parsedFoods = JSON.parse(foods);
        return Promise.resolve(parsedFoods)
      }
    } catch (error) {
      return Promise.reject(error)
    }
  }
 // Guardar informacion de comida del dia de hoy.
  const handleSaveTodayFood = async ({calories, name, portion}: Meal) => {
    try {
      const result = await saveInfoToStorage(MY_TODAY_FOOD_KEY, 
        {
          calories, 
          name, 
          portion,
          date: new Date().toISOString(),
      })

      return Promise.resolve(result);

    } catch (error) {
      return Promise.reject(error);
    }
  }
 // Metodo para obtener info de comida del dia de hoy.
  const handleGetTodayFood = async () => {
    try {
      const foods = await AsyncStorage.getItem(MY_TODAY_FOOD_KEY);
      if (foods !== null) {
        const parsedFoods = JSON.parse(foods);
        return Promise.resolve(parsedFoods.filter((meal: { date: string | number | Date; }) => meal.date && isToday(new Date(meal.date))))
      }
    } catch (error) {
      return Promise.reject(error)
    }
  };

  //Metodo para borrar

  const handleRemoveTodayFood = async (index: number) => {
    try {
      const todayFood = await handleGetTodayFood();
      const filterItem = todayFood?.filter((item: Meal, itemIndex: any) => {
        return itemIndex !== index;
      })
      await AsyncStorage.setItem(MY_TODAY_FOOD_KEY, JSON.stringify(filterItem))
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  return (
    {
      onSaveFood: handleSaveFood,
      onGetFoods: handleGetFoods,
      onSaveTodayFood: handleSaveTodayFood,
      onGetTodayFood: handleGetTodayFood,
      onDeleteTodayFood: handleRemoveTodayFood,
    }
  );  
}




export default useFoodStorage;