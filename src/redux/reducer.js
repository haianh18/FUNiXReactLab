import { STAFFS } from '../data/staffs';
import { DEPARTMENTS } from '../data/staffs';
export const initialState = {
    staffs: STAFFS,
    department: DEPARTMENTS,
};

export const Reducer = (state = initialState, action) => {
    return state;
}