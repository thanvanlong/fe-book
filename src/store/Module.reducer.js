import { INIT_ORDERED_FOOD, SET_ORDERED_FOOD, SET_INFO_CLIENT, SET_SOCKJS } from "./Module.action";

const initState = {
    listFood: [],
    infoClient: [],
    sockjs: {}
}

export const foodReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_ORDERED_FOOD:
            let updateData = [];
            if (action.payload.clear) {
                return {...state, listFood: []}
            }
            if (action.payload.length === undefined) {
                const checkExsitFood = state.listFood.findIndex(item => item.id === action.payload.id);
                if (checkExsitFood !== -1) {
                    // const temp = state.listFood.filter(item => item.id === action.payload.id);
                    // const updatedFood = {
                    //     ...temp[0],
                    //     quanityOrdered: temp[0].quanityOrdered + 1,
                    //     time: action.payload.time
                    // }
                    const temp = [
                        ...state.listFood.filter(item => item.id !== action.payload.id),
                        action?.payload];
                    updateData = temp;
                } else {
                    updateData = [...state.listFood, action.payload];
                }
            } else {
                updateData = action.payload
            }
            const dt = updateData;
            return {
                ...state,
                listFood: dt,
            }

        case INIT_ORDERED_FOOD:
            const data = action.payload.sort((a,b) => a?.name.localeCompare(b?.name));
            return {
                ...state,
                listFood: action.payload
            }
        case SET_INFO_CLIENT: 
            return {
                ...state,
                infoClient : action.payload,
            }
        case SET_SOCKJS: {
            return{
                ...state,
                sockjs: action.payload,
            }
        }
        default:
            return state;
    }
}