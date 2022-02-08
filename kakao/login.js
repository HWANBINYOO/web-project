let idbox = document.querySelector('.idbox');
let pwbox = document.querySelector('.pwbox');
let ldvalue = document.querySelector('.idvlaue');
let pwvalue = document.querySelector('.pwvlaue');

ldvalue.addEventListener('blur',function(event){
    idbox.style.borderColor = "rgb(211, 208, 208)";
});
ldvalue.addEventListener('focus',function(event){
    idbox.style.borderColor = "black";
});

pwvalue.addEventListener('blur',function(event){
    pwbox.style.borderColor = "rgb(211, 208, 208)";
});
pwvalue.addEventListener('focus',function(event){
    pwbox.style.borderColor = "black";
});