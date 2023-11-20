const state = {
      button: document.getElementById( "btn" ) 
    , h1    : document.getElementById( "h-1" ) 
    , h2    : document.getElementById( "h-2" )
    , m1    : document.getElementById( "m-1" )
    , m2    : document.getElementById( "m-2" )
    , s1    : document.getElementById( "s-1" )
    , s2    : document.getElementById( "s-2" )
    , ul   : document.getElementById( "ul" )
};

let time = {
      H1 : 0
    , H2 : 0
    , M1 : 0
    , M2 : 0
    , S1 : 0
    , S2 : 0 
};

const appState = [ 
    "start"   //0
  , "reset"   //1
  , "stop"    //2
];

let buttonState = appState[0];

let counter;

//main
function clickButton() {
    changeButton();
    render();
}

function deleteResume() {
    state.ul.innerHTML =  `  
        <input onclick="clickButton();" value="${buttonState}" type="button" class="Inp" id="btn" />
    `;
}

function clickResume(){
    changeToStop();
    deleteResume();
    render();
}

function render() {
    const { H1:h1, H2:h2, M1:m1, M2:m2, S1:s1, S2:s2 } = time;
    state.h1.innerHTML = h1;
    state.h2.innerHTML = h2;  
    state.m1.innerHTML = m1;
    state.m2.innerHTML = m2;
    state.s1.innerHTML = s1;
    state.s2.innerHTML = s2;
}

function changeButton(){
    switch( buttonState ){
        case appState[0] :
            changeToStop();
            break;
        case appState[2] : 
            changeToResetResume();
            break;
        case appState[1] :
            changeToStart();
            break;
    }
}

function changeToStart(){
    buttonState = appState[0];
    deleteResume(); 
    resetTime();
}

function changeToStop(){
    buttonState = appState[2];
    startTime();
}

function changeToResetResume(){
    buttonState = appState[1];
    state.ul.innerHTML =  `
        <input onclick="clickResume();" type="button" value="resume" style="font-size:25px;" class="Inp"/>
        <input onclick="clickButton();" type="button" value="${buttonState}" class="Inp" id="btn" />
    `;
    stopTime();
}
function startTime(){
    counter = setInterval( increaseTime , 1 );
}

function stopTime(){
    clearInterval(counter);
}

function resetTime(){
    time.S1 = 0;
    time.S2 = 0;
    time.M1 = 0;
    time.M2 = 0;
    time.H1 = 0;
    time.H2 = 0;
}

function increaseTime(){
    time.S1 ++;
    if ( time.S1==9 ) {
        time.S1=0;
        time.S2++;
    }
    if( time.S2==6 ){
        time.S1=0;
        time.S2=0;
        time.M1++;
    }
    if ( time.M1==9 ) {
        time.M1=0;
        time.M2++;
    }
    if( time.M2==6 ){
        time.M1=0;
        time.M2=0;
        time.H1++;
    }
    if ( time.H1==9 ) {
        time.H1=0;
        time.H2++;
    }
    if( time.H2==2 ){
        if( time.H1 == 4) {
            alert("up limit has reached");
           // window.close();
        }
    }
    render();
}

render();