let buttonMain = document.getElementById('start'),
    budget = document.querySelector('.budget-value'),
    daybudget = document.querySelector('.daybudget-value'),
    level = document.querySelector('.level-value'),
    expenses = document.querySelector('.expenses-value'),
    optionalExpensesValue = document.querySelector('.optionalexpenses-value'),
    income = document.querySelector('.income-value'),
    monthSavings = document.querySelector('.monthsavings-value'),
    yearSavings = document.querySelector('.yearsavings-value');

let inputs = document.getElementsByClassName('expenses-item'),
    budjetBtn = document.getElementsByTagName('button')[2],
    expensesBtn = document.getElementsByTagName('button')[0],
    expensesBtn2 = document.getElementsByTagName('button')[1];

let optionalInput = document.querySelectorAll('.optionalexpenses-item');

let chooseIncome = document.querySelector('#income'),
    savingsCheckBox = document.querySelector('#savings'),
    sumInput = document.querySelector('.choose-sum'),
    interest = document.querySelector('.choose-percent'),
    yearInput = document.querySelector('.year-value'),
    monthInput = document.querySelector('.month-value'),
    dayInput = document.querySelector('.day-value');


let money,time;


budjetBtn.disabled = true;
expensesBtn.disabled = true;
expensesBtn2.disabled = true;

buttonMain.addEventListener('click', function () {
    money = +prompt('Ваш бюджет на месяц', '');
    time = prompt('Введите дату в формате YYYY-MM-DD', '');  

    while (isNaN(money) || money == '' || money == null) { // циклбудет выполняться пока одно из условий верной
        money = +prompt('Ваш бюджет на месяц', '');
    }
    appData.budget = money;
    appData.timeData = time;
    budget.textContent = money.toFixed(); // округление полученного числа до целого
    yearInput.value = new Date(Date.parse(time)).getFullYear();
    monthInput.value = new Date(Date.parse(time)).getMonth() + 1;
    dayInput.value = new Date(Date.parse(time)).getDate();

    budjetBtn.disabled = false;
    expensesBtn.disabled = false;
    expensesBtn2.disabled = false;
});


expensesBtn.addEventListener('click', function(){ // обязаельные расходы
    let sum = 0;
    for (let i = 0; i < inputs.length; i++) {
        let a = inputs[i].value,
            b = inputs[++i].value;
            if (typeof(a) === 'string' && typeof(a) != null && typeof(b) != null && a != '' && b != '' && a.length < 50) {
                appData.expenses[a] = b;
                sum = sum + +b; 
            } else {
                i--;
            }
        
    }
    expenses.textContent = sum; 
});

expensesBtn2.addEventListener('click', function () { // необязательные расходы
    for (let i = 0; i < optionalInput.length; i++) {
        let optExpenses = optionalInput[i].value; // в переменную записываем значение первого инпута, после отработки всех действий второго и так далее
        if (typeof(optExpenses) === 'string' && typeof(optExpenses) != null && optExpenses != '' && optExpenses.length < 50) {         
            appData.optionalExpenses[i] = optExpenses; // в ключ optionalExpenses в объекте appData записываем значение переменной
        } else {
            i--;
        }
        optionalExpensesValue.textContent = optionalExpensesValue.textContent + appData.optionalExpenses[i] + ' '; // в поле для расходов записываем данные из ключа optionalExpenses из объекта appData + пробел для создание пустого места между всеми записями         
    }   
});

budjetBtn.addEventListener('click', function(){
    if (appData.budget != undefined) { // Если значение ключа в объекте существует, то выполняется слудующий код
        Object.assign(appData,{moneyPerDay : ((appData.budget - expenses.textContent)  / 30).toFixed(1)}); // почему нельзя вместе текстконтента просто записать переменную sum
        daybudget.textContent = appData.moneyPerDay;
        if (appData.moneyPerDay < 100) {
            level.textContent = 'Минимальный уровень достатка!!';
        }  else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
            level.textContent = 'Средний уровень достатка!!';
      } else if (appData.moneyPerDay > 2000) {
            level.textContent = 'Высокий уровень достатка!!';
      }  else {
            level.textContent = 'Произошла ошибка!!';
        }  
    } else {
        daybudget.textContent = 'Произошла ошибка!!';
    }
    
});

chooseIncome.addEventListener('input', function(){ 
        let items = chooseIncome.value; // записываем в переменную значение инпута 
        if (typeof(items) === 'string' && items != '' && typeof(items) != null) {         
            appData.income = items.split(','); // записываем в массив данных, разделенными запятой
            income.textContent = appData.income; // в текст инпута записываем данные из массивв
        } else {
            income.textContent = 'Неверный формат данных';
        }        
});

savingsCheckBox.addEventListener('click', function () {
    if (appData.savings == true) {
        appData.savings = false;
    } else {
        appData.savings = true;
    }
});

sumInput.addEventListener('input', function(){
    if (appData.savings == true) {
        let sum = +sumInput.value,
            percent = +interest.value;
            
        Object.assign(appData,{monthIncome : sum / 100 / 12 * percent});
        Object.assign(appData,{yearIncome : sum / 100 + percent});

        monthSavings.textContent = appData.monthIncome.toFixed(1); // округляем до одной цифры после запятой
        yearSavings.textContent = appData.monthIncome.toFixed(1);
    }
});

interest.addEventListener('input', function(){
    if (appData.savings == true) {
        let sum = +sumInput.value,
            percent = +interest.value;
        
    Object.assign(appData,{monthIncome : sum / 100 / 12 * percent});
    Object.assign(appData,{yearIncome : sum / 100 + percent});

    monthSavings.textContent = appData.monthIncome.toFixed(1); // округляем до одной цифры после запятой
    yearSavings.textContent = appData.monthIncome.toFixed(1);   
    }
});

let appData = {
    budget : money,
    timeData: time,
    expenses : { },
    optionalExpenses :{ },
    income: [],
    savings: false,
};



// function chechSavings() {
//     if (appData.savings == true) {
//         let save = +prompt('Какова сумма накоплений?'),
//             interest = +prompt('Под какой процент?');

//         Object.assign(appData,{monthIncome : save / 100 / 12 * interest});
//         alert('Доход в месяц с вашего дипозита: ' + appData.monthIncome);
//     }
// }

// chechSavings();