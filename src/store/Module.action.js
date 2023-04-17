export const SET_ORDERED_FOOD = "SET_ORDERED_FOOD";
export const INIT_ORDERED_FOOD = "INIT_ORDERED_FOOD";
export const SET_INFO_CLIENT = "SET_INFO_CLIENT";
export const SET_SOCKJS = 'SET_SOCKJS';
export const setOrderedFood = (data) =>({
    type: SET_ORDERED_FOOD,
    payload: data,
})
export const initOrderedFood = (data) =>({
    type: INIT_ORDERED_FOOD,
    payload: data,
})
export const setInfoClient = (data) =>({
    type: SET_INFO_CLIENT,
    payload: data,
})
export const setSockjs = (data) =>({
    type: SET_SOCKJS,
    payload: data,
})
