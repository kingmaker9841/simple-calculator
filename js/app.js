class Calculator{
    static allClear(){
        prevScreen.innerHTML = '';
        curScreen.innerHTML = '';
    }
    static delete(){
        if (curScreen.innerHTML === ''){
            return;
        }
        curScreen.innerHTML = curScreen.innerHTML.substring(0, curScreen.innerHTML.length-1);
    }
    static displayNumber(getNumber){
        if(curScreen.innerHTML.includes('.') && getNumber === '.'){
            return;
        }
        curScreen.innerHTML += getNumber;
    }
    static displayOperation(getOperation){
        let len = prevScreen.innerHTML.length;
        let prev = prevScreen.innerHTML;
        let charLen = prevScreen.innerHTML.charAt(len-1);
        if ( (getOperation === "/" || getOperation === "*" || 
             getOperation === "+" || getOperation === "-") && 
             (charLen === "/" || charLen === "*" || charLen === "+" || 
              charLen === "-") && (curScreen.innerHTML === '' || 
              curScreen.innerHTML === '.')){
                  return;
              }
        
        prevScreen.innerHTML += curScreen.innerHTML + getOperation;
        curScreen.innerHTML = '';

    }
    static computeEquals(){
        let x = prevScreen.innerHTML.charAt(prevScreen.innerHTML.length-1);
        if (( x === '/' || x === '*' || x === '+' || x === '-') && 
            curScreen.innerHTML === ''){
                prevScreen.innerHTML = prevScreen.innerHTML.substring(0, prevScreen.innerHTML.length-1);
            }
        let concatString = prevScreen.innerHTML.concat(curScreen.innerHTML);
        let result = eval(concatString);
        curScreen.innerHTML = result.toString();
        prevScreen.innerHTML = '';
    }
}

const numb = document.querySelectorAll("[data-number]");
const operation = document.querySelectorAll("[data-operation]");
const equals = document.querySelector("[data-equals]");
const clear = document.querySelector("[data-all-clear]");
const deleteNumb = document.querySelector("[data-delete]");
const prevScreen = document.querySelector("[data-prev-screen]");
const curScreen = document.querySelector("[data-cur-screen]");

numb.forEach((item)=>{
item.addEventListener("click", (e)=>{
    Calculator.displayNumber(e.target.innerHTML);
});
});

clear.addEventListener("click", (e)=>{
    Calculator.allClear();
});
deleteNumb.addEventListener("click", (e)=>{
    Calculator.delete();
});
operation.forEach((item)=>{
    item.addEventListener("click", (e)=>{
        Calculator.displayOperation(e.target.innerHTML);
    });
});
equals.addEventListener("click", (e)=>{
    Calculator.computeEquals();
});