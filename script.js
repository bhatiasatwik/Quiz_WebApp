const name = document.querySelector('input[type="text"]');
const nameEr = document.querySelector('#nameEr');
const mail = document.querySelector('input[type="email"]');
const mailEr = document.querySelector('#emailEr');
const date =  document.querySelector('input[type="date"]');
const start =   document.querySelector('#start');
const popup = document.querySelector(".popup");
const card = document.querySelector(".card");
const contain = document.querySelector(".container")
const toast =  document.querySelector(".toast")
const toastBar =  document.querySelector(".container")
const timer =  document.querySelector(".time")
const marker =  document.querySelector(".marker")
const question =  document.querySelector(".question")
const buttons = document.querySelectorAll('.choice');
const next = document.querySelector('.card-button');
const quiz = document.querySelector('.quiz');
const result = document.querySelector('.result');
const right = document.querySelector('.right');
const wrong = document.querySelector('.wrong');
const acc = document.querySelector('.accuracy');

let player = undefined;
let email = undefined;
let dob = undefined;
let r = 0;
let w = 0;
let ind = 0;
let intervals = [];
let ST;
let f = 0;
let mover;
const questions = [
    {
        question: "What starts with 'e' and ends with 'e' but only has one letter in it?",
        choices: [
            { op: "An egg", isCorrect: false },
            { op: "An elephant", isCorrect: false },
            { op: "An envelope", isCorrect: true },
            { op: "An escalator", isCorrect: false }
        ]
    },
    {
        question: "What has a head, a tail, is brown, and has no legs?",
        choices: [
            { op: "A banana", isCorrect: false },
            { op: "A penny", isCorrect: true },
            { op: "A chocolate bar", isCorrect: false },
            { op: "A squirrel", isCorrect: false }
        ]
    },
    {
        question: "What comes once in a minute, twice in a moment, but never in a thousand years?",
        choices: [
            { op: "A shooting star", isCorrect: false },
            { op: "The letter 'M'", isCorrect: true },
            { op: "A birthday cake", isCorrect: false },
            { op: "A sneeze", isCorrect: false }
        ]
    },
    {
        question: "What has a bottom at the top?",
        choices: [
            { op: "Your legs", isCorrect: true },
            { op: "A tree", isCorrect: false },
            { op: "A shoe", isCorrect: false },
            { op: "A hat", isCorrect: false }
        ]
    },
    {
        question: "What has a head, a tail, and has no legs?",
        choices: [
            { op: "A fish", isCorrect: false },
            { op: "A pencil", isCorrect: false },
            { op: "The sky", isCorrect: false },
            { op: "A coin", isCorrect: true },
        ]
    }
];

//-----------------------------------------------------------------------------------------
/*Pre Processing and form validation*/

contain.classList.add('disable');
card.classList.add('blur')
setTimeout(()=>{
    popup.classList.add('popup-move');
},1000)
ready()
start.addEventListener("click" , ()=>{
    if(isName(name.value) && isMail(mail.value) && isDate(date.value))
    {
        player = name.value;
        email = mail.value;
        popup.classList.remove('popup-move');
        card.classList.remove("blur");
        contain.classList.remove('disable')
        showWarning(`Welcome ${player.split(" ")[0]} !`)
        ready();
    }
})
function ready()
{
    console.log("ready called");
    next.removeEventListener('click' , mover);
    next.innerHTML = `Take Quiz.`
    result.style.display = "none";
    quiz.style.display = "initial"
    question.innerHTML = "";
    buttons.forEach( (btn)=>{
        btn.disabled = true;
        btn.innerHTML = ``;
        btn.style.cursor = "no-drop"
    } )
    next.addEventListener('click' , startQuiz)
}
function isName(nameV)
{
    // return true;
    let pattern =/^[a-zA-Z]+ [a-zA-Z]+$/;
    let res = pattern.test(nameV);
    if(res == true)
    {
        nameEr.innerHTML = "<p class ='accepted'> ACCEPTED </p>"
    }
    else
    {
        nameEr.innerHTML = "<p class = 'invalid'> ENTER FULL NAME  </p>"
        name.classList.add('shake');
        name.addEventListener('animationend', () => {
            name.classList.remove('shake');
        });
    }
    return res;
}
function isMail(mailV) 
{
    // return true;
    let pattern = /^[a-zA-Z0-9]*@[a-z]*.[a-z]*$/;
    let res = pattern.test(mailV);
    if (res == true) {
        mailEr.innerHTML = "<p class ='accepted'> ACCEPTED </p>"
    } else {
        mailEr.innerHTML = "<p class = 'invalid'> INVALID FORMAT </p>"
        mail.classList.add('shake');
        mail.addEventListener('animationend', () => {
            mail.classList.remove('shake');
        });
    }
    return res;
}
function isDate(date)
{
    // return true;
    return !(date.length == 0);
}
// -------------------------------------------------------------------------------------------------------
/*toast notif*/
function showToast(number)
{
    let toast = document.createElement('div');
    toast.classList.add("toast");
    toast.innerHTML = number;
    contain.appendChild(toast);
    setTimeout(()=>{
        toast.classList.add("toast-hide");
    },1900)
    setTimeout(()=>{
        toast.remove();
    },2800)
}
function showWarning(number)
{
    let warn = document.createElement('div');
    warn.classList.add("warn");
    warn.innerHTML = number;
    contain.appendChild(warn);
    setTimeout(()=>{
        warn.classList.add("warn-hide");
    },3900)
    setTimeout(()=>{
        warn.remove();
    },5800)
}
// ----------------------------------------------------------------------------------------------------
/*Timer*/
function startTimer()
{
    console.log("start Timer called");
    timer.style.backgroundColor = "#28ff032d";
    timer.innerHTML = `${10}`;
    let currT = 9;
    return new Promise( (resolve , reject)=>{
        ST = setInterval(()=>{
            if(currT < 1)
            {
                clearInterval(ST);
                resolve();
            }
            timer.innerHTML = `${currT}`;
            if(currT > 7)
            {
                timer.style.backgroundColor = "#28ff032d";
            }
            else if( currT > 3)
            {
                timer.style.backgroundColor = "#e5f9042d";
            }
            else
            {
                timer.style.backgroundColor = "#f904042d";
            }
            currT--;
        },1000)
    } )
}
// -----------------------------------------------------------------------------------------------------
function startQuiz()
{
    console.log("start Quiz called");
   next.removeEventListener("click" , startQuiz);
   next.innerHTML = `Next`;
   r = 0;
   w = 0;
   ind = 0;
   f = 0;
   timer.style.display="flex"
buttons.forEach( (btn)=>{
    btn.disabled = false;
    btn.style.cursor = "pointer"
    })

    mover = function(e)
    {
        console.log("mover caled");
        console.log("nnext-clicked");
        // console.log(ind);
        buttons.forEach( (btn , index)=>{
            btn.classList.remove('correct');
            btn.classList.remove('incorrect');
        })
        console.log("intercal =====>" , ST);
        clearInterval(ST);
        console.log("cleared");
        if(ind >= questions.length)
        {
            console.log('click->' , f);
            if(f == 0)
            {
                
                quiz.style.display = "none";
                right.innerHTML = `${player} Gave ${r} correct answers!`
                wrong.innerHTML = `${w} answers were incorrect / unmarked.`
                let a = r / questions.length;
                a = a * 100;
                acc.innerHTML = `Overall accuracy achieved is ${a.toFixed()}%`
                result.style.display = "initial";
                timer.style.display="none"
                next.innerHTML="Play again!"
                f = 1;
            }
            else
            {
                ready();
            }
        }
        else
        {
            getQuestion();
        }
    
    }
    next.addEventListener('click' , mover)

    getQuestion(); 
}
function messenger(e)
{
    console.log("messenger caled");
    checkAnswer(e);
}
function getQuestion()
{
    buttons.forEach( (btn)=>{
        btn.addEventListener("click" ,messenger);
    })
    console.log("getQues caled");
    startTimer()
    .then(messenger)
    showToast(`Question ${ind+1} / ${questions.length}`)
    question.innerHTML = questions[ind]['question']
    buttons.forEach( (btn , index)=>{
        btn.classList.remove('correct');
        btn.classList.remove('incorrect');
        btn.innerHTML = questions[ind]['choices'][index]['op']
    })
    ind++;
    console.log("add");

}
function checkAnswer(e)
{
    console.log("checkAnser caled");
    buttons.forEach( (btn)=>{
        btn.removeEventListener("click" , messenger);
    } ) 
    clearInterval(ST);
    if(e == undefined)
    {
        w++;
        showWarning("Warning: Please Mark Your Choice Timely!");
        mover();

    }
    else if(questions[ind-1]['choices'][e.target.id]['isCorrect'])
    {
        e.target.classList.add('correct')
        r++;
    }
    else
    {
        e.target.classList.add('incorrect')
        w++;
    }
    console.log("removved");
}