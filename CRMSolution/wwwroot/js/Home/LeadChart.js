/*-----Chart implementation by Sunil----*/
var myChart;
function GenerateChart(leadList, startdate, enddate, chartFor) {
    //debugger;
    if (!chartFor || chartFor.length <= 0) 
    {
        return;
    }
    var car = [];
    var bike = [];
    var gcv = [];
    var pcv = [];
    var health = [];
    var life = [];
    var travel = [];

    var xValues = [];

    var stDt = new Date(startdate);
    stDt.setDate(stDt.getDate() - 1);
    var enDt = new Date(enddate);
    var interval = 1;

    const diffTime = Math.abs(enDt - stDt);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    console.log(diffDays + " days");
    if (diffDays > 31) {
        interval = (diffDays / 31) + 1;
    }
    while (stDt <= enDt) {
        xValues.push(formatDate(stDt));
        stDt.setDate(stDt.getDate() + interval);
    }

    $.each(xValues, function (i, item) {
        car.push(leadList.filter(row => formatDate(row["enquirydate"]) == item && row["enquirytype"] == "Car").length);
        bike.push(leadList.filter(row => formatDate(row["enquirydate"]) == item && row["enquirytype"] == "Two").length);
        gcv.push(leadList.filter(row => formatDate(row["enquirydate"]) == item && row["enquirytype"] == "GCV").length);
        pcv.push(leadList.filter(row => formatDate(row["enquirydate"]) == item && row["enquirytype"] == "PCV").length);
        health.push(leadList.filter(row => formatDate(row["enquirydate"]) == item && row["enquirytype"] == "HLT").length);
        life.push(leadList.filter(row => formatDate(row["enquirydate"]) == item && row["enquirytype"] == "TL").length);
        travel.push(leadList.filter(row => formatDate(row["enquirydate"]) == item && row["enquirytype"] == "TRV").length);
    });

    var dsets = new Array();
    if (chartFor.filter(x => x.selected == true && x.name == "Car").length > 0) {
        dsets.push({
            data: car,
            borderColor: "red",
            fill: false
        })
    }
    if (chartFor.filter(x => x.selected == true && x.name == "Bike").length > 0) {
        dsets.push({
            data: bike,
            borderColor: "blue",
            fill: false
        })
    }
    if (chartFor.filter(x => x.selected == true && x.name == "GCV").length > 0) {
        dsets.push({
            data: gcv,
            borderColor: "green",
            fill: false
        })
    }
    if (chartFor.filter(x => x.selected == true && x.name == "PCV").length > 0) {
        dsets.push({
            data: bike,
            borderColor: "yellow",
            fill: false
        })
    }
    if (chartFor.filter(x => x.selected == true && x.name == "Health").length > 0) {
        dsets.push({
            data: pcv,
            borderColor: "purple",
            fill: false
        })
    }
    if (chartFor.filter(x => x.selected == true && x.name == "Life").length > 0) {
        dsets.push({
            data: life,
            borderColor: "orange",
            fill: false
        })
    }
    if (chartFor.filter(x => x.selected == true && x.name == "Travel").length > 0) {
        dsets.push({
            data: travel,
            borderColor: "brown",
            fill: false
        })
    }
    

     myChart=  new Chart("myChart", {
        type: "line",
        data: {
            labels: xValues,
            datasets: dsets
        },
        options: {
            legend: { display: false },
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'No. of leads'
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Date range'
                    }
                }]
            }
        }
    });
}
function formatDate(dateString) {
    var dt = new Date(dateString);
    if (dt) {
        return dt.toLocaleDateString("en-US");
    }
    return undefined;
}

$("#closeModel1,#closeModel2").click(function () {
    alert("Hiii")
    myChart.destroy();
});

/*-----End Chart implementation by Sunil----*/
