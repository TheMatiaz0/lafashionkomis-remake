var timer = null;
const TIMER_INTERVAL = 400;

const TOOLTIP_DATE = $("#tooltipDate")

const DAYS = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];
const WORK_HOURS = ['23 0', '11 18', '11 18', '11 18', '11 18', '11 18', '10 14'];

const DAY = 86400000;
const HOUR = 3600000;
const MINUTE = 60000;

$(document).ready(function()
{
    updateText();
});


TOOLTIP_DATE.mouseenter(function()
{
    start();
});

TOOLTIP_DATE.mouseleave(function()
{
    clr();
});

function tooltipGoSuccess()
{
    TOOLTIP_DATE.removeClass("colorUnderlineDanger");
    TOOLTIP_DATE.addClass("colorUnderlineSuccess");
}

function tooltipGoDanger()
{
    TOOLTIP_DATE.removeClass("colorUnderlineSuccess");
    TOOLTIP_DATE.addClass("colorUnderlineDanger");
}

function updateText()
{
    var now = new Date();
    var adder = now.getDay();

    var time = String(now.getHours()).padStart(2, "0") + ":" + String(now.getMinutes()).padStart(2, "0");
    var dayOfWeek = DAYS[adder];

    var startDate = new Date();
    var endDate = new Date();

    var startHour = parseInt(WORK_HOURS[adder % DAYS.length].split(' ')[0]);
    var endHour = parseInt(WORK_HOURS[adder % DAYS.length].split(' ')[1]);

    startDate.setHours(startHour)
    startDate.setMinutes(0);

    endDate.setHours(endHour);
    endDate.setMinutes(0);

    var finalText = `Według twojego lokalnego czasu, jest teraz ${dayOfWeek.toLowerCase()}, godzina ${time}.<br />`;

    var whenOpen = "jutro";

    if (now >= endDate)
    {
        if (now.getDay() == 6)
        {
            startDate.setDate(now.getDate() + 1);
            adder = adder + 2;
            whenOpen = "w poniedziałek"
        }

        startDate.setDate(now.getDate() + 1);
        adder = adder + 1;

        var startHour = parseInt(WORK_HOURS[adder % 7].split(' ')[0]);

        startDate.setHours(startHour)
        startDate.setMinutes(0);
        tooltipGoDanger();

        finalText += `To oznacza, że komis jest zamknięty, zapraszamy ${whenOpen} o ${startDate.getHours()}:00.`;
    }

    else if (now < startDate)
    {
        whenOpen = "dzisiaj"
        finalText += `To oznacza, że komis jest zamknięty, zapraszamy dzisiaj o ${startDate.getHours()}:00.`;
        tooltipGoDanger();
    }

    else
    {
        whenOpen = "teraz";
        var diffMs = (endDate - now);
        var diffHrs = Math.floor((diffMs % DAY) / HOUR);
        var diffMins = Math.round(((diffMs % DAY) % HOUR) / MINUTE);

        if (diffHrs == 0)
        {
            finalText += `Komis jest jeszcze otwarty przez ${diffMins} minut.`;
        }
        
        else
        {
            finalText += `Komis jest jeszcze otwarty przez ${diffHrs} godzin i ${diffMins} minut.`;
        }
        
        tooltipGoSuccess();
    }

    TOOLTIP_DATE.text(whenOpen);
    return finalText;
}

function changer()
{
    finalText = updateText();

    TOOLTIP_DATE.attr("data-bs-original-title", finalText);
    const tooltipElement = document.querySelector('[data-bs-toggle="tooltip"]');
    let tooltipInstance = bootstrap.Tooltip.getInstance(tooltipElement);
    tooltipInstance.show();
}

function start()
{
    timer = setInterval(changer, TIMER_INTERVAL);
}

function clr()
{
    clearInterval(timer);
}
