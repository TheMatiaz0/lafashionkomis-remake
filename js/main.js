var timer = null;

$("#checker").mouseenter(function()
{
    start();
});

$("#checker").mouseleave(function()
{
    clr();
});

function changer()
{
    var dt = new Date();
    var time = dt.getHours() + ":" + dt.getMinutes();

    
}

function start()
{

    timer = setInterval(changer, 1000);
}

function clr()
{
    clearInterval(timer);
}
