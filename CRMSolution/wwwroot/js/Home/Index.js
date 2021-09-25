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
    $scope.Product = "All";
    $scope.SearchLead = null;
    $scope.EnquiryInfo = null;
    $scope.AfterQuoteEnquiryInfo = null;
    $scope.IsAfterQuotePopup = false;
    $scope.IsQuotePopup = false;
    $scope.SelectedEnquiryNumber = "";
    $scope.IsHLTQuotePopup = false;
    $scope.IsHLTAfterQuotePopup = false;
    $scope.PosReqGrid = null;
    $scope.IsShowPosReqGrid = false;
    $scope.PosReqCounter = null;
    $scope.TodayQuote = null;
    $scope.TodayProposal = null;
    $scope.IsNotPayment = false;
    $scope.IsUserActive = null;
    $scope.RmModel = null;
    $scope.POSQProcess = false;
    $scope.IsFifteenHour = false;
    $scope.IsSyllabus = false;
    $scope.doneFifteenHour = false;
    $scope.IsAllTheBest = false;
    $scope.IsExamStart = false;
    $scope.IsResult = false;
    $scope.ClaimList = null;
    $scope.SharedList = null;
    $scope.LoginList = null;
    $scope.IsOnline = false;
    $scope.IsMotOfflineQuotePopup = false;
    $scope.Enquiryno = null;
    $scope.SelectPolicyType = 'New';
    $scope.BasicOD = null;
    $scope.BasicTP = null;
    $scope.GrossPremium = null;
    $scope.NetPremium = null;
    $scope.TotalPremium = null;
    $scope.ServiceTax = null;
    $scope.CheckComeFrom = null;
    $scope.ProductMainList = null;
    $scope.SelectMakeList = null;
    $scope.SelectFuelList = null;
    $scope.SelectFuell = null;
    $scope.VariantList = null;
    $scope.SelectVariant = null;
    $scope.Rtos = null;
    $scope.Rto = null;
    $scope.RegistrationList = null;
    $scope.SelectRegistration = null;
    $scope.Insurer = null;
    $scope.InsurerList = null;
    $scope.InsurerHLTList = null;
    $scope.SelectInsurer = null;
    $scope.offlineModel = null;
    $scope.ResponseInsurer = null;
    $scope.OfflineLeadDetailGrid = null;
    $scope.IsMotOfflineSelectInsure = false;
    $scope.IsHLTOfflineQuotePopup = false;
    $scope.IsModelShow = false;
    $scope.YourAge = false;
    $scope.SpouseAge = false;
    $scope.ageList = null;
    $scope.PolicyURL = window.location.origin + '/uploadpolicy/Policy/';
    $scope.RCURL = window.location.origin + '/uploadpolicy/RC/';
    $scope.IsDashHeaderLoading = true;
    $scope.Remarks = null;
    $scope.QuestionList = null;
    $scope.PosResult = false;
    $scope.IsPass = null;
    $scope.UserRole = null;
    $scope.RelatedQuery = null;
    $scope.ClaimCount = 0;
    $scope.SharedListCount = 0;
    $scope.PrivilegeModule = [];
    $scope.IsOfflineLead = false;
    $scope.IsHeader = false;
    $scope.IsLead = false;
    $scope.IsPosReq = false;
    $scope.IsClaim = false;
    $scope.IsShared = false;
    $scope.IsLoginHis = false;
    $scope.roleModel = null;
    $scope.RoleList = [];
    $scope.LoginListMaster = null;
    $scope.examSummary = [];
    $scope.BirthdayPopup = false;
    $scope.BirthdayUserList = [];
    $scope.BirthdayUserCount = null;
    $scope.IsBirthdayWish = false;
    $scope.BirthdayMessage = null;

    //---------Chart Implementation--------------

    $scope.chartList = [{
        name: 'Car',
        class: "Red",
        selected: true
    }, {
        name: 'Bike',
        class: "Blue",
        selected: true
    }, {
        name: 'GCV',
        class: "Green",
        selected: true
    }, {
        name: 'PCV',
        class: "Yellow",
        selected: true
    }, {
        name: 'Health',
        class: "Purple",
        selected: true
    }, {
        name: 'Life',
        class: "Orange",
        selected: true
    }, {
        name: 'Travel',
        class: "Brown",
        selected: true
    }];

    $scope.chartItemChecked = function (i) {
        GenerateChart($scope.LeadDetailGrid, TempstartDate, TempEndDate, $scope.chartList);
    };
    $scope.chartclick = function () {
        GenerateChart($scope.LeadDetailGrid, TempstartDate, TempEndDate, $scope.chartList);
    };

    $scope.$watchCollection('chartList ', function (oldValue, newValue) {
        for (var i = 0; i < oldValue.length; i++) {
            if (oldValue[i].selected !== newValue[i].selected) {
                $scope.chartItemChecked(i);
            }
        }
    });

    //------------End Chart Implementation---------

    var ageindex = 0;
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
    var FileUploadedList = [];
    var math = Math;
    var tempValue = "";
    var RegisterAsPosStartDate = null;
    var RegisterAsPosEndDate = null;
    var ClaimStartDate = null;
    var ClaimEndDate = null;
    var SharedStartdate = null;
    var SharedEndate = null;
    var LoginStartdate = null;
    var LoginEndate = null;
    var TempstartDate = null;
    var TempEndDate = null;
    let modal = null;
    var CurrentDomail = window.location.origin;
    var lstOption = "";
    FormLoad();
    function FormLoad() {
        debugger;
        let body = {
            Token: JsonWebToken.token
        };
        var model = {
            URL: Domain + "/api/User/GetUserInfo",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (ResponseData) {
            debugger;
            let info = JSON.parse(ResponseData.data);
            if (info.status == "Active") {
                $scope.UserRole = info.roleID
                if (info.roleID == 30) {
                    //window.location.href ="/Business/BusinessReport"
                }
                if (info.roleID == 8) {
                    checkActive();
                }
                else {
                    $scope.IsUserActive = true;
                    DashboardPrivilege();
                }
            }
            else {
                Logout();
            }
        }, function (Response) {
        })
        /*
        
       
        var auto_refresh = setInterval(
            function () {
                if ($scope.IsUserActive == true) {
                    LeadGrid(TempstartDate, TempEndDate);
                    Header();
                    OfflineLeadDetailGrid();
                }
            }, 120000);
            */
    }
    $scope.leadsChange = function (data) {
        FilterGrid("policyStatus", data);
    }
    $scope.changeRegion = function (item) {
        var filterby = item == null ? "" : item.region
        FilterGrid("region", filterby);
    }
    $scope.SelectProduct = function (Product) {
        FilterGrid();
    }
    $scope.SearchLeadData = function (SearchLead) {
        let tempData = null;
        tempData = $scope.LeadDetailGridMain;
        if ($scope.SearchLead == null || $scope.SearchLead == "")
            tempData = $scope.LeadDetailGridMain;
        else
            tempData = tempData.filter(row => row["enquiryNo"] == $scope.SearchLead
                || row["userName"] == $scope.SearchLead
                || row["mobileno"] == $scope.SearchLead);
        $scope.LeadDetailGrid = tempData;
    }
    $scope.GetEnquiryInfo = function (EnquiryNo, Status, EnqType) {
        $scope.IsNotPayment = false;
        FileUploadedList = [];
        $scope.InsurerList = null;
        $scope.InsurerHLTList = null;

        var body = {
            Token: JsonWebToken.token,
            EnquiryNo: EnquiryNo,
            Product: EnqType,
            Action: Status == "Quotation Success" || Status == "Quotation Fail" || Status == "Quotation Awaited" ? "quote" : "afterquote"
        };
        $scope.CheckComeFrom = $scope.LeadDetailGrid.filter(row => row.enqNo == EnquiryNo)[0];

        var model = {
            URL: Domain + "/api/Home/QuetationInfo",
            PostString: JSON.stringify(body)
        }
        if (Status == "Quotation Success" || Status == "Quotation Fail" || Status == "Quotation Awaited") {
            if (EnqType == "Two" || EnqType == "Car" || EnqType == "PCV" || EnqType == "GCV")
                $scope.IsQuotePopup = true;
            else if (EnqType == "HLT")
                $scope.IsHLTQuotePopup = true;

        }
        else {
            if (EnqType == "Two" || EnqType == "Car" || EnqType == "PCV" || EnqType == "GCV")
                $scope.IsAfterQuotePopup = true;
            else if (EnqType == "HLT")
                $scope.IsHLTAfterQuotePopup = true;
        }
        $scope.EnquiryInfo = null;
        $scope.AfterQuoteEnquiryInfo = null;
        $scope.SelectedEnquiryNumber = EnquiryNo;
        $http.post(CallApiPostMethod, model).then(function (ResponseData) {
            if (Status == "Quotation Success") {
                $scope.EnquiryInfo = JSON.parse(ResponseData.data);
                $scope.IsNotPayment = false;
                $scope.IsOnline = true;
            }
            else if (Status == "Quotation Awaited") {
                $scope.EnquiryInfo = JSON.parse(ResponseData.data);
                $scope.EnquiryInfo.policyUrl = $scope.PolicyURL + $scope.EnquiryInfo.policyUrl;
                $scope.EnquiryInfo.rcUrl = $scope.RCURL + $scope.EnquiryInfo.rcUrl;
                $scope.IsNotPayment = false;
                $scope.IsOnline = false;
            }
            else {
                $scope.IsNotPayment = Status == "Payment Success" ? false : true;
                $scope.AfterQuoteEnquiryInfo = JSON.parse(ResponseData.data);
            }
        }, function (Response) {
            ////alert(Response.statusText)
        });
    }
    $scope.CloseEnquiryInfo = function () {
        CloseAllPopup();
    }
    $scope.GotoPayment = function () {
        let Enquirytype = $scope.CheckComeFrom.enquirytype;
        if (Enquirytype != "HLT")
            window.location.href = window.location.origin + "/ProposalMotor/GetFullDetails?enquiryno=GoToPayment-" + $scope.SelectedEnquiryNumber + "&User=" + JsonWebToken.token;
        else
            window.location.href = window.location.origin + "/proposalhealth/getfulldetails?enquiryno=GoToPayment-" + $scope.SelectedEnquiryNumber + "&User=" + JsonWebToken.token;
    }
    $scope.Start = function (obj) {
        var body = {
            Token: JsonWebToken.token,
            Start: obj == "start" ? true : false
        };
        var model = {
            URL: Domain + "/api/Home/StartExamForFurtherProcess",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (ResponseData) {
            alert(ResponseData.data);
            CheckTestProcess()
        }, function (ResponseData) {
            alert(ResponseData);
        })
    }
    $scope.Syllabus = function (gotoSyllabus) {
        if (gotoSyllabus) {
            $scope.IsFifteenHour = true;
            $scope.IsSyllabus = false;
        }
        else {
            $scope.IsFifteenHour = false;
            $scope.IsSyllabus = true;
        }
    }
    $scope.CompleteTraining = function () {
        var body = {
            Token: JsonWebToken.token,
            IsTrainingComplete: true
        };
        var model = {
            URL: Domain + "/api/Home/TrainingDone",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (ResponseData) {
            if (ResponseData.data) {
                $scope.IsSyllabus = false;
                $scope.IsAllTheBest = true;
            }
        }, function (Response) {
        })
    }
    $scope.StartExam = function () {
        $scope.IsAllTheBest = false;
        $scope.IsExamStart = true;
        var body = {
            Token: JsonWebToken.token
        };
        var model = {
            URL: Domain + "/api/Home/PosExamQuestions",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (ResponseData) {
            if (ResponseData.data != "") {
                $scope.QuestionList = JSON.parse(ResponseData.data);
            }
        }, function (ResponseData) {
        })
    }
    $scope.GotoResult = function () {
        let FinalResult = [];
        $($scope.QuestionList).each(function (ind, val) {
            var resultOUt = {
                ID: parseInt(val.id),
                Answer: $("input[name=" + val.id + "]:checked").val()
            }
            if (resultOUt.Answer != undefined) {
                FinalResult.push(resultOUt);
            }
        })
        if (FinalResult.length < $scope.QuestionList.length) {
            alert("All questions are mandatory").
            return
        }
        else {
            var body = {
                Token: JsonWebToken.token,
                IsExamComplete: true,
                FinalResult: FinalResult
            };
            var model = {
                URL: Domain + "/api/Home/ExamOver",
                PostString: JSON.stringify(body)
            }
            $http.post(CallApiPostMethod, model).then(function (ResponseData) {
                alert(ResponseData.data)
                $scope.IsPass = ResponseData.data;
                $scope.IsExamStart = false;
                $scope.IsResult = true;
            }, function (ResponseData) {
            })
        }
    }
    $scope.GotoCreate = function (Reqmodel) {
        window.localStorage.setItem("create", JSON.stringify(Reqmodel))

    }
    $scope.DownloadMotorReport = function () {
        let body = {
            Token: JsonWebToken.token,
            FromDate: TempstartDate,
            ToDate: TempEndDate
        };
        var model = {
            URL: Domain + "/api/Home/GetLeadDownload",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (ResponseData) {
            window.open(ResponseData.data, "_blank");
        }, function (Response) {
        })
    }
    $scope.GotoProposal = function (EnqNo) {
        let Enquirytype = $scope.CheckComeFrom.enquirytype;
        let model = {
            Token: JsonWebToken.token,
            EnquiryNo: EnqNo,
        }
        if (Enquirytype != "HLT") {
            let body = {
                URL: Domain + "/api/Home/CheckForGotoProposal",
                PostString: JSON.stringify(model)
            }
            $http.post(CallApiPostMethod, body).then(function (ResponseData) {
                let Respo = JSON.parse(ResponseData.data);
                if (Respo.status == "Success" || Respo.status == "Policy is not found.") {
                    let Product = $scope.CheckComeFrom.enquirytype == "Two" ? "TwoWheeler" : $scope.CheckComeFrom.enquirytype;
                    window.open(CurrentDomail + "/" + Product + '/Quotes?policytype=' + Respo.policyType + '&Data=' + Respo.encryptENQ + '&User=' + JsonWebToken.token, "_blank");
                }
                else {
                    try {
                        let responsemodel = JSON.parse(ResponseData.data);
                        alert(responsemodel.status)
                    }
                    catch (ex) {
                        alert(ResponseData.data)
                    }
                }
            }, function (Response) {
                //alert(Response.statusText)
            });
        }
        else {
            let body = {
                URL: Domain + "/api/Home/Encode",
                PostString: JSON.stringify(model)
            }
            $http.post(CallApiPostMethod, body).then(function (ResponseData) {
                window.location.href = CurrentDomail + "/Health/Quote?Data=" + ResponseData.data + '&User=' + JsonWebToken.token;
            }, function (Response) {
                //alert(Response.statusText)
            });
        }
    }
    $scope.GotoFillOfflineProposal = function (Enq, Product) {
        CloseAllPopup();
        let pushData = [];
        $scope.ageList = null;
        if (Product == "MOT") {
            $scope.IsMotOfflineQuotePopup = true;
            $scope.Enquiryno = Enq;
            GetVehicleList();
        }
        else if (Product == "HLT") {
            $scope.IsHLTOfflineQuotePopup = true;
            $scope.Enquiryno = Enq;
            if ($scope.ageList == null) {
                for (var i = 1; i <= 100; i++) {
                    var lst = {
                        text: i,
                        val: i
                    };
                    lstOption = lstOption + "<option value='" + i + "'>" + i + "</option>"
                    pushData.push(lst);
                }
                $scope.ageList = pushData;
            }
        }
        GetInsurer();
    }
    $scope.SaveOfflineMotorQuote = function () {
        let body = {
            Token: JsonWebToken.token,
            Enquiryno: $scope.Enquiryno,
            MotorType: $scope.CheckComeFrom.enquirytype,
            PolicyType: $scope.SelectPolicyType,
            ManufacturerID: $scope.SelectMake.ManufacturerID,
            VehicleID: $scope.SelectMake.VehicleID,
            VariantID: $scope.SelectVariant.VariantID,
            RegYear: $scope.SelectRegistration.val,
            RTOID: $scope.Rto.RTOID,
            InsurerFilePaths: FileUploadedList.join(","),
            Remarks: $scope.Remarks
        };
        var model = {
            URL: Domain + "/api/Home/SaveOfflineMotorQuote",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (ResponseData) {
            alert(ResponseData.data);
        }, function (Response) {
        })
    }
    $scope.GetFuels = function (obj) {
        GetFuels(obj);
    }
    $scope.variants = function (ManufacModel, Fuel) {
        variants(ManufacModel, Fuel)
        RegistrationyearList();
    }
    $scope.GetRtos = function () {
        RtoList();
    }
    $scope.uploadQuote = function (modelData) {
        let str = $scope.CheckComeFrom.id;
        var form = new FormData();
        var file = $("#" + modelData.text + "").get(0);
        for (var i = 0; i < file.files.length; i++) {
            form.append(modelData.val + "_" + modelData.text + "_" + str, file.files[i])
        }
        form.append("file", "OfflineProposal");
        $.ajax({
            url: '/Home/FileUploader',
            type: 'POST',
            dataType: 'json',
            data: form,
            contentType: false,
            processData: false,
            success: function (Response) {
                if (Response.response == "Uploaded Successfull.") {
                    alert(Response.response)
                    if (FileUploadedList.filter(row => row == Response.fileName).length <= 0) {
                        FileUploadedList.push(Response.fileName);
                    }
                }
            },
            error: function (Response) {
                alert(Response.statusText);
            }
        })
    }
    $scope.GotoSelectInsurer = function (offlineModel) {
        try {
            let ResponseInsurer = [];
            $scope.offlineModel = offlineModel;
            let lstInsurer = offlineModel.insurerFiles.split(",")
            var splitIsurer = null;
            for (let i = 0; i < lstInsurer.length; i++) {
                splitIsurer = lstInsurer[i].split("_")
                var modelInsurer = {
                    CompID: parseInt(splitIsurer[0]),
                    Compname: splitIsurer[1],
                    FilePath: "/OfflineProposal/" + lstInsurer[i],
                    EnquiryID: parseInt(splitIsurer[2].split(".")[0]),
                };
                ResponseInsurer.push(modelInsurer)
            }
            $scope.ResponseInsurer = ResponseInsurer;
            $scope.IsMotOfflineSelectInsure = true;
        }
        catch (ex) { }
    }
    $scope.downloadInsurer = function (obj) {
        window.open(obj.FilePath, "_blank");
    }
    $scope.offlineselect = function (insurerModel) {
        var dasLeadModel = {
            Token: JsonWebToken.token,
            EnquiryID: insurerModel.EnquiryID,
            CompanyID: insurerModel.CompID
        }
        var model = {
            URL: Domain + "/api/Home/OfflineGotoPayment",
            PostString: JSON.stringify(dasLeadModel)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            alert(Response.data);
        }, function (Response) {
            ////alert(Response.statusText)
        });
    }
    $scope.MTBInsured = function () {
        $scope.IsModelShow = true;
    }
    $scope.close = function () {
        $scope.IsModelShow = false;
    }
    $scope.CallCheck = function (elem, scope) {
        checkedFun(elem, scope)
    }
    $scope.AddChild = function () {
        if ($("#childList tbody tr").length < 4) {
            ageindex += 1;
            let Row = "<tr> <td> <select class='Child'> <option>Son</option> <option>Doughter</option> </select> </td> <td> <select class='ChildAge'> <option value='' selected>-Select Age-</option>" + lstOption + " </select> </td> <td> <a href='javascript:void(0)' value='" + ageindex + "' onclick='RemoveChild(" + ageindex + ")'>Remove</a> </td> </tr>";
            $("#childList tbody").append(Row);
        }
    }
    $scope.SaveHealthQuote = function () {
        let Childs = [];
        $("#childList tbody tr").each(function (index, val) {
            var td = $(this).find($("td"));
            var ChildAge = {
                ChildGen: $(td[0]).find($(".Child option:selected")).text(),
                Age: parseInt($(td[1]).find($(".ChildAge")).val())
            }
            Childs.push(ChildAge);
        })


        let body = {
            Token: JsonWebToken.token,
            Enquiryno: $scope.CheckComeFrom.enquiryNo,
            PinCode: parseInt($scope.HealthPinCode),
            MobileNo: $scope.HealthMobileNo,
            Gender: parseInt($scope.HLTGender),
            UserAge: parseInt($scope.YourAgeModel.val),
            SpouseAge: $scope.SpouseAgeModel != null ? parseInt($scope.SpouseAgeModel.val) : 0,
            FatherAge: $scope.FatherAgeModel != null ? parseInt($scope.FatherAgeModel.val) : 0,
            MotherAge: $scope.MotherAgeModel != null ? parseInt($scope.MotherAgeModel.val) : 0,
            Childs: Childs,
            InsurerFilePaths: FileUploadedList.join(",")
        };
        var model = {
            URL: Domain + "/api/Home/SaveOfflineHealthQuote",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (ResponseData) {
            alert(ResponseData.data);
        }, function (Response) {
        })
    }
    $scope.SendQuery = function () {
        var body = {
            Token: JsonWebToken.token,
            EnquiryNo: $scope.CheckComeFrom.enqNo,
            Message: $scope.RelatedQuery,
            Subject:"Offline Quote Related Message"
        };
        var model = {
            URL: Domain + "/api/Home/QuoteRelatedMessage",
            PostString: JSON.stringify(body)
        };
        $http.post(CallApiPostMethod, model).then(function (ResponseData) {
            alert(ResponseData.data);
        }, function (Response) {
        })
    }
    $scope.filterRoleType = function (roleModel) {
        if (roleModel == null)
            $scope.LoginList = $scope.LoginListMaster
        else
            $scope.LoginList = $scope.LoginListMaster.filter(row => row.roleName == roleModel.rolename);
    }
    $scope.DownloadPOSRequest = function () {
        let body = {
            Token: JsonWebToken.token,
            FromDate: RegisterAsPosStartDate,
            ToDate: RegisterAsPosEndDate
        };
        var model = {
            URL: Domain + "/api/Home/GetPosRqstDownload",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (ResponseData) {
            window.open(ResponseData.data, "_blank");
        }, function (Response) {
        })
    }
    $scope.DownloadLoginHis = function () {
        let body = {
            Token: JsonWebToken.token,
            FromDate: LoginStartdate,
            ToDate: LoginEndate
        };
        var model = {
            URL: Domain + "/api/Home/DownloadLoginHistory",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (ResponseData) {
            window.open(ResponseData.data, "_blank");
        }, function (Response) {
        })
    }
    $scope.SHareBirthdayMessage = function () {
        event.preventDefault();
        let EmpIDList = [];
        let tabledata = $("#tblBirthday tbody tr");
        $("input:checkbox:checked", tabledata).each(function () {
            EmpIDList.push($(this).attr("value"));
        })
        let EmpIDCollection = EmpIDList.join(",");
        if (EmpIDCollection == "") {
            alert("Select user for wishes");
            return
        }
        let body = {
            Token: JsonWebToken.token,
            EmpIDCollection: EmpIDCollection,
            Message: $scope.BirthdayMessage
        };
        var model = {
            URL: Domain + "/api/Home/SendBirthdayMessages",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (ResponseData) {
            alert(ResponseData.data);
        });
    }
    $scope.ShowWishForm = function () {
        let EmpIDList = [];
        let tabledata = $("#tblBirthday tbody tr");
        $("input:checkbox:checked", tabledata).each(function () {
            EmpIDList.push($(this).attr("value"));
        });
        if (EmpIDList.length > 0) {
            $scope.BirthdayPopup = true;
        }
        else {
            alert("Select User");
        }
    }
    $scope.CLoseWishesBirth = function () {
        $scope.BirthdayPopup = false;
    }

    function DashboardPrivilege() {
        let body = {
            Token: JsonWebToken.token
        };
        var model = {
            URL: Domain + "/api/Home/DashoardModulePrivilege",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (ResponseData) {
            if (ResponseData.data != "") {
                $scope.PrivilegeModule = JSON.parse(ResponseData.data);
                $scope.IsOfflineLead = modulesSection($scope.PrivilegeModule, "Dashboard Offline Lead");
                $scope.IsHeader = modulesSection($scope.PrivilegeModule, "Dashboard Header");
                $scope.IsLead = modulesSection($scope.PrivilegeModule, "Lead Details");
                $scope.IsPosReq = modulesSection($scope.PrivilegeModule, "POS Request Details");
                $scope.IsClaim = modulesSection($scope.PrivilegeModule, "Total Claim Details");
                $scope.IsShared = modulesSection($scope.PrivilegeModule, "Total Shared Details");
                $scope.IsLoginHis = modulesSection($scope.PrivilegeModule, "Total Login History");
                $scope.IsBirthdayWish = modulesSection($scope.PrivilegeModule, "Total User Birthday");
                if ($scope.IsHeader) {
                    Header();
                }
                if ($scope.IsOfflineLead) {
                    OfflineLeadDetailGrid();
                }
                if ($scope.IsLead) {
                    LeadGrid(TempstartDate, TempEndDate)
                }
                if ($scope.IsPosReq) {
                    RegisterAsPos(RegisterAsPosStartDate, RegisterAsPosEndDate)
                }
                if ($scope.IsClaim) {
                    Claim(ClaimStartDate, ClaimEndDate)
                }
                if ($scope.IsShared) {
                    SharedData(SharedStartdate, SharedEndate)
                }
                if ($scope.IsLoginHis) {
                    LoginHistoryList(LoginStartdate, LoginEndate)
                }
                if ($scope.IsBirthdayWish) {
                    CheckTodayBirthday();
                }
            }
        }, function (Response) {
        })
    }
    function modulesSection(modules, privilegeName) {
        let mode = modules.filter(row => row.privilegeName == privilegeName);
        if (mode.length > 0)
            return true;
        return false;
    }
    function checkedFun(elem, scope) {
        if ($(elem).prop("checked")) {
            $scope[scope] = true;
        }
        else {
            $scope[scope] = false;
        }
    }
    function OfflineLeadDetailGrid() {
        $(".Tableloader").eq(1).show();
        var dasLeadModel = {
            Token: JsonWebToken.token
        }
        var model = {
            URL: Domain + "/api/Home/DashbordOfflineleadGrid",
            PostString: JSON.stringify(dasLeadModel)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            $scope.OfflineLeadDetailGrid = JSON.parse(Response.data);
            $(".Tableloader").eq(1).hide();
        }, function (Response) {
            ////alert(Response.statusText)
        });
    }
    function GetInsurer() {
        let lstModel = [];
        let str = $scope.CheckComeFrom.motorDetails;
        let lstSep = str.split(",");
        for (let i = 0; i < lstSep.length; i++) {
            var modelsep = lstSep[i].split("-");
            var sepModel = {
                val: parseInt(modelsep[0]),
                text: modelsep[1]
            }
            lstModel.push(sepModel);
        }
        if ($scope.CheckComeFrom.enquirytype == "HLT") {
            $scope.InsurerHLTList = lstModel;
        }
        else {
            $scope.InsurerList = lstModel;
        }
    }
    function RegistrationyearList() {
        let lst = []
        let Dt = new Date();
        let yr = Dt.getFullYear() - 1;
        for (let i = yr; i > yr - 10; i--) {
            var yrmodel = {
                val: i,
                text: i
            };
            lst.push(yrmodel)
        }
        $scope.RegistrationList = lst;
    }
    function GetVehicleList() {
        let Url = "";
        let endpoint = ""
        switch ($scope.CheckComeFrom.enquirytype) {
            case "Car":
                endpoint = "/api/api/Vehicle/GetVehiclesByType?type=Car";
                break;
            case "Two":
                endpoint = "/api/api/Vehicle/GetVehiclesByType?type=Two Wheeler";
                break;
        }
        Url = CurrentDomail + endpoint;
        var model = {
            URL: Url
        };
        $http.post(CallApiGetMethod, model).then(function (ResponseData) {
            $scope.SelectMakeList = JSON.parse(ResponseData.data)
        }, function (ResponseData) {
        })
    }
    function GetFuels(ManufacModel) {
        let Url = "";
        let endpoint = ""
        endpoint = "/api/api/Vehicle/GetFuelByVehicleID/" + ManufacModel.VehicleID;
        Url = CurrentDomail + endpoint;
        var model = {
            URL: Url
        };
        $http.post(CallApiGetMethod, model).then(function (ResponseData) {
            $scope.SelectFuelList = JSON.parse(ResponseData.data)
        }, function (ResponseData) {
        })
    }
    function variants(ManufacModel, Fuel) {
        let Url = "";
        let endpoint = ""
        endpoint = "/api/api/Vehicle/GetVariantsByVehicleAndFuel?VehicleID=" + ManufacModel.VehicleID + "&FuelID=" + Fuel.FuelID;
        Url = CurrentDomail + endpoint;
        var model = {
            URL: Url
        };
        $http.post(CallApiGetMethod, model).then(function (ResponseData) {
            $scope.VariantList = JSON.parse(ResponseData.data)
        }, function (ResponseData) {
        })
    }
    function RtoList() {
        let Url = "";
        let endpoint = ""
        endpoint = "/api/api/RTO/GetRtos";
        Url = CurrentDomail + endpoint;
        var model = {
            URL: Url
        };
        $http.post(CallApiGetMethod, model).then(function (ResponseData) {
            $scope.Rtos = JSON.parse(ResponseData.data)
        }, function (ResponseData) {
        })
    }
    function CloseAllPopup() {
        $scope.IsMotOfflineQuotePopup = false;
        $scope.IsAfterQuotePopup = false;
        $scope.IsQuotePopup = false;
        $scope.IsHLTQuotePopup = false;
        $scope.IsHLTAfterQuotePopup = false;
        $scope.IsMotOfflineSelectInsure = false;
        $scope.IsHLTOfflineQuotePopup = false;
    }
    function checkActive() {
        var body = {
            Token: JsonWebToken.token
        };
        var model = {
            URL: Domain + "/api/Home/AcitveOrNot",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (ResponseData) {
            let response = JSON.parse(ResponseData.data)
            $scope.IsUserActive = response.active;
            if (response.active == false) {
                $scope.RmModel = response;
                CheckTestProcess();
            }
            else if (response.isAffilate == true) {
                window.location.href = window.location.origin + '?uses=' + JsonWebToken.token;
            }
            else {
                //Header();
                //OfflineLeadDetailGrid();
                DashboardPrivilege();
            }
        }, function (ResponseData) {
        })
    }
    function Header() {
        $scope.IsDashHeaderLoading = true;
        var body = {
            Token: JsonWebToken.token
        };
        var model = {
            URL: Domain + "/api/Home/DashbordHeaders",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (ResponseData) {
            $scope.IsDashHeaderLoading = false;
            window.localStorage.setItem("dashHeader", ResponseData.data)
            let Response = JSON.parse(ResponseData.data)
            $scope.TotalCollection = math.round(Response.totalCollection);
            $scope.TodayCollection = math.round(Response.todayCollection);
            $scope.TodayNop = Response.todayNoPS;
            $scope.YDA = Response.ydaNoPS;
            $scope.Todaylead = Response.todaylead;
            $scope.usertotal = Response.totaluser;
            $scope.CountPos = Response.countPos;
            $scope.PosCollection = math.round(Response.posCollection);
            $scope.PoSThisMonth = math.round(Response.poSThisMonth);
            $scope.PoSPrevMonth = math.round(Response.poSPrevMonth);
            $scope.TodayCollectionThisMonth = math.round(Response.todayCollectionThisMonth);
            $scope.TodayCollectionPrevMonth = math.round(Response.todayCollectionPrevMonth);
            $scope.TotalNops = math.round(Response.totalNOP);
            $scope.currentusertotal = Response.currentTotaluser;
            $scope.prevusertotal = Response.prevTotaluser;
            $scope.currentpostotal = Response.currentPOsTotaluser;
            $scope.prevpostotal = Response.prevPOsTotaluser;
            $scope.CurrentMonthNops = Response.currentMonthNops;
            $scope.PrevMonthNops = Response.prevMonthNops;
            $scope.TodayQuotes = Response.todayQuote;
            $scope.TodayProposal = Response.todayProposal;
        },
            function (Response) {
                $scope.IsDashHeaderLoading = false;
                ////alert(Response.statusText)
            });
    }
    function FilterGrid() {
        let tempData = null;
        tempData = $scope.LeadDetailGridMain;
        if ($scope.Region != null) {
            tempData = tempData.filter(row => row["region"] == $scope.Region.region)
        }
        if ($scope.leadStatusId != null && $scope.leadStatusId != "") {
            tempData = tempData.filter(row => row["policyStatus"] == $scope.leadStatusId)
        }
        if ($scope.Product != "All") {
            if ($scope.Product.includes("-")) {
                let filterParam = $scope.Product.split("-")
                tempData = tempData.filter(row => row["enquirytype"] == filterParam[0] && row["policyType"] == filterParam[1])
            }
            else {
                tempData = tempData.filter(row => row["enquirytype"] == $scope.Product)
            }
        }
        $scope.LeadDetailGrid = tempData;
        //console.log(JSON.stringify(tempData));
        //if (data === "") {
        //    $scope.LeadDetailGrid = $scope.LeadDetailGridMain
        //}
        //else {
        //    var data = $scope.LeadDetailGridMain.filter(row => row[filterproperty] == data)
        //    $scope.LeadDetailGrid = data
        //}
        $scope.leadCounter = $scope.LeadDetailGrid.length;
        $(".Tableloader").eq(0).hide();
    }
    function LeadGrid(startdate, enddate) {
        //*************************Lead Details*****************************
        TempstartDate = startdate;
        TempEndDate = enddate;
        $(".Tableloader").eq(0).show();
        var dasLeadModel = {
            Token: JsonWebToken.token,
            fromDate: startdate,//"2019-12-31",
            toDate: enddate,//"2019-12-31",
        }
        var model = {
            URL: Domain + "/api/Home/DashbordleadGrid",
            PostString: JSON.stringify(dasLeadModel)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            let Resp = JSON.parse(Response.data);
            $scope.LeadDetailGrid = Resp;
            $scope.leadCounter = $scope.LeadDetailGrid.length;
            $scope.LeadDetailGridMain = Resp;
            FilterGrid();
            //--Chart implementation; Date:2021/08/06 --
            GenerateChart($scope.LeadDetailGrid, startdate, enddate, $scope.chartList);
            //--End Chart implementation; Date:2021/08/06 --

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
    function RegisterAsPos(startdate, enddate) {
        //*************************Lead Details*****************************
        $(".Tableloader").eq(2).show();
        var dasLeadModel = {
            Token: JsonWebToken.token,
            FromDate: startdate,
            ToDate: enddate,
            DetailAction:"POS Request Details"
        }
        var model = {
            URL: Domain + "/api/Home/PosRegisterData",
            PostString: JSON.stringify(dasLeadModel)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            let Resp = JSON.parse(Response.data);
            $scope.PosReqGrid = Resp.register_as_poss;
            $scope.PosReqCounter = Resp.register_as_poss.length;
            $scope.IsShowPosReqGrid = Resp.roleID == 1 || Resp.roleID == 28 ? true : false;
            $(".Tableloader").eq(2).hide();
        }, function (Response) {
            $(".Tableloader").hide();
            ////alert(Response.statusText)
        });
        //***************************END************************************
    }
    function CheckTestProcess() {
        var body = {
            Token: JsonWebToken.token
        };
        var model = {
            URL: Domain + "/api/Home/CheckHourTestProcess",
            PostString: JSON.stringify(body)
        };
        $http.post(CallApiPostMethod, model).then(function (ResponseData) {
            let jsondata = JSON.parse(ResponseData.data);
            if (jsondata.start == false && jsondata.automatically == false && jsondata.trainingComplete == false) {
                $scope.POSQProcess = true;
            }
            else {

                if (jsondata.start) {
                    if (jsondata.hours <= 15) {
                        $scope.POSQProcess = false;
                        $scope.IsFifteenHour = true;
                        LoadExamSummary();
                    }
                    else {
                        if (jsondata.result) {
                            $scope.IsResult = true;
                            $scope.IsPass = jsondata.passOrFail
                        }
                        else if (jsondata.trainingComplete) {
                            $scope.IsAllTheBest = true;
                        }
                        else {
                            $scope.POSQProcess = false;
                            $scope.IsFifteenHour = true;
                            $scope.doneFifteenHour = true;
                            LoadExamSummary();
                        }
                    }
                }
            }
        }, function (ResponseData) {
        })
    }
    function LoadExamSummary() {
        var dasLeadModel = {
            Token: JsonWebToken.token
        }
        var model = {
            URL: Domain + "/api/User/GetPosExamSummary",
            PostString: JSON.stringify(dasLeadModel)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            if (Response.data != "") {
                $scope.examSummary = JSON.parse(Response.data);
            }
        }, function (Response) {
            
        });
    }
    function Claim(startdate, enddate) {
        $(".Tableloader").eq(3).show();
        var dasLeadModel = {
            Token: JsonWebToken.token,
            FromDate: startdate,
            ToDate: enddate,
        }
        var model = {
            URL: Domain + "/api/Home/Claim",
            PostString: JSON.stringify(dasLeadModel)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            $(".Tableloader").eq(3).hide();
            $scope.ClaimList = JSON.parse(Response.data);
            if ($scope.ClaimList != null)
                $scope.ClaimCount = $scope.ClaimList.length
        }, function (Response) {
            $(".Tableloader").hide();
            ////alert(Response.statusText)
        });
    }
    function SharedData(startdate, enddate) {
        $(".Tableloader").eq(4).show();
        var dasLeadModel = {
            Token: JsonWebToken.token,
            FromDate: startdate,
            ToDate: enddate,
        }
        var model = {
            URL: Domain + "/api/Home/Sharedatadetail",
            PostString: JSON.stringify(dasLeadModel)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            $(".Tableloader").eq(4).hide();
            $scope.SharedList = JSON.parse(Response.data);
            if ($scope.SharedList!=null)
                $scope.SharedListCount = $scope.SharedList.length
        }, function (Response) {
            ////alert(Response.statusText)
            $(".Tableloader").hide();
        });
    }
    function LoginList() {
        var dasLeadModel = {
            Token: JsonWebToken.token
        }
        var model = {
            URL: Domain + "/api/Home/GetLoginHistory",
            PostString: JSON.stringify(dasLeadModel)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            $scope.LoginList = JSON.parse(Response.data);
            
        }, function (response) {
        })
    }
    function LoginHistoryList(startdate, enddate) {
        $(".Tableloader").eq(5).show();
        var dasLeadModel = {
            Token: JsonWebToken.token,
            FromDate: startdate,
            ToDate: enddate,
        }
        var model = {
            URL: Domain + "/api/Home/GetLoginHistory",
            PostString: JSON.stringify(dasLeadModel)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            $(".Tableloader").eq(5).hide();
            $scope.LoginList = JSON.parse(Response.data);
            $scope.LoginListMaster = $scope.LoginList;
            RoleTypeList();
        }, function (response) {
            $(".Tableloader").hide();
        })
    }

    function BusinessByCity(startdate, enddate) {
        //*************************Business By City*************************
        var dasLeadModel = {
            Token: JsonWebToken.token,
            fromDate: "2020-06-02",
            todate: "2020-06-02",
        }
        $http.post(Domain + "/api/Home/BusinessByCity", dasLeadModel).then(function (Response) {
            var list = []
            $(Response.data).each(function (index, value) {
                var chart = { name: "", value: 0 };
                chart.name = value.cityname
                chart.value = Math.round(value.totalPremium)
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
        $http.post(Domain + "/api/values/BusinessByRegion", dasLeadModel).then(function (Response) {
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
        $http.post(Domain + "/api/values/BusinessByStates", dasLeadModel).then(function (Response) {
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
        $http.post(Domain + "/api/values/BusinessByUsers", dasLeadModel).then(function (Response) {
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
        $http.post(Domain + "/api/values/BusinessByInsurer", dasLeadModel).then(function (Response) {
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
        $http.post(Domain + "/api/values/BusinessByManufacturer", dasLeadModel).then(function (Response) {
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
        $http.post(Domain + "/api/values/BusinessByFuel", dasLeadModel).then(function (Response) {
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
        $http.post(Domain + "/api/values/BusinessByNoPS", dasLeadModel).then(function (Response) {
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
        $http.post(Domain + "/api/values/CreationUserTrends", dasLeadModel).then(function (Response) {
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
        $http.post(Domain + "/api/values/SalesProductWiseTrends", dasLeadModel).then(function (Response) {
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
        $http.post(Domain + "/api/values/LeadProductWiseTrends", dasLeadModel).then(function (Response) {
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
        $http.post(Domain + "/api/values/TopLeadProductWise", dasLeadModel).then(function (Response) {
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
        $http.post(Domain + "/api/values/SiteAcivity", dasLeadModel).then(function (Response) {
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
        $http.post(Domain + "/api/values/POSReq", dasLeadModel).then(function (Response) {
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
        $http.post(Domain + "/api/values/PendingLeads", dasLeadModel).then(function (Response) {
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
        $http.post(Domain + "/api/values/RecentRegis", dasLeadModel).then(function (Response) {
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
        $http.post(Domain + "/api/values/ReportTY", client).then(function (Response) {
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
        $http.get(Domain + "/api/values/RegionZones").then(function (Response) {
            $scope.Regions = Response.data;
        }, function (Response) {
            //alert(Response.statusText);
        })
    }
    function getDateRangeValue(value) {
        tempValue = value
    }
    function RoleTypeList() {
        let body = {
            Token: JsonWebToken.token
        };
        var model = {
            URL: Domain + "/api/user/roletypes",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            $scope.RoleList = JSON.parse(Response.data);
        }, function (Response) {
            //alert(Response.statusText);
        })
    }
    function CheckTodayBirthday() {
        //BirthdayUserList
        $(".Tableloader").eq(6).show();
        let body = {
            Token: JsonWebToken.token
        };
        var model = {
            URL: Domain + "/api/Home/BirthdayUserList",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (ResponseData) {
            $(".Tableloader").eq(6).hide();
            if (ResponseData.data != null || ResponseData.data != "") {
                try {
                    $scope.BirthdayUserList = JSON.parse(ResponseData.data);
                    $scope.BirthdayUserCount = $scope.BirthdayUserList.length;
                }
                catch (ex) {}
            }
        }, function (Response) {
        })
    }
    LoadChartData();
    function LoadChartData() {
        let datalable = [];
        let dataAmount = [];
        datalable.push("s"); dataAmount.push(1);
        datalable.push("s1"); dataAmount.push(2);
        datalable.push("s2"); dataAmount.push(3);
        datalable.push("s3"); dataAmount.push(4);
        datalable.push("s4"); dataAmount.push(5);
        datalable.push("s5"); dataAmount.push(6);
        datalable.push("s6"); dataAmount.push(7);
        datalable.push("s7"); dataAmount.push(8);
        datalable.push("s8"); dataAmount.push(9);
        datalable.push("s9"); dataAmount.push(10);
        datalable.push("s0"); dataAmount.push(11);
        datalable.push("s11");dataAmount.push(12);
        datalable.push("s12");dataAmount.push(13);
        datalable.push("s13");dataAmount.push(14);
        datalable.push("s14"); dataAmount.push(15);
        datalable.push("s15"); dataAmount.push(16);
        LineChart(datalable, dataAmount, 16);
    }
    //**********************Callendar****************************
    $(function () {
        var start = moment().subtract(0, 'days');
        var end = moment();
        TempstartDate = start.format('YYYY-MM-DD');
        TempEndDate = end.format('YYYY-MM-DD')
        function cb(start, end) {
            $('#reportrange span').html(start.format('YYYY-MM-DD') + ' - ' + end.format('YYYY-MM-DD'));
            if ($scope.IsLead)
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
    $(function () {
        var start = moment().subtract(0, 'days');
        var end = moment();
        function cb(start, end) {
            RegisterAsPosStartDate = start.format('YYYY-MM-DD');
            RegisterAsPosEndDate = end.format('YYYY-MM-DD');
            $('#RegisterAsPos span').html(start.format('YYYY-MM-DD') + ' - ' + end.format('YYYY-MM-DD'));
            if ($scope.IsPosReq)
                RegisterAsPos(start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD'))
        }
        $('#RegisterAsPos').daterangepicker({
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
    $(function () {
        var start = moment().subtract(0, 'days');
        var end = moment();
        ClaimStartDate = start;
        ClaimEndDate = end;
        function cb(start, end) {
            $('#ClaimCal span').html(start.format('YYYY-MM-DD') + ' - ' + end.format('YYYY-MM-DD'));
            if ($scope.IsClaim)
                Claim(start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD'))
        }
        $('#ClaimCal').daterangepicker({
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
    $(function () {
        var start = moment().subtract(0, 'days');
        var end = moment();
        SharedStartdate = start;
        SharedEndate = end;
        function cb(start, end) {
            $('#Shared span').html(start.format('YYYY-MM-DD') + ' - ' + end.format('YYYY-MM-DD'));
            if ($scope.IsShared)
                SharedData(start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD'))
        }
        $('#Shared').daterangepicker({
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
    $(function () {
        var start = moment().subtract(0, 'days');
        var end = moment();
        function cb(start, end) {
            LoginStartdate = start.format('YYYY-MM-DD');
            LoginEndate = end.format('YYYY-MM-DD');
            $('#LogHis span').html(start.format('YYYY-MM-DD') + ' - ' + end.format('YYYY-MM-DD'));
            LoginHistoryList(start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD'))
        }
        $('#LogHis').daterangepicker({
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
function RemoveChild(index) {
    $("#childList tbody tr").each(function (ind, row) {
        var rowCol = $(this).find($("td"));
        if (parseInt($(rowCol[2]).find($("a")).attr("value")) == index) {
            $("#childList tbody tr").eq(ind).remove();
        }
    })
}
app.controller("navcontroller", function ($scope, $http) {
    $("#userName").text(JsonWebToken.userName)
    $("#WelcomeText").text(GetWelcome())
    var navgrouplist = []
    var navgrouplistMaster = null;
    $scope.Navs = null;
    var body = {
        Token: JsonWebToken.token
    }

    var model = {
        URL: Domain + "/api/Home/DashBoardPrivilages",
        PostString: JSON.stringify(body)
    }
    $http.post(CallApiPostMethod, model).then(function (Response) {
        debugger;
        navgrouplistMaster = JSON.parse(Response.data);
        var counter = 0;
        let fillUrl = "";
        $(JSON.parse(Response.data)).each(function (index, value) {
            if (navgrouplist.filter(row => row.privilegeName == value.privilegeGroupName).length <= 0) {
                fillUrl = value.url;
                if (value.privilegeGroupName == "Booking Policy") {
                    fillUrl = value.url + "?user=" + JsonWebToken.token
                }
                if (value.privilegeGroupName == "Generate Ticket") {
                    fillUrl = value.url + "&Token=" + JsonWebToken.token
                }

                var prv = {
                    privid: counter,
                    privilegeName: value.privilegeGroupName,
                    url: fillUrl//value.privilegeGroupName == "Booking Policy" ? value.url + "?user=" + JsonWebToken.token : value.url
                }
                counter += 1;
                if (Domain == "http://localhost:50972") {
                    prv.url = prv.url.replace("/myaccount","");
                }
                navgrouplist.push(prv)
            }
        })
        $scope.Navs = navgrouplist;
        window.localStorage.setItem("navs", JSON.stringify(navgrouplist));
    }, function (Response) {
    })
    $scope.submenu = function (nav) {
        debugger;
        //check active or not navlist 
        //$("#navlist").addClass("show");
        //$("#navtoggle").attr('aria-expanded','true')
        //END
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
});