// what kebab sauce is best
const textsize = 100;
var spicyNum = 0;
var mildNum = 0;
var mediumNum = 0;
var spicy;
var mild;
var medium;
var sauceOffset = 200;
function setup() {
createCanvas(windowWidth, windowHeight);
textSize(textsize);
fill(255);
textAlign(LEFT, TOP);
spicy = firebase.database().ref('spicyKebab');
medium = firebase.database().ref('mediumKebab');
mild = firebase.database().ref('mildKebab');
spicy.on('value', updateSpicy);
medium.on('value', updateMedium);
mild.on('value', updateMild);
}

function updateSpicy(snapshot) {
var value = snapshot.val();
if (value !== null) {
spicyNum = value;
} else {
spicyNum = 0;
}
}

function updateMedium(snapshot) {
var value = snapshot.val();
if (value !== null) {
mediumNum = value;
} else {
mediumNum = 0;
}
}

function updateMild(snapshot) {
var value = snapshot.val();
if (value !== null) {
mildNum = value;
} else {
mildNum = 0;
}
}

function draw() {
background(0);
fill(50);
if(localStorage.getItem('favoriteSauce') == null) {
if(mouseY > sauceOffset && mouseY < textsize + sauceOffset) {
rect(0, sauceOffset, width, textsize);
}
if(mouseY > textsize + sauceOffset && mouseY < (textsize*2) + sauceOffset) {
rect(0, textsize + sauceOffset, width, textsize);
}
if(mouseY > (textsize*2) + sauceOffset && mouseY < (textsize*3) + sauceOffset) {
rect(0, textsize*2 + sauceOffset, width, textsize);
}
}
fill(255, 255, 255);
text("jaki jest twój ulubiony kebab?", 0, 10);
fill(0, 100, 255);
text("sos:", 0, 110);
fill(255, 255, 255);

text("ostry", 0, 210);
text("mieszany", 0, 310);
text("łagodny", 0, 410);
if(localStorage.getItem('favoriteSauce') !== null) {
let total = spicyNum + mildNum + mediumNum;
text(Math.round((spicyNum / total)*10000) / 100 + "%", 800, 210);
text(Math.round((mediumNum / total)*10000) / 100 + "%", 800, 310);
text(Math.round((mildNum / total)*10000) / 100 + "%", 800, 410);
}
}

function mousePressed() {
if(mouseY > 200 && mouseY < 500) {
if(localStorage.getItem('favoriteSauce')) {
let alertData  = "Już wybrano!!! Wybrany sos to: ";
switch(localStorage.getItem("favoriteSauce")) {
case "mild":
alertData += "łagodny.";
break;
case "spicy":
alertData += "ostry.";
break;
case "medium":
alertData += "mieszany."
break;
}
alert(alertData);
}
else {
if(mouseY >  sauceOffset && mouseY < textsize + sauceOffset) {
spicy.set(spicyNum+1);
localStorage.setItem('favoriteSauce', 'spicy');
}
if(mouseY > textsize + sauceOffset && mouseY < textsize*2 + sauceOffset) {
medium.set(mediumNum+1);
localStorage.setItem('favoriteSauce', 'medium');
}
if(mouseY > textsize*2 + sauceOffset && mouseY < textsize*3 + sauceOffset) {
mild.set(mildNum+1);
localStorage.setItem('favoriteSauce', 'mild');
}
}
}
}
