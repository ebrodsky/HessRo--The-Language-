
var outputBox = document.getElementById('outputBox');
var dataArr = [];

var input = [];
var output = "";
var iter = 0;
var integerOp = false; //default

//Hessro functions

function hessro(num) {
    dataArr = [];
    for (var ii = 0; ii < 32; ii++) {
        dataArr.push(num);
    }
}
function rob() {
    iter = (iter + 1);
}

function hess() {
    iter = (iter - 1);
}

function ROB() {
    dataArr[iter]++;
}

function HESS() {
    dataArr[iter]--;
}

function robhess() {
    if (integerOp == true) {
        output = output + (Number(dataArr[iter]));
        integerOp = false; //reset to false.
    } else {
        output = output + (String.fromCharCode(dataArr[iter]));
    }
}

function ROBHESSplus() {
    integerOp = true;
    if (dataArr[iter] != null && dataArr[iter - 1] != null)  {
        dataArr[iter] = Number(dataArr[iter]) + Number(dataArr[iter - 1]);
    }
}

function ROBHESSminus() {
    integerOp = true;
    if (dataArr[iter] != null && dataArr[iter - 1] != null)  {
        dataArr[iter] = Number(dataArr[iter]) - Number(dataArr[iter - 1]);
    }

}

function interpret(input, i, end) {
    output = "";
    dataArr = [];
    for (var ii = 0; ii < 32; ii++) {
        dataArr.push(0);
    }
    while (i < end) {
        if (input[i].indexOf("hessro(") != -1) {
            var keyWord = input[i];
            var j = 0; //reset j for next time
            j = i + 7;
            var num = '';
            while (keyWord.substring(j, j + 1) != ')') {
                if (isNaN(keyWord.substring(j, j + 1))) {
                    alert("Not a valid basis");
                    i = keyWord.length;
                } else {
                    num += keyWord.substring(j, j + 1);
                }
                j++;
            }
            num = Number(num);
            hessro(num);
        } else if (input[i] == "rob" || input[i] == 13) {
            rob();
        } else if (input[i] == "ROB") {
            ROB();
        } else if (input[i] == "hess") {
            hess();
        } else if (input[i] == "HESS") {
            HESS();
        } else if (input[i] == "!robhess") {
            robhess();
        } else if (input[i] == "+ROBHESS") {
            ROBHESSplus();
        } else if (input[i] == "-ROBHESS") {
            ROBHESSminus();
        }
        i++;
    }
}

//interpret the input in inputBox
/*function interpret(input) {
    output = "";
    dataArr = [];
    for (var ii = 0; ii < 16; ii++) {
        dataArr.push(65);
    }
    var i = 0;
    while (i < input.length) {
        if (input.substring(i, i + 7) == "hessro(") {
            var j = 0;
            j = i + 7;
            var num = '';
            while (input.substring(j, j + 1) != ')') {
                if (isNaN(input.substring(j, j+1))) {
                    alert("Not a valid basis");
                    i = input.length;
                } else {
                    num += input.substring(j, j + 1);
                }
                j++;
            }
            num = Number(num);
            hessro(num);
            i += 7;
        } else if (input.substring(i, i + 3) == "rob" || input.substring(i, i + 3) == 13) {
            rob();
            i += 3;
        } else if (input.substring(i, i + 3) == "ROB") {
            ROB();
            i += 3;
        } else if (input.substring(i, i + 4) == "hess") {
            hess();
            i += 4;
        } else if (input.substring(i, i + 4) == "HESS") {
            HESS();
            i += 4;
        } else if (input.substring(i, i + 8) == "!robhess") {
            robhess();
            i += 8;
        } else if (input.substring(i, i + 8) == "+ROBHESS") {
            ROBHESSplus();
            i += 8;
        } else if (input.substring(i, i + 8) == "-ROBHESS") {
            ROBHESSminus();
            i += 8;
        } else {
            i++;
        }
    }
}
*/

//listen for a click on the compileButton
document.getElementById('compileButton').addEventListener('click', function () {
    input = document.getElementById('inputBox').value.replace(/[\n\r]+/g, ' ').split(" ");
    console.log(input);
    integerOp = false;
    interpret(input, 0, input.length);
    outputBox.setAttribute('placeholder', '');
    outputBox.textContent = output;
    iter = 0;
});


/*document.getElementById('compileButton').addEventListener('click', function () {
    integerOp = false;
    interpret(document.getElementById('inputBox').value);
    outputBox.setAttribute('placeholder', '');
    outputBox.textContent = output;
    iter = 0;
});*/
