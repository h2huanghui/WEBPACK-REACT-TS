import { message } from "antd";
import CommonApi from "@/api/Common";
import {UPDATE_USERINFO,} from "@/action/actionTypes";


//更新用户信息
export function updateUserInfo(){
  return dispatch => {
    CommonApi.getUserInfo().then(result=>{
      if(result.status === '000000'){
        dispatch({type: UPDATE_USERINFO, userInfo:result.data})
      }
    });
  }
}

