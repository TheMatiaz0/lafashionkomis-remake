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
    var dayOfWeek = days[adder];
    var startDate = new Date();
    var endDate = new Date();

    var endHour = parseInt(workHours[adder % 7].split(' ')[1]);

    var startHour = parseInt(workHours[adder % 7].split(' ')[0]);

    startDate.setHours(startHour)
    startDate.setMinutes(0);

    endDate.setHours(endHour);
    endDate.setMinutes(0);

    var finalText = `Na podstawie twojego lokalnego czasu, jest teraz ${dayOfWeek.toLowerCase()}, godzina ${time}.<br />`;

    if (dt >= endDate)
    {
        when = "jutro"
        if (dt.getDay() == 6)
        {
            startDate.setDate(dt.getDate() + 1);
            adder = adder + 2;
            when = "w poniedziałek"
        }

        startDate.setDate(dt.getDate() + 1);
        adder = adder + 1;

        var startHour = parseInt(workHours[adder % 7].split(' ')[0]);

        startDate.setHours(startHour)
        startDate.setMinutes(0);

        finalText += `Komis jest zamknięty, zapraszamy ${when} o ${startDate.getHours()}:00`;
    }

    else if (dt < startDate)
    {
        finalText += `Komis jest jeszcze zamknięty, zapraszamy dzisiaj o ${startDate.getHours()}:00`;
    }

    else
    {
        var diffMs = (endDate - dt);
        var diffHrs = Math.floor((diffMs % 86400000) / 3600000);
        var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);

        if (diffHrs == 0)
        {
            finalText += `Komis jest jeszcze otwarty przez ${diffMins} minut.`;
        }
        else
        {
            finalText += `Komis jest jeszcze otwarty przez ${diffHrs} godzin i ${diffMins} minut.`;
        }
        if (diffHrs <= 1)
        {
            finalText += `(Śpiesz się, jeśli zamierzasz teraz udać się do komisu!)`
        }
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
