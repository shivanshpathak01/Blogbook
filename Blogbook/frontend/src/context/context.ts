import { createContext } from "react";
interface authcontexttype{
    loggedin:boolean|null,
    setloggedin:(value:boolean)=>void;
}
export const Auth=createContext<authcontexttype>({
    loggedin:null,
    setloggedin:()=>{}
});
