var timer = null;
var checker = $("#checker")

var days = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];
var workHours = ['25 -1', '11 18', '11 18', '11 18', '11 18', '11 18', '10 14'];

checker.mouseenter(function()
{
    start();
});

checker.mouseleave(function()
{
    clr();
});

function changer()
{
    var dt = new Date();
    var time = dt.getHours() + ":" + dt.getMinutes();
    var adder = dt.getDay();
    var dayOfWeek = days[adder];
    if (dt.getDay() == 0)
    {
        adder = dt.getDay() + 1;
    }
    var hours = workHours[adder];
    var startHour = hours[0];
    var endHour = hours[1];

    var finalText = `Na bazie twojego lokalnego czasu, jest teraz ${dayOfWeek.toLowerCase()}, godzina ${time}.<br />`

    /*
    if (dt.getHours() > startHour)
    {

        //good
    }

    else if (dt.getHours < startHour)
    {
        finalText += `To oznacza, że komis zostanie otwarty za ${abs(dt.getHours() - startHour)}`;
        alert("k")
        // too before :D
    }

    else if (dt.getHours == startHour)
    {
        // open
    }
    */
    
    checker.attr("data-bs-original-title", finalText);
    const tooltipElement = document.querySelector('[data-bs-toggle="tooltip"]');
    let tool = bootstrap.Tooltip.getInstance(tooltipElement);
    tool.show();
}

function start()
{

    timer = setInterval(changer, 1000);
}

function clr()
{
    clearInterval(timer);
}
