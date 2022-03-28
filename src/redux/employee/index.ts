import { Dispatch } from 'redux';
import { get, post } from '../../utils/request';
import { EmployeeRequest, EmployeeResponse } from '../../interface/employee';
import { GET_EMPLOYEE_URL } from '../../constants/urls';

import { GET_EMPLOYEE } from '../../constants/actions';

type State = Readonly<{
  employeeList: EmployeeResponse;
}>;

type Action = {
  type: string;
  payload: any;
};

const initialState: State = {
  employeeList: undefined
};

export function getEmployee(param: EmployeeRequest) {
  return (dispatch: Dispatch) => {
    get(GET_EMPLOYEE_URL, param).then((res) => {
      console.log('res', res.data);
      dispatch({
        type: GET_EMPLOYEE,
        payload: res.data
      });
    });
  };
}

export default function (state = initialState, action: Action) {
  switch(action.type){
    case GET_EMPLOYEE:
      return {
        ...state,
        employeeList: action.payload
      }
    default: 
      return state
  }
}
