export const compareInputs = (input,input2) =>{
    console.log(input.localeCompare(input2)," 6");
    if(input.localeCompare(input2) == 0){
        return true;
    }

    return false;
    // else{

    // }
}