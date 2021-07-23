var timer = null;
var checker = $("#checker")

var days = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];
var workHours = ['23 0', '11 18', '11 18', '11 18', '11 18', '11 18', '10 14'];

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
    var time = String(dt.getHours()).padStart(2, "0") + ":" + String(dt.getMinutes()).padStart(2, "0");

    var adder = dt.getDay();
    var startAdder = adder;
    var dayOfWeek = days[adder];
    var startDate = new Date();
    var endDate = new Date();

    var endHour = parseInt(workHours[adder % 7].split(' ')[1]);

    var startHour = parseInt(workHours[startAdder % 7].split(' ')[0]);

    startDate.setHours(startHour)
    startDate.setMinutes(0);

    endDate.setHours(endHour);
    endDate.setMinutes(0);

    var finalText = `Na bazie twojego lokalnego czasu, jest teraz ${dayOfWeek.toLowerCase()}, godzina ${time}.<br />`;

    if (dt >= endDate)
    {
        when = "jutro"
        if (dt.getDay() == 6)
        {
            startDate.setDate(dt.getDate() + 1);
            adder = adder + 1;
            startAdder = adder + 1;
            when = "w poniedziałek"
        }

        startDate.setDate(dt.getDate() + 1);
        startAdder = adder + 1;

        var startHour = parseInt(workHours[startAdder % 7].split(' ')[0]);

        startDate.setHours(startHour)
        startDate.setMinutes(0);

        finalText += `Komis jest zamknięty, zapraszamy ${when} o ${startDate.getHours()}:00`;
    }

    else if (dt < startDate)
    {
        finalText += `Komis jest jeszcze zamknięty, zapraszamy dzisiaj o ${startDate.getHours()}:00`
    }

    else
    {
        finalText += `Komis jest jeszcze otwarty przez najbliższe X godzin i X minut.`;
    }

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
