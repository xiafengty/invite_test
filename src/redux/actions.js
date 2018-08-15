import {SUCCESS_MSG,ERROR_MSG,RECEIVE_USER,RESET_USER} from "./action-types";
import {
    reqRegister,
    reqLogin,
    reqUpdate,
    reqUser
} from "../api";
export const successMsg=(user)=>({type:SUCCESS_MSG,data:user});
export const errorMsg=(msg)=>({type:ERROR_MSG,data:msg});
export const receiveUser=(user)=>({type:RECEIVE_USER,data:user});
export const resetUser=(msg)=>({type:RESET_USER,data:msg});
const usernameReg =  /^(?=.*[0-9]).{8,15}|(?=.*[a-z]).{8,15}|(?=.*[0-9])(?=.*[a-z]).{8,15}$/;    //只能包含英文、数字和下划线，长度为5-12位。
const passwordReg = /^(?=.*[0-9])(?=.*[a-z]).{8,20}$/;    //只能包含英文、数字和下划线，长度为6-18位。


export  function register({username,password,surePassword,type}) {
    if(surePassword){
        if(password!==surePassword){
            return{type:ERROR_MSG,data:"您两次输入的密码不一致！"}
        }
    }
    if(username===password){
        return{type:ERROR_MSG,data:"用户名和密码不能相同！"}
    }
    if(!usernameReg.test(username)){
        return{type:ERROR_MSG,data:"您输入的用户名不符合格式！"}
    }else if(!passwordReg.test(password)){
        return{type:ERROR_MSG,data:"您输入的秒不符合格式！"}
    }
    return async dispatch => {
        const response=await reqRegister({username,password,surePassword,type});
        const result=response.data;
        if(result.code===0){
            const user=result.data;
            dispatch(successMsg(user));
        }else{
            const msg=result.msg;
            dispatch(errorMsg(msg));
        }
    }
}

export  function login({username,password}) {
    if(!usernameReg.test(username)){
        return{type:ERROR_MSG,data:"您输入的用户名不符合格式！"}
    }else if(!passwordReg.test(password)){
        return{type:ERROR_MSG,data:"您输入的秒不符合格式！"}
    }
    return async dispatch=>{
       const res=await reqLogin({username,password});
        const result=res.data;
        console.log(result);
        if(result.code===0){
            const user=result.data;
            dispatch(successMsg(user));
            console.log(user+"1");
        }else{
            const msg=result.msg;
            dispatch(errorMsg(msg));
            console.log(msg);
        }

    }
}

export function updateUser (user) {
    return async dispatch=>{
        const res=await reqUpdate(user);
        const result=res.data;
        if(result.code===0){
            const user=result.data;
            dispatch(receiveUser(user));
        }else{
            const msg=result.msg;
            dispatch(resetUser(msg));
            console.log(user);
        }
    }
}
export function autoLogin() {
    return async dispatch=>{
        const res=await reqUser;
        const result=res.data;/*{code,data}*/
        if(result.code===0){
            dispatch(receiveUser(result.data));
        }else{
            dispatch(resetUser(result.msg));
        }
    }
}