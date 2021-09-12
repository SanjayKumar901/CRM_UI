var app = angular.module("app", []);
app.controller("CRMIndex", function ($scope, $http) {
    $scope.LeadDetailGrid = null;
    $scope.LeadDetailGridMain = null;
    $scope.TotalCollection = null;
    $scope.YDA = null;
    $scope.TodayNop = null;
    $scope.TodayCollection = null;
    $scope.Todaylead = null;
    $scope.usertotal = null;
    $scope.CountPos = null;
    $scope.PosCollection = null;
    $scope.PoSThisMonth = null;
    $scope.PoSPrevMonth = null;
    $scope.TodayCollectionThisMonth = null;
    $scope.TodayCollectionPrevMonth = null;
    $scope.currentusertotal = null;
    $scope.prevusertotal = null;
    $scope.UserName = null;
    $scope.WelcomeText = null;
    $scope.currentpostotal = null;
    $scope.prevpostotal = null;
    $scope.CurrentMonthNops = null;
    $scope.PrevMonthNops = null;
    $scope.TopLeads = null;
    $scope.PoSReqList = null;
    $scope.SiteActivity = null;
    $scope.PENDINGLIST = null;
    $scope.RecentRegis = null;
    $scope.TodayProposal = null;
    $scope.TodayQuotes = null;
    $scope.leadCounter = 0;
    $scope.Regions = null;
    $scope.Region = null;
    $scope.leadStatusId = null;
    var MainRegions = null;
    var BusinessCityLabel = [];
    var BusinessCityAmount = [];
    var BusinessRegionLabel = [];
    var BusinessRegionAmount = [];
    var BusinessStatesLabel = [];
    var BusinessStatesAmount = [];
    var BusinessUsersLabel = [];
    var BusinessUsersAmount = [];
    var BusinessInsurerLabel = [];
    var BusinessInsurerAmount = [];
    var BusinessManufactureLabel = [];
    var BusinessManufactureAmount = [];
    var BusinessFuelLabel = [];
    var BusinessFuelAmount = [];
    var BusinessNopLabel = []
    var BusinessNopAmount = []
    var CreationTrendsLabel = []
    var CreationTrendsAmount = []
    var math = Math;
    var tempValue = "";
    let modal = null;
    FormLoad();
    function FormLoad() {
        modal = JSON.parse(window.localStorage.getItem("token"))
        //**********************Header Section********************
        var body = {
            Token: modal.token
        };
        $http.post("http://localhost:50972/api/Home/DashbordHeaders", body).then(function (Response) {
            $scope.TotalCollection = math.round(Response.data.totalCollection);
            $scope.TodayCollection = math.round(Response.data.todayCollection);
            $scope.TodayNop = Response.data.todayNoPS;
            $scope.YDA = Response.data.ydaNoPS;
            $scope.Todaylead = Response.data.todaylead;
            $scope.usertotal = Response.data.usertotal;
            $scope.CountPos = Response.data.countPos;
            $scope.PosCollection = math.round(Response.data.posCollection);
            $scope.PoSThisMonth = math.round(Response.data.poSThisMonth);
            $scope.PoSPrevMonth = math.round(Response.data.poSPrevMonth);
            $scope.TodayCollectionThisMonth = math.round(Response.data.todayCollectionThisMonth);
            $scope.TodayCollectionPrevMonth = math.round(Response.data.todayCollectionPrevMonth);
            $scope.TotalNops = math.round(Response.data.totalNOP);
            $scope.currentusertotal = Response.data.currentusertotal;
            $scope.prevusertotal = Response.data.prevusertotal;
            $scope.currentpostotal = Response.data.currentpostotal;
            $scope.prevpostotal = Response.data.prevpostotal;
            $scope.CurrentMonthNops = Response.data.currentMonthNops;
            $scope.PrevMonthNops = Response.data.prevMonthNops;
            $scope.TodayQuotes = Response.data.todayQuote;
            $scope.TodayProposal = Response.data.todayProposal;
        }, function (Response) {
            ////alert(Response.statusText)
        });
        //****************************END******************************

        //LeadGrid(getDate(new Date()), getDate(new Date()));
        /*BusinessByCity(getDate(new Date()), getDate(new Date()));
        BusinessByRegion(getDate(new Date()), getDate(new Date()));
        BusinessByStates(getDate(new Date()), getDate(new Date()));
        BusinessByUserStates(getDate(new Date()), getDate(new Date()));
        BusinessByInsurer(getDate(new Date()), getDate(new Date()));
        BusinessByManufacturer(getDate(new Date()), getDate(new Date()));
        BusinessByFuel(getDate(new Date()), getDate(new Date()));
        BusinessByNoP(getDate(new Date()), getDate(new Date()));
        BusinessByCreation();
        BusinessBySalse(getDate(new Date()), getDate(new Date()));
        BusinessByTopLeadTrends(getDate(new Date()), getDate(new Date()));
        SiteActivity(getDate(new Date()), getDate(new Date()));
        PosReqActivity(getDate(new Date()), getDate(new Date()));
        PendingLead(getDate(new Date()), getDate(new Date()));
        RequestRegistration(getDate(new Date()), getDate(new Date()));
        BusinessByLeadTrends(getDate(new Date()), getDate(new Date()));
        persecondLineGetData(User.clientID);
        regionlist();*/
    }
    $scope.leadsChange = function (data) {
        FilterGrid("policyStatus", data);
    }
    $scope.changeRegion = function (item) {
        var filterby = item == null ? "" : item.region
        FilterGrid("region", filterby);
    }
    //function FilterGrid(filterproperty, data) {
    function FilterGrid() {
        var tempData = null;
        tempData = $scope.LeadDetailGridMain;
        if ($scope.Region != null) {
            tempData = tempData.filter(row => row["region"] == $scope.Region.region)
        }
        if ($scope.leadStatusId != null && $scope.leadStatusId != "") {
            tempData = tempData.filter(row => row["policyStatus"] == $scope.leadStatusId)
        }
        $scope.LeadDetailGrid = tempData
        //if (data === "") {
        //    $scope.LeadDetailGrid = $scope.LeadDetailGridMain
        //}
        //else {
        //    var data = $scope.LeadDetailGridMain.filter(row => row[filterproperty] == data)
        //    $scope.LeadDetailGrid = data
        //}
        $scope.leadCounter = $scope.LeadDetailGrid.length;
    }
    function LeadGrid(startdate, enddate) {
        //*************************Lead Details*****************************
        var dasLeadModel = {
            Token: modal.token,
            fromDate: startdate,//"2019-12-31",
            toDate: enddate,//"2019-12-31",
        }
        $http.post("http://localhost:50972/api/Home/DashbordleadGrid", dasLeadModel).then(function (Response) {
            $scope.LeadDetailGrid = Response.data;
            $scope.leadCounter = $scope.LeadDetailGrid.length;
            $scope.LeadDetailGridMain = Response.data;
            FilterGrid();
            //if ($scope.Region != null) {
            //    FilterGrid("region", $scope.Region.region);
            //}
            //if ($scope.leadStatusId != null) {
            //    FilterGrid("policyStatus", $scope.leadStatusId);
            //}

        }, function (Response) {
            ////alert(Response.statusText)
        });
        //***************************END************************************
    }
    function BusinessByCity(startdate, enddate) {
        //*************************Business By City*************************
        var dasLeadModel = {
            userid: User.userID,
            clientid: User.clientID,
            fromDate: startdate,//"2019-12-31",
            toDate: enddate,//"2019-12-31",
            userRole: User.role
        }
        $http.post("http://localhost:50972/api/values/BusinessByCity", dasLeadModel).then(function (Response) {
            var list = []
            $(Response.data).each(function (index, value) {
                var chart = { name: "", value: 0 };
                chart.name = value.cityname
                chart.value = Math.round(value.amount)
                list.push(chart);
            })
            //BarChart("bar-chart", BusinessCityLabel, BusinessCityAmount);
            //LoadChart(BusinessCityLabel, BusinessCityAmount);
            GraphicChart("#CityBusinesschart", list);
        }, function (Response) {
            ////alert(Response.statusText)
        });
        //***************************END************************************
    }
    function BusinessByRegion(startdate, enddate) {
        //*************************Business Region City*************************
        var dasLeadModel = {
            userid: User.userID,
            clientid: User.clientID,
            fromDate: startdate,//"2019-12-31",
            toDate: enddate,//"2019-12-31",
            userRole: User.role
        }
        $http.post("http://localhost:50972/api/values/BusinessByRegion", dasLeadModel).then(function (Response) {
            var list = []
            $(Response.data).each(function (index, value) {
                var chart = { name: "", value: 0 };
                chart.name = value.region
                chart.value = Math.round(value.total)
                list.push(chart);
                //BusinessRegionLabel.push(value.region)
                //BusinessRegionAmount.push(value.total)
            })
            //BarChart("region-chart", BusinessRegionLabel, BusinessRegionAmount);
            GraphicChart("#RegionBusinesschart", list);
        }, function (Response) {
            ////alert(Response.statusText)
        });
        //***************************END************************************
    }
    function BusinessByStates(startdate, enddate) {
        //*************************Business States*************************
        var dasLeadModel = {
            userid: User.userID,
            clientid: User.clientID,
            fromDate: startdate,//"2019-12-31",
            toDate: enddate,//"2019-12-31",
            userRole: User.role
        }
        $http.post("http://localhost:50972/api/values/BusinessByStates", dasLeadModel).then(function (Response) {
            var list = []
            $(Response.data).each(function (index, value) {
                var chart = { name: "", value: 0 };
                chart.name = value.statename
                chart.value = Math.round(value.amount)
                list.push(chart);
                //BusinessStatesLabel.push(value.statename)
                //BusinessStatesAmount.push(value.amount)
            })
            //BarChart("states-chart", BusinessStatesLabel, BusinessStatesAmount);
            GraphicChart("#StatesBusinesschart", list);
        }, function (Response) {
            ////alert(Response.statusText)
        });
        //***************************END************************************
    }
    function BusinessByUserStates(startdate, enddate) {
        //*************************Users States*************************
        var dasLeadModel = {
            userid: User.userID,
            clientid: User.clientID,
            fromDate: startdate,//"2019-12-31",
            toDate: enddate,//"2019-12-31",
            userRole: User.role
        }
        $http.post("http://localhost:50972/api/values/BusinessByUsers", dasLeadModel).then(function (Response) {
            var list = []
            $(Response.data).each(function (index, value) {
                var chart = { name: "", value: 0 };
                chart.name = value.userid + ' - ' + value.username
                chart.value = Math.round(value.amount)
                list.push(chart);
                //BusinessUsersLabel.push(value.userid + ' - ' + value.username)
                //BusinessUsersAmount.push(value.amount)
            })
            //BarChart("users-chart", BusinessUsersLabel, BusinessUsersAmount);
            GraphicChart("#UsersBusinesschart", list);
        }, function (Response) {
            ////alert(Response.statusText)
        });
        //***************************END************************************
    }
    function BusinessByInsurer(startdate, enddate) {
        //*************************Insurer States*************************
        var dasLeadModel = {
            userid: User.userID,
            clientid: User.clientID,
            fromDate: startdate,//"2019-12-31",
            toDate: enddate,//"2019-12-31",
            userRole: User.role
        }
        $http.post("http://localhost:50972/api/values/BusinessByInsurer", dasLeadModel).then(function (Response) {
            var list = []
            $(Response.data).each(function (index, value) {
                var chart = { name: "", value: 0 };
                chart.name = value.companyname
                chart.value = Math.round(value.amount)
                list.push(chart);
                //BusinessInsurerLabel.push(value.companyname)
                //BusinessInsurerAmount.push(value.amount)
            })
            //BarChart("insurer-chart", BusinessInsurerLabel, BusinessInsurerAmount);
            GraphicChart("#InsurerBusinesschart", list);
        }, function (Response) {
            //alert(Response.statusText)
        });
        //***************************END************************************
    }
    function BusinessByManufacturer(startdate, enddate) {
        //*************************Manufacturer States*************************
        var dasLeadModel = {
            userid: User.userID,
            clientid: User.clientID,
            fromDate: startdate,//"2019-12-31",
            toDate: enddate,//"2019-12-31",
            userRole: User.role
        }
        $http.post("http://localhost:50972/api/values/BusinessByManufacturer", dasLeadModel).then(function (Response) {
            var list = []
            $(Response.data).each(function (index, value) {
                var chart = { name: "", value: 0 };
                chart.name = value.manufacturername
                chart.value = Math.round(value.amount)
                list.push(chart);
                //BusinessManufactureLabel.push(value.manufacturername)
                //BusinessManufactureAmount.push(value.amount)
            })
            //BarChart("manufacture-chart", BusinessManufactureLabel, BusinessManufactureAmount);
            GraphicChart("#ManufactureBusinesschart", list);
        }, function (Response) {
            //alert(Response.statusText)
        });
        //***************************END************************************
    }
    function BusinessByFuel(startdate, enddate) {
        //*************************Fuel Report*************************
        var dasLeadModel = {
            userid: User.userID,
            clientid: User.clientID,
            fromDate: startdate,//"2019-12-31",
            toDate: enddate,//"2019-12-31",
            userRole: User.role
        }
        $http.post("http://localhost:50972/api/values/BusinessByFuel", dasLeadModel).then(function (Response) {
            //var list = []
            $(Response.data).each(function (index, value) {
                //var chart = { name: "", value: 0 };
                //chart.name = value.fuelname
                //chart.value = Math.round(value.amount)
                //list.push(chart);
                BusinessFuelLabel.push(value.fuelname)
                BusinessFuelAmount.push(value.amount)
            })
            BarChart("fuel-chart", BusinessFuelLabel, BusinessFuelAmount);
            //GraphicChart("#FuelBusinesschart", list);
        }, function (Response) {
            //alert(Response.statusText)
        });
        //***************************END************************************
    }
    function BusinessByNoP(startdate, enddate) {
        //*************************Fuel Report*************************
        var dasLeadModel = {
            userid: User.userID,
            clientid: User.clientID,
            fromDate: startdate,//"2019-12-31",
            toDate: enddate,//"2019-12-31",
            userRole: User.role
        }
        $http.post("http://localhost:50972/api/values/BusinessByNoPS", dasLeadModel).then(function (Response) {
            //var list = []
            $(Response.data).each(function (index, value) {
                //var chart = { name: "", value: 0 };
                //chart.name = value.noPS
                //chart.value = Math.round(value.amount)
                //list.push(chart);
                BusinessNopLabel.push(value.noPS)
                BusinessNopAmount.push(value.amount)
            })
            BarChart("nop-chart", BusinessNopLabel, BusinessNopAmount);
            //GraphicChart("#NoPSBusinesschart", list);
        }, function (Response) {
            //alert(Response.statusText)
        });
        //***************************END************************************
    }
    function BusinessByCreation() {
        //*************************Creation Report*************************
        var startdate, enddate
        var dd = new Date()
        var month = dd.getMonth() + 1;
        if (parseInt(month) < 10)
            month = "0" + month
        startdate = dd.getFullYear() + "-" + month + "-01";
        enddate = getDate(endOfMonth(dd))
        var dasLeadModel = {
            userid: User.userID,
            clientid: User.clientID,
            fromDate: startdate,//"2019-12-31",
            toDate: enddate,//"2019-12-31",
            userRole: User.role
        }
        $http.post("http://localhost:50972/api/values/CreationUserTrends", dasLeadModel).then(function (Response) {
            var max = 0;
            $(Response.data).each(function (index, value) {
                CreationTrendsLabel.push(value.createddate)
                CreationTrendsAmount.push(value.userid)
                if (max < value.userid)
                    max = value.userid
            })
            LineChart(CreationTrendsLabel, CreationTrendsAmount, max);
        }, function (Response) {
            //alert(Response.statusText)
        });
        //***************************END************************************
    }
    function BusinessBySalse(startdate, enddate) {
        //*************************Salse Trends*************************
        var dasLeadModel = {
            userid: User.userID,
            clientid: User.clientID,
            fromDate: startdate,//"2019-12-31",
            toDate: enddate,//"2019-12-31",
            userRole: User.role
        }
        $http.post("http://localhost:50972/api/values/SalesProductWiseTrends", dasLeadModel).then(function (Response) {
            var max = 0;
            var ss = Response.data;
            sales(ss)
        }, function (Response) {
            //alert(Response.statusText)
        });
        //***************************END************************************
    }
    function BusinessByLeadTrends(startdate, enddate) {
        //*************************Lead Trends*************************
        var startdate, enddate
        var dd = new Date()
        var month = dd.getMonth() + 1;
        if (parseInt(month) < 10)
            month = "0" + month
        startdate = dd.getFullYear() + "-" + month + "-01";
        enddate = getDate(endOfMonth(dd))
        var dasLeadModel = {
            userid: User.userID,
            clientid: User.clientID,
            fromDate: startdate,//"2019-12-31",
            toDate: enddate,//"2019-12-31",
            userRole: User.role
        }
        $http.post("http://localhost:50972/api/values/LeadProductWiseTrends", dasLeadModel).then(function (Response) {
            var ss = Response.data;
            Lead(ss)
        }, function (Response) {
            //alert(Response.statusText)
        });
        //***************************END************************************
    }
    function BusinessByTopLeadTrends(startdate, enddate) {
        //*************************Top Lead Trends*************************
        var dasLeadModel = {
            userid: User.userID,
            clientid: User.clientID,
            fromDate: startdate,//"2019-12-31",
            toDate: enddate,//"2019-12-31",
            userRole: User.role
        }
        $http.post("http://localhost:50972/api/values/TopLeadProductWise", dasLeadModel).then(function (Response) {
            $scope.TopLeads = Response.data;
        }, function (Response) {
            //alert(Response.statusText)
        });
        //***************************END************************************
    }
    function SiteActivity(startdate, enddate) {
        //*************************Site Activity*************************
        var dasLeadModel = {
            userid: User.userID,
            clientid: User.clientID,
            fromDate: startdate,//"2019-12-31",
            toDate: enddate,//"2019-12-31",
            userRole: User.role
        }
        $http.post("http://localhost:50972/api/values/SiteAcivity", dasLeadModel).then(function (Response) {
            $scope.SiteActivity = Response.data;
        }, function (Response) {
            //alert(Response.statusText)
        });
        //***************************END************************************
    }
    function PosReqActivity(startdate, enddate) {
        //***************************Pos Req Activity************************
        var dasLeadModel = {
            userid: User.userID,
            clientid: User.clientID,
            fromDate: startdate,//"2019-12-31",
            toDate: enddate,//"2019-12-31",
            userRole: User.role
        }
        $http.post("http://localhost:50972/api/values/POSReq", dasLeadModel).then(function (Response) {
            $scope.PoSReqList = Response.data;
        }, function (Response) {
            //alert(Response.statusText)
        });
        //***************************END************************************
    }
    function PendingLead(startdate, enddate) {
        //***************************Pending Lead************************
        var dasLeadModel = {
            userid: User.userID,
            clientid: User.clientID,
            fromDate: startdate,//"2019-12-31",
            toDate: enddate,//"2019-12-31",
            userRole: User.role
        }
        $http.post("http://localhost:50972/api/values/PendingLeads", dasLeadModel).then(function (Response) {
            $scope.PENDINGLIST = Response.data;
        }, function (Response) {
            //alert(Response.statusText)
        });
        //***************************END************************************
    }
    function RequestRegistration(startdate, enddate) {
        //***************************Request Registration************************
        var dasLeadModel = {
            userid: User.userID,
            clientid: User.clientID,
            fromDate: startdate,//"2019-12-31",
            toDate: enddate,//"2019-12-31",
            userRole: User.role
        }
        $http.post("http://localhost:50972/api/values/RecentRegis", dasLeadModel).then(function (Response) {
            $scope.RecentRegis = Response.data;
        }, function (Response) {
            //alert(Response.statusText)
        });
        //***************************END************************************
    }
    function LoadChart(BusinessCityLabel, BusinessCityAmount) {
        'use strict';

        var axisY = BusinessCityLabel;//BusinessCityAmount;//["Apple", "Orange", "Banana", "Tomato", "Milk", "Potato"];
        var axisX = ["10", "20", "30", "40", "50", "60", "70", "80", "90", "100"];
        var barsValue = BusinessCityAmount;//[50, 61, 93, 76, 5, 13];

        // Data to charts
        var data = {
            "axisY": axisY,         // Data for axis Y labels
            "axisX": axisX,         // Data for axis X labels
            "bars": barsValue       // Data for bars value
        };

        // My options
        var options = {
            data: data,
            showValues: true,
            showHorizontalLines: true,
            animation: true,
            animationOffset: 0,
            labelsAboveBars: true
        };

        var options2 = {
            data: data,
            showValues: true,
            showHorizontalLines: true,
            animation: true,
            animationOffset: 0,
            animationRepeat: false,
            showArrows: false,
            labelsAboveBars: false
        };

        var chart = $('#chart-1').rumcaJS(options2);
        var chart2 = $('#chart-2').rumcaJS(options);

        chart2.sortByValue();
    }
    function getDate(dateObj) {
        var date = dateObj;//new Date()
        var month = date.getMonth() + 1;
        var day = date.getDate();
        if (parseInt(month) < 10)
            month = "0" + month;
        if (parseInt(day) < 10)
            day = "0" + day;
        var fullDate = date.getFullYear() + "-" + month + "-" + day;
        return fullDate;
    }
    function endOfMonth(date) {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0);
    }

    function BarChart(chart, BusinessLabel, BusinessAmount) {
        new Chart(document.getElementById(chart), {
            type: 'bar',
            data: {
                labels: BusinessLabel,//["Africa", "Asia", "Europe", "Latin America", "North America"],
                datasets: [
                    {
                        label: "Population (millions)",
                        backgroundColor: "#6174d5",
                        //height:"25px",
                        data: BusinessAmount//[8478, 6267, 5734, 4784, 1833]
                    }
                ]
            },
            options: {
                legend: { display: false },
                title: {
                    display: true,
                    text: 'City Business Report'
                }
            }
        });
    }
    function LineChart(label, amount, max) {
        var chart = new Chartist.Line('.stats1', {
            labels: label,
            series: [amount]
        }, {
            low: 0,
            high: max,
            showArea: true,
            fullWidth: true,
            plugins: [
                Chartist.plugins.tooltip()
            ],
            axisY: {
                onlyInteger: true,
                scaleMinSpace: 40,
                offset: 20,
                labelInterpolationFnc: function (value) {
                    return (value / 1);
                }
            },
        });
    }
    function sales(datamodel) {
        var dm = JSON.stringify(datamodel)
        Morris.Bar({
            element: 'morris-bar-chartOne',
            data: datamodel,//datamodel,//
            xkey: 'month',
            ykeys: ['pvc', 'tw', 'hlt'],
            labels: ['Private Car', 'Two Wheeler', 'Health'],
            barColors: ['#01caf1', '#5f76e8', '#999999'],
            hideHover: 'auto',
            gridLineColor: '#eef0f2',
            resize: true
        });
    }
    function Lead(datamodel) {
        var dm = JSON.stringify(datamodel)
        Morris.Bar({
            element: 'morris-bar-chartTwo',
            data: datamodel,//datamodel,//
            xkey: 'month',
            ykeys: ['pvc', 'tw', 'hlt'],
            labels: ['Private Car', 'Two Wheeler', 'Health'],
            barColors: ['#01caf1', '#5f76e8', '#999999'],
            hideHover: 'auto',
            gridLineColor: '#eef0f2',
            resize: true
        });
    }
    function persecondLineGetData(clientid) {
        var client = {
            clientid: clientid
        }
        $http.post("http://localhost:50972/api/values/ReportTY", client).then(function (Response) {
            persecondLineChart(Response.data)
        }, function (Response) {
            //alert(Response.statusText)
        });
    }
    function persecondLineChart(DataValues) {
        Morris.Area({
            element: 'morris-area-chart',
            data: DataValues,
            xkey: 'alldate',
            ykeys: ['yesterday', 'today'],
            labels: ['yesterday', 'today'],
            pointSize: 3,
            fillOpacity: 0,
            pointStrokeColors: ['#5f76e8', '#01caf1'],
            behaveLikeLine: true,
            gridLineColor: '#e0e0e0',
            lineWidth: 3,
            hideHover: 'auto',
            lineColors: ['#5f76e8', '#01caf1'],
            resize: true

        });
    }
    function GraphicChart(chartID, chartData) {
        var data = chartData;

        //sort bars based on value
        data = data.sort(function (a, b) {
            return d3.ascending(a.value, b.value);
        })

        //set up svg using margin conventions - we'll need plenty of room on the left for labels
        var margin = {
            top: 15,
            right: 100,
            bottom: 15,
            left: 160
        };

        var width = 500 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        var svg = d3.select(chartID).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var x = d3.scale.linear()
            .range([0, width])
            .domain([0, d3.max(data, function (d) {
                return d.value;
            })]);

        var y = d3.scale.ordinal()
            .rangeRoundBands([height, 0], .1)
            .domain(data.map(function (d) {
                return d.name;
            }));

        //make y axis to show bar names
        var yAxis = d3.svg.axis()
            .scale(y)
            //no tick marks
            .tickSize(0)
            .orient("left");

        var gy = svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)

        var bars = svg.selectAll(".bar")
            .data(data)
            .enter()
            .append("g")

        //append rects
        bars.append("rect")
            .attr("class", "bar")
            .attr("y", function (d) {
                return y(d.name);
            })
            .attr("height", y.rangeBand())
            .attr("x", 0)
            .attr("width", function (d) {
                return x(d.value);
            });

        //add a value label to the right of each bar
        bars.append("text")
            .attr("class", "label")
            //y position of the label is halfway down the bar
            .attr("y", function (d) {
                return y(d.name) + y.rangeBand() / 2 + 4;
            })
            //x position is 3 pixels to the right of the bar
            .attr("x", function (d) {
                return x(d.value) + 3;
            })
            .text(function (d) {
                return d.value;
            });

    }
    function camelCase(str) {
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
            return index == 0 ? word.toLowerCase() : word.toUpperCase();
        }).replace(/\s+/g, '');
    }
    function regionlist() {
        modal = JSON.parse(window.localStorage.getItem("token"))
        var body = {
            Token: modal.token
        };
        $http.post("http://localhost:50972/api/Home/RegionZones", body).then(function (Response) {
            $scope.Regions = Response.data;
        }, function (Response) {
            //alert(Response.statusText);
        })
    }
    function getDateRangeValue(value) {
        tempValue = value
    }
    //**********************Callendar****************************
    $(function () {
        var start = moment().subtract(0, 'days');
        var end = moment();
        function cb(start, end) {
            $('#reportrange span').html(start.format('YYYY-MM-DD') + ' - ' + end.format('YYYY-MM-DD'));
            LeadGrid(start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD'))
        }
        $('#reportrange').daterangepicker({
            startDate: start,
            endDate: end,
            ranges: {
                'Today': [moment(), moment()],
                'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
                'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            }
        }, cb);

        cb(start, end);

    });
    //**************************END******************************
});
app.controller("navcontroller", function ($scope, $http) {
    var GlobalModal = null;
    GetToken();
    //$("#userName").text(data.firstName + " " + data.lastName)
    //$("#WelcomeText").text(GetWelcome())
    var navgrouplist = []
    var navgrouplistMaster = null;
    $scope.Navs = null;
    var model = {
        Token: GlobalModal.token
    }
    $http.post("http://localhost:50972/api/Home/DashBoardPrivilages", model).then(function (Response) {
        navgrouplistMaster = Response.data
        var counter = 0;
        $(Response.data).each(function (index, value) {
            if (navgrouplist.filter(row => row.privilegeName == value.privilegeGroupName).length <= 0) {
                var prv = {
                    privid: counter,
                    privilegeName: value.privilegeGroupName,
                    url: value.url
                }
                counter += 1;
                navgrouplist.push(prv)
            }
        })
        $scope.Navs = navgrouplist;
    }, function (Response) {
    })
    $scope.submenu = function (nav) {
        var submenu = navgrouplistMaster.filter(row => row.privilegeGroupName == nav.privilegeName)
        var navul = "<ul class='first-level'>";
        $("#sidebarnav ul").each(function () {
            $(this).remove();
        })

        $(submenu).each(function (index, value) {
            navul += "<li  class='sidebar-item'><a href='" + value.url + "' class='sidebar-link'><span class='hide-menu'>" + value.privilegeName + "</span></a></li>"
        })
        navul += "</ul>"
        $("#sidebarnav").find('> li').eq(nav.privid).after(navul)
    }
    function GetWelcome() {
        var hours = new Date().getHours();
        if (hours < 12) {
            return "Good Morning"
        }
        else if (hours >= 12 && hours <= 15) {
            return "Good Afternoon"
        }
        else if (hours > 15) {
            return "Good Evening"
        }
    }
    function GetToken() {
        GlobalModal = JSON.parse(window.localStorage.getItem("token"));
    }
});