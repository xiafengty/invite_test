import ajax from "./ajax";
const BASE="";
export const reqRegister=({username,password,surePassword,type})=>ajax(BASE+"/register",{username,password,surePassword,type},"POST");
export const reqLogin=({username,password})=>ajax(BASE+"/login",{username,password},"POST");