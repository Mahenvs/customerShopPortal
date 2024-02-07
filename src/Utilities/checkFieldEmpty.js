export const checkFieldEmpty = (input) =>{
    if(input?.trim().length == 0){
        return false;
    }
    else return true;
}