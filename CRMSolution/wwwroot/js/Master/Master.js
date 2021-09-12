var app = angular.module("app", []);
app.controller("MasterSetup", function ($scope, $http) {
    $scope.Prifix = null;
    $scope.SelectRoleID = null;
    $scope.CodeVal = null;
    $scope.RoleList = null;
    $scope.IsParent = false;
    $scope.IsChoseOption = false;
    $scope.RefCodeVal = null;
    $scope.RefPrifix = null;
    $scope.Prifix = null;
    $scope.CodeVal = null;
    $scope.IsPos = false;
    $scope.lstHour = null;
    $scope.OptionModel = null;
    $scope.RoleDataList = null;
    $scope.NonIRDA = false;
    $scope.RegionList = null;
    $scope.BranchList = null;
    $scope.SelectRegion = null;
    $scope.MailserverOptionList = null;
    $scope.MailServer = null;
    $scope.HostName = null;
    $scope.Port = null;
    $scope.UseDefaultCredential = false;
    $scope.FromEmail = null;
    $scope.UserName = null;
    $scope.Password = null;
    $scope.EnableSsl = false;
    $scope.APIURL = null;
    $scope.SMSServer = null;
    $scope.payoutInsurer = null;
    $scope.payoutInsurerlist = null;
    $scope.IsPayoutPVC = false;
    $scope.payoutRangefromPVC = null;
    $scope.payoutRangetoPVC = null;
    $scope.IsPayoutTW = false;
    $scope.payoutRangefromTW = null;
    $scope.payoutRangetoTW = null;
    $scope.IsPayoutHLT = false;
    $scope.payoutRangefromHLT = null;
    $scope.payoutRangetoHLT = null;
    $scope.IsPayoutTV = false;
    $scope.payoutRangefromTV = null;
    $scope.payoutRangetoTV = null;
    $scope.PVCpayout = null;
    $scope.TWpayout = null;
    $scope.HLTpayout = null;
    $scope.TVpayout = null;
    $scope.CreatedPayoutList = null;
    $scope.PosQuestionList = [];
    $scope.posQstn = null;
    $scope.option1 = null;
    $scope.option2 = null;
    $scope.option3 = null;
    $scope.option4 = null;
    $scope.Answer = null;
    $scope.GetCodePrifix = null;
    $scope.IsSaveMailserver = true;
    $scope.IsNonIRDAChecked = true;
    $scope.IsSaveTimeDuration = true;
    $scope.IsSeriesSelect = false;
    $scope.regionName = null;
    $scope.BranchName = null;
    $scope.RegionBranchList = null;
    $scope.IsSmsDisable = true;
    $scope.RegionbtnSave = "Save";
    $scope.BranchbtnSave = "Save";
    $scope.SelectedModel = null;
    $scope.InactivePosList = [];
    $scope.IrdaOrNonIrda = "IRDA"
    $scope.IsSavePayout = true;
    $scope.SavedPosQstnList = [];
    $scope.TestSmsMobile = null;
    $scope.TestSmsMessage = null;
    $scope.mm = [];
    $scope.TestSMSbtn = "Test SMS API"
    $scope.Renewaldaylist = [];
    $scope.RenewaldaylistSMS = [];
    $scope.Notificationbody = null;
    $scope.NotificationSubject = null;
    $scope.leftmovemodel = false;
    $scope.SelectExistRole = null;
    $scope.ExistRoleList = [];
    $scope.ExistUserList = [];
    $scope.SelectExistUser = null;
    $scope.ReplaceEmail = null;
    $scope.ReplaceMobileNo = null;
    $scope.ReplaceRmCode = null;
    $scope.ReplaceUserName = null;
    $scope.PageUrls = [];
    $scope.Script = null;
    $scope.ActiveSupport = false;
    $scope.SupportLink = null;
    $scope.GetConfigModel = null;
    $scope.TrainingHoursDetail = null;
    $scope.RoleTypeList = [];
    $scope.RoleType = null;
    $scope.NotificationRoleType = null;
    $scope.FeadbackList = [];
    $scope.FeedOpt = null;
    $scope.uploadedwelcomefile = null;
    $scope.PayOutList = [];
    $scope.PayOutProductList = [];
    $scope.PayOutUserList = [];
    $scope.DigitalSigbody = null;
    $scope.PosDocSummaryDocList = [];

    GetRoleList();
    $scope.addfile = function () {
        $("#fileupload").click();
    }
    $scope.fileNameChanged = function () {
        let name = window.location.hostname;//window.location.origin.replace(".com", "").replace(".in", "");
        var GSTFile = $("#fileupload").get(0);
        var FileGST = GSTFile.files;
        var fileData = new FormData();
        fileData.append(name, FileGST[0]);
        fileData.append("Folder", "LogoFile");
        fileData.append("Token", JsonWebToken.token);
        fileData.append("url", Domain + '/api/user/LogoUpload');
        $.ajax({
            url: defaultpage + '/master/UploadLogo',
            type: 'POST',
            dataType: 'json',
            data: fileData,
            contentType: false,
            processData: false,
            success: function (d) {
                alert(d)
            },
            error: function (er) {
                alert('Error!');
            }
        });
    }
    $scope.AddUpdatePosRefer = function (Option) {
        let body = null;
        if ($scope.SelectRoleID.roleID == 8) {
            if (Option == "REFER") {
                body = {
                    Option: Option,
                    Prifix: $scope.RefPrifix,
                    CodeVal: parseInt($scope.RefCodeVal),
                    RoleID: $scope.SelectRoleID.roleID,
                    IsParent: $scope.IsParent,
                    Token: JsonWebToken.token
                };
            }
            else {
                body = {
                    Option: Option,
                    Prifix: $scope.Prifix,
                    CodeVal: parseInt($scope.CodeVal),
                    RoleID: $scope.SelectRoleID.roleID,
                    IsParent: $scope.IsParent,
                    Token: JsonWebToken.token
                };
            }
        }
        else {
            body = {
                Option: Option,
                Prifix: $scope.RefPrifix,
                CodeVal: parseInt($scope.RefCodeVal),
                RoleID: $scope.SelectRoleID.roleID,
                IsParent: $scope.IsParent,
                Token: JsonWebToken.token
            };
        }
        let model = {
            URL: Domain + "/api/Master/SaveCodePrifix",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            alert(Response.data);
        }, function () {
        })
    }
    $scope.changeRole = function (model) {
        $scope.IsPos = false;
        $scope.RefPrifix = null;
        $scope.RefCodeVal = null;
        $scope.Prifix = null;
        $scope.CodeVal = null;
        $scope.IsSeriesSelect = true;
        //if (model.roleID == 90) {
        //    $scope.IsChoseOption = true;
        //}
        //else {
        //    $scope.IsChoseOption = false;
        //}
        if (model.roleID == 8) {
            $scope.IsPos = true;
        }
        let body = {
            Token: JsonWebToken.token,
            RoleID: model.roleID
        };
        let modelop = {
            URL: Domain + "/api/Master/GetCodePrifix",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, modelop).then(function (Response) {
            if (Response.data != "" && model.roleID == 8) {
                $scope.RefPrifix = JSON.parse(Response.data).filter(row => row.options == "REFER")[0].referPrifix;
                $scope.RefCodeVal = JSON.parse(Response.data).filter(row => row.options == "REFER")[0].codeVal;
                $scope.Prifix = JSON.parse(Response.data).filter(row => row.options == "POS")[0].referPrifix;
                $scope.CodeVal = JSON.parse(Response.data).filter(row => row.options == "POS")[0].codeVal;
            }
            else if (Response.data != "") {
                $scope.RefPrifix = JSON.parse(Response.data).filter(row => row.options == "REFER")[0].referPrifix;
                $scope.RefCodeVal = JSON.parse(Response.data).filter(row => row.options == "REFER")[0].codeVal;
            }
        }, function () {
        })
    }
    $scope.OptionTraining = function () {
        $scope.IsSaveTimeDuration = true;
        if ($scope.lstHour == null) {
            let lst = [];
            for (let i = 5; i <= 48; i++) {
                let j = {
                    item: i,
                    val: i
                };
                lst.push(j);
            }
            $scope.lstHour = lst;
            $scope.OptionModel = lst[lst.length - 1];
        }
        GetTrainingHours();
    }
    $scope.SaveTimeDuration = function () {
        let hour = $scope.OptionModel.val;
        let body = {
            Token: JsonWebToken.token,
            Hours: hour
        };
        let model = {
            URL: Domain + "/api/Master/SetPosAcitveDuration",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            alert(Response.data);
        }, function (Response) {
            alert(Response);
        })
    }
    $scope.CallRoleList = function () {
        let body = {
            Token: JsonWebToken.token
        };
        let model = {
            URL: Domain + "/api/Master/GetRoleForMap",
            PostString: JSON.stringify(body)
        }
        BindtypeData(CallApiPostMethod, model, "RoleDataList")
    }
    $scope.MapRole = function () {
        let lstRole = [];
        $("#roleMaptbl tbody tr").each(function () {
            var td = $(this).find($("td"));
            if ($(td[2]).find($("input[type='checkbox']")).prop("checked")) {
                let model = {
                    RoleID: parseInt($(td[0]).html()),
                    IsActive: true
                }
                lstRole.push(model);
            }
            else {
                let model = {
                    RoleID: parseInt($(td[0]).html()),
                    IsActive: false
                }
                lstRole.push(model);
            }

        })
        let body = {
            Token: JsonWebToken.token,
            Roles: lstRole
        };
        let model = {
            URL: Domain + "/api/Master/SaveRoleList",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            alert(Response.data)
        }, function (es) {
        })
    }
    $scope.applynonirda = function () {
        let body = {
            Token: JsonWebToken.token,
            IsApply: $scope.NonIRDA
        }
        let model = {
            URL: Domain + "/api/Master/IRDAparam",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            alert(Response.data)
        }, function (es) {
        })
    }
    $scope.CallIrda = function () {
        $scope.IsNonIRDAChecked = true;
        let body = {
            Token: JsonWebToken.token
        }
        let model = {
            URL: Domain + "/api/Master/CheckIRDA",
            PostString: JSON.stringify(body)
        }
        BindtypeData(CallApiPostMethod, model, "NonIRDA")
    }
    $scope.CallBranch = function () {
        GetRegionList();
        GetBranchList();
    }
    $scope.SaveBranch = function () {
        let lst = [];
        //var td = $(this).find($("td"));
        $('.checkitem:checked').each(function () {
            var lstItem = {
                BranchID: parseInt($(this).val()),
                RegionID: $scope.SelectRegion.id
            };
            lst.push(lstItem);
        });

        //$("#branchRegionList tbody tr").each(function (indx, elem) {
        //    var td = $(this).find($("td"));
        //    var chk = $(td[0]).find($("input[type='checkbox']"));
        //    if (chk.prop("checked")) {
        //        var lstItem = {
        //            BranchID: parseInt(chk.val()),
        //            RegionID: $scope.SelectRegion.id
        //        };
        //        lst.push(lstItem);
        //    }
        //});
        if (lst.length > 0) {
            let body = {
                Token: JsonWebToken.token,
                LstRegionWithBranch: lst
            };
            var model = {
                URL: Domain + "/api/Setup/SaveRegionWithBranch",
                PostString: JSON.stringify(body)
            }
            $http.post(CallApiPostMethod, model).then(function (Response) {
                alert(Response.data);
            });
        }
    }
    $scope.OptionMailServer = function () {
        ReleseMailserverObject();
        $scope.IsSmsDisable = true;
        $scope.IsSaveMailserver = true;
        let body = {
            Token: JsonWebToken.token
        };
        let model = {
            URL: Domain + "/api/Master/MailServerOption",
            PostString: JSON.stringify(body)
        }
        BindtypeData(CallApiPostMethod, model, "MailserverOptionList")
    }
    $scope.SelectMailServer = function (MailServer) {
        ReleseMailserverObject();
        if (MailServer.mailServiceMaster == "CreateUser") {
            let body = {
                Token: JsonWebToken.token
            };
            var model = {
                URL: Domain + "/api/user/roletypes",
                PostString: JSON.stringify(body)
            }
            BindtypeData(CallApiPostMethod, model, "RoleTypeList");
        }
        else {
            $scope.RoleType = null;
            let body = {
                Token: JsonWebToken.token,
                MailserveroptionID: parseInt(MailServer.id)
            };
            MailServerOption(body, Domain + "/api/Master/GetSelectedMailOption");
        }
    }
    $scope.SelectedRoleTypeConfig = function (RoleType) {
        let body = {
            Token: JsonWebToken.token,
            MailserveroptionID: parseInt($scope.MailServer.id),
            RoleID: RoleType.roleid
        };
        MailServerOption(body, Domain + "/api/Master/GetSelectedMailOptionWithRole");
    }
    $scope.SaveMailServer = function () {
        let body = {
            Token: JsonWebToken.token,
            MailserveroptionID: parseInt($scope.MailServer.id),
            RoleID: $scope.RoleType != null ? $scope.RoleType.roleid : $scope.RoleType,
            HostName: $scope.HostName,
            Port: parseInt($scope.Port),
            UseDefaultCredential: $scope.UseDefaultCredential,
            FromEmail: $scope.FromEmail,
            UserName: $scope.UserName,
            PasswordVal: $scope.Password,
            EnableSsl: $scope.EnableSsl,
            Mailserveroption: $scope.MailServer.mailServiceMaster 
        };
        let model = {
            URL: Domain + "/api/Master/SaveMailSetup",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            alert(Response.data)
        }, function (es) {
        })
    }
    $scope.SaveSMSServer = function () {
        let body = {
            Token: JsonWebToken.token,
            APIURL: $scope.APIURL,
            MailserveroptionID: parseInt($scope.SMSServer.id)
        };
        let model = {
            URL: Domain + "/api/Master/SaveSMSSetup",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            alert(Response.data)
        }, function (es) {
        })
    }
    $scope.SelectSMSServer = function (MailServer) {
        $scope.APIURL = null;
        let body = {
            Token: JsonWebToken.token,
            MailserveroptionID: parseInt(MailServer.id)
        };
        let model = {
            URL: Domain + "/api/Master/GetSelectedSmsSeverOption",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            let mailData = JSON.parse(Response.data);
            $scope.APIURL = mailData.smsapi;
        }, function (es) {
        })
    }
    $scope.OptionPayout = function () {
        $scope.PayOutList = [];
        $(".IsProductOption").attr("style","display: none;");
        $scope.PayOutList.push({ User: "", IRDA: "", Insurer: "", Product: "", RangeFrom: "", RangeTo: "", Payout:""});
        let body = {
            Token: JsonWebToken.token
        };
        let model = {
            URL: Domain + "/api/Master/GetInsurerCompanies",
            PostString: JSON.stringify(body)
        }
        BindtypeData(CallApiPostMethod, model, 'payoutInsurerlist');

        body = {
            Token: JsonWebToken.token,
            ID: 8
        };
        model = {
            URL: Domain + "/api/User/TeamList",
            PostString: JSON.stringify(body)
        }
        BindtypeData(CallApiPostMethod, model, 'PayOutUserList');
    }
    $scope.SelectInsurerForPayout = function (model,index) {
        var payoutoptions = "";
        let Productdata = $("select[name='Insurer']").eq(index).val();
        let insurer = $scope.payoutInsurerlist.filter(row => row.companyID == parseInt(Productdata))[0];
        $scope.IsPayoutPVC = false;
        $scope.IsPayoutTW = false;
        $scope.IsPayoutHLT = false;
        $scope.IsPayoutTV = false;
        if (insurer.healthInsurance) {
            payoutoptions +="<option value='Health'>Health Insurance</option>"
            //$scope.PayOutProductList.push({ Name:"Health Insurance", ID:"Health"})
        }
        if (insurer.carInsurance) {
            payoutoptions += "<option value='Car'>Car Insurance</option>"
            //$scope.PayOutProductList.push({ Name:"Car Insurance", ID: "Car" })
        }
        if (insurer.travelInsurance) {
            payoutoptions += "<option value='Travel'>Travel Insurance</option>"
            //$scope.PayOutProductList.push({ Name:"Travel Insurance", ID: "Travel" })
        }
        if (insurer.twowheelerInsurance) {
            payoutoptions += "<option value='Twowheeler'>Twowheeler Insurance</option>"
            //$scope.PayOutProductList.push({ Name: "Twowheeler Insurance", ID: "Twowheeler" })
        }
        $("select[name='Product']").eq(index).html(payoutoptions)
        $scope.IsSavePayout = false;
        GetPayoutData();
        CheckMotorOrNot($("select[name='Product']").eq(index).val(), index)
    }
    $scope.SelectProductOption = function (model,index) {
        CheckMotorOrNot($("select[name='Product']").eq(index).val(), index)
    }
    $scope.SavePayoutData = function () {
        let body = {
            Token: JsonWebToken.token,
            CompanyID: $scope.payoutInsurer.companyID,
            PVCRangeFrom: $scope.payoutRangefromPVC,
            PVCRangeTo: $scope.payoutRangetoPVC,
            PVCPayout: $scope.PVCpayout != null ? parseFloat($scope.PVCpayout) : $scope.PVCpayout,
            TWRangeFrom: $scope.payoutRangefromTW,
            TWRangeTo: $scope.payoutRangetoTW,
            TWPayout: $scope.TWpayout != null ? parseFloat($scope.TWpayout) : $scope.TWpayout,
            HLTRangeFrom: $scope.payoutRangefromHLT,
            HLTRangeTo: $scope.payoutRangetoHLT,
            HLTPayout: $scope.HLTpayout != null ? parseFloat($scope.HLTpayout) : $scope.HLTpayout,
            TVRangeFrom: $scope.payoutRangefromTV,
            TVRangeTo: $scope.payoutRangetoTV,
            TVPayout: $scope.TVpayout != null ? parseFloat($scope.TVpayout) : $scope.TVpayout,
            PayoutType: $scope.IrdaOrNonIrda
        };
        let model = {
            URL: Domain + "/api/Master/SavePayoutData",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            alert(Response.data);
        }, function (es) {
        })
    }
    $scope.RemovePayout = function (modeldata) {
        let body = {
            Token: JsonWebToken.token,
            PayoutData: modeldata
        };
        let model = {
            URL: Domain + "/api/Master/DelPayoutData",
            PostString: JSON.stringify(body)
        };
        $http.post(CallApiPostMethod, model).then(function (Response) {
            alert(Response.data);
            GetPayoutData();
        }, function (es) {
        })
    }
    $scope.AddQuestion = function () {
        if ($scope.posQstn != null) {
            if ($scope.PosQuestionList.length > 0) {
                let Exist = $scope.PosQuestionList.filter(row => row.Qstn == $scope.posQstn);
                if (Exist.length > 0) {
                    alert("Question is exist.");
                    return
                }
            }
            if ($scope.option1 == null || $scope.option2 == null || $scope.option3 == null || $scope.option4 == null || $scope.Answer == null) {
                alert("Option  and answer are required.")
            }
            else {
                let question = {
                    Qstn: $scope.posQstn,
                    Answer: $scope.Answer,
                    Option1: $scope.option1, Option2: $scope.option2, Option3: $scope.option3, Option4: $scope.option4
                };
                $scope.PosQuestionList.push(question);
                ReleceScope();
            }
        }
        else {
            alert("Question are required.")
        }
    }
    $scope.SaveQstns = function () {
        if ($scope.PosQuestionList.length <= 0) {
            alert("At Least one question is mandetory")
        }
        else {
            var body = {
                Token: JsonWebToken.token,
                question: $scope.PosQuestionList
            };
            var model = {
                URL: Domain + "/api/Master/PosExam",
                PostString: JSON.stringify(body)
            }
            $http.post(CallApiPostMethod, model).then(function (ResponseData) {
                alert(ResponseData.data)
                GetPosQuestions();
            }, function (Response) {
            })
        }
    }
    $scope.ShowShavedQstn = function () {
        GetPosQuestions();
    }
    $scope.RemoveQuestionfromServer = function (item) {
        var body = {
            Token: JsonWebToken.token,
            QuestionID: item.id
        };
        var model = {
            URL: Domain + "/api/Master/DelPosQstnList",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (ResponseData) {
            alert(ResponseData.data)
            GetPosQuestions();
        }, function (Response) {
        })
    }
    $scope.RemoveQuestion = function (index) {
        $scope.PosQuestionList.splice(index, 1)
    }
    $scope.TestMailServer = function () {
        let body = {
            Token: JsonWebToken.token,
            MailserveroptionID: parseInt($scope.MailServer.id),
            HostName: $scope.HostName,
            Port: parseInt($scope.Port),
            UseDefaultCredential: $scope.UseDefaultCredential,
            FromEmail: $scope.FromEmail,
            UserName: $scope.UserName,
            PasswordVal: $scope.Password,
            EnableSsl: $scope.EnableSsl
        };
        let model = {
            URL: Domain + "/api/Master/TestMailserver",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            alert(Response.data)
            if (Response.data == "Success") {
                $scope.IsSaveMailserver = false;
            }
            else {
                $scope.IsSaveMailserver = true;
            }
        }, function (es) {
        })
    }
    $scope.NonIrdaCheckCondition = function () {
        $scope.IsNonIRDAChecked = false;
    }
    $scope.SelectDuration = function () {
        $scope.IsSaveTimeDuration = false;
    }
    $scope.OptionSeries = function () {
        $scope.IsSeriesSelect = false;
        $scope.SelectRoleID = null;
    }
    $scope.SaveRegion = function () {
        var body = {
            Token: JsonWebToken.token,
            Name: $scope.regionName,
            Action: $scope.RegionbtnSave,
            RegionID: $scope.RegionbtnSave == "Update" ? $scope.SelectedModel.id : 0,
            Option: "region"
        };
        var model = {
            URL: Domain + "/api/Master/SaveRegion",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (ResponseData) {
            alert(ResponseData.data);
            GetRegionList();
        }, function (Response) {
        })
    }
    $scope.SaveRegionBranch = function () {
        var body = {
            Token: JsonWebToken.token,
            Name: $scope.BranchName,
            RegionID: $scope.RegionModel.id,
            Action: $scope.BranchbtnSave,
            BranchID: $scope.BranchbtnSave == "Update" ? $scope.SelectedModel.branchID : 0,
            Option: "branch"
        };
        var model = {
            URL: Domain + "/api/Master/SaveRegion",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (ResponseData) {
            alert(ResponseData.data);
            BindBranchList();
        }, function (Response) {
        })
    }
    $scope.CallRegionMaster = function () {
        $scope.regionName = null;
        GetRegionList();
    }
    $scope.CallBranchMaster = function () {
        $scope.BranchName = null;
        $scope.RegionBranchList = null;
        GetRegionList();
    }
    $scope.SelectedBranch = function () {
        BindBranchList();
    }
    $scope.CallInactivePos = function () {
        InactivePosList();
    }
    $scope.makeActiveList = function () {
        let userList = [];
        $(".checklist:checked").each(function () {
            userList.push($(this).val())
        })
        let body = {
            Token: JsonWebToken.token,
            Poses: userList.join(",") + ','
        };
        var model = {
            URL: Domain + "/api/Master/InactiveToActivePos",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            alert(Response.data);
            InactivePosList();
        }, function () {
        })
    }
    $scope.manageName = function (name, scope) {
        //name = releceNum(name);
        if (name.length <= 1) {
            $scope[scope] = name.toUpperCase();
        }
        else
            $scope[scope] = name
    }
    $scope.AddNew = function (newCreation, saveBtn) {
        $scope[newCreation] = null;
        $scope[saveBtn] = "Save"
    }
    $scope.EditRegionBranch = function (item, scope, saveBtn) {
        $scope[scope] = scope == "BranchName" ? item.cityName : item.region;
        $scope[saveBtn] = "Update";
        $scope.SelectedModel = item;
    }
    $scope.Testsms = function () {
        $scope.TestSMSbtn = "Wait..."
        let body = {
            Token: JsonWebToken.token,
            APIUrl: $scope.APIURL,
            MobileNo: $scope.TestSmsMobile.toString(),
            Message: $scope.TestSmsMessage
        };
        let model = {
            URL: Domain + "/api/Master/SMSTestIng",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            alert(Response.data)
            if (Response.data == "Success") {
                $scope.IsSmsDisable = false;
            }
            $scope.TestSMSbtn = "Test SMS API"
        }, function () {
            $scope.TestSMSbtn = "Test SMS API"
        })
    }
    $scope.ActiveData = function (modeldata) {
        let body = {
            Token: JsonWebToken.token,
            RegionID: modeldata.id,
            IsAcitve: modeldata.isActive ? false : true
        };
        let model = {
            URL: Domain + "/api/Master/SetupActive",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            alert(Response.data);
            GetRegionList();
        }, function () {
            $scope.TestSMSbtn = "Test SMS API"
        })
    }
    $scope.RenewalSetup = function () {
        BindRenewalNotification();
    }
    $scope.SaveNotificationSetup = function () {
        let lstrenewalsEmail = [];
        let lstrenewalsSMS = [];
        $("input[name='renewalsEmail']:checked").each(function (index, value) {
            //$(value).val()
            lstrenewalsEmail.push({
                Day: parseInt($(value).val()),
                Body: $("input[name='renewalsEmailMessage']").eq($("input[name='renewalsEmail']").index($(value))).val()
            })
        });
        $("input[name='renewalsSMS']:checked").each(function (index, value) {
            lstrenewalsSMS.push({
                Day: parseInt($(value).val()),
                Body: $("input[name='renewalsSMSMessage']").eq($("input[name='renewalsSMS']").index($(value))).val()
            })
        });
        let body = {
            Token: JsonWebToken.token,
            SMSs: lstrenewalsSMS,
            Emails: lstrenewalsEmail
        };
        let model = {
            URL: Domain + "/api/Master/RenewNotificationConfig",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            alert(Response.data);
            BindRenewalNotification();
        }, function (Response) {
            console.log(Response)
        })
    }
    $scope.SelectNotificationMail = function (selectedmodel) {
        if (selectedmodel.mailServiceMaster == "CreateUser") {
            let body = {
                Token: JsonWebToken.token
            };
            var model = {
                URL: Domain + "/api/user/roletypes",
                PostString: JSON.stringify(body)
            }
            BindtypeData(CallApiPostMethod, model, "RoleTypeList");
        }
        else {
            $scope.NotificationRoleType = null;
            let body = {
                Token: JsonWebToken.token,
                MailOptionID: parseInt(selectedmodel.id)
            };
            ConfigNotification(body, Domain + "/api/Master/GetNotificationBody")
        }
    }
    $scope.NotificationRoleTypeConfig = function (NotificationRoleType) {
        let body = {
            Token: JsonWebToken.token,
            MailOptionID: parseInt($scope.NotificationModel.id),
            RoleID: NotificationRoleType.roleid
        };
        ConfigNotification(body, Domain + "/api/Master/GetNotificationBodyWithRoleID")
    }
    $scope.SaveNotificationbody = function () {
        if ($scope.NotificationModel == null) {
            alert("Select Option.")
            return
        }
        MailNotificationBody($scope.NotificationModel.id, $scope.NotificationSubject, $scope.Notificationbody,
            $scope.NotificationRoleType == null ? null : $scope.NotificationRoleType.roleid)
    }
    $scope.priview = function () {
        var text = $scope.Notificationbody;
        var ifr = document.createElement("iframe");
        ifr.setAttribute("frameborder", "0");
        ifr.setAttribute("id", "iframeResult");
        ifr.setAttribute("name", "iframeResult");
        ifr.setAttribute("allowfullscreen", "true");
        document.getElementById("iframewrapper").innerHTML = "";
        document.getElementById("iframewrapper").appendChild(ifr);

        var ifrw = (ifr.contentWindow) ? ifr.contentWindow : (ifr.contentDocument.document) ? ifr.contentDocument.document : ifr.contentDocument;

        ifrw.document.open();
        ifrw.document.write(text);
        ifrw.document.close();
    }
    $scope.leftMove = function () {
        $scope.leftmovemodel = false;
        var leftPos = $('#outer_container').scrollLeft();
        console.log(leftPos);
        $("#outer_container").animate({
            scrollLeft: leftPos - 1000
        }, 800);
    }
    $scope.rightMove = function () {
        $scope.leftmovemodel = true;
        var leftPos = $('#outer_container').scrollLeft();
        console.log(leftPos);
        $("#outer_container").animate({
            scrollLeft: leftPos + 140
        }, 800);
    }
    $scope.ReplaceUser = function () {
        let body = {
            Token: JsonWebToken.token
        };
        let model = {
            URL: Domain + "/api/user/RoleTypes",
            PostString: JSON.stringify(body)
        }
        BindtypeData(CallApiPostMethod, model, "ExistRoleList")
    }
    $scope.BindUserList = function () {
        let body = {
            Token: JsonWebToken.token,
            ID: $scope.SelectExistRole.roleid
        };
        let model = {
            URL: Domain + "/api/setup/UserlistWithRoletype",
            PostString: JSON.stringify(body)
        }
        BindtypeData(CallApiPostMethod, model, "ExistUserList")
    }
    $scope.selectedExistUser = function () {
        $scope.ReplaceUserName = $scope.SelectExistUser.userName;
        $scope.ReplaceEmail = $scope.SelectExistUser.emailAddress;
        $scope.ReplaceMobileNo = $scope.SelectExistUser.mobileNo;
        $scope.ReplaceRmCode = $scope.SelectExistUser.rmCode;
    }
    $scope.UpdateExistingUser = function () {
        let body = {
            Token: JsonWebToken.token,
            ReplaceUserName: $scope.ReplaceUserName,
            ReplaceEmail: $scope.ReplaceEmail,
            ReplaceMobileNo: $scope.ReplaceMobileNo,
            ReplaceRmCode: $scope.ReplaceRmCode
        };
        let model = {
            URL: Domain + "/api/Master/ReplaceUserInfo",
            PostString: JSON.stringify(body)
        };
        $http.post(CallApiPostMethod, model).then(function (Response) {
            alert(Response.data);
        }, function () {
        })
    }
    $scope.PosDocSummary = function () {
        LoadSummary();
    }
    $scope.RemovePosExamDoc = function (Obj) {
        let body = {
            Token: JsonWebToken.token,
            DocID: Obj.docID
        };
        let model = {
            URL: Domain + "/api/User/RemovePosDoc",
            PostString: JSON.stringify(body)
        };
        $http.post(CallApiPostMethod, model).then(function (Response) {
            alert(Response.data);
            LoadSummary();
        }, function () {
        })
    }
    $scope.UploadPosExamfiledata = function () {
        let forcontinueFurther = true;
        var formdata = new FormData();
        $(".PosExamfiledata").each(function (index) {
            var GSTFile = $(this).get(0);
            if (GSTFile == undefined)
                return
            var FileGST = GSTFile.files;
            if (FileGST.length <= 0)
                return
            for (var i = 0; i < FileGST.length; i++) {
                var Checkfilesize = (FileGST[i].size / 1024) / 1024;
                if (Checkfilesize > 2) {
                    forcontinueFurther = false;
                    break;
                }
            }
            if (forcontinueFurther == false) {
                return;
            }
            for (var i = 0; i < FileGST.length; i++) {
                formdata.append($(".FileSummary").eq(index).val(), FileGST[i]);
            }
        })
        if (forcontinueFurther == false) {
            alert("Check per file size it should be max 2 mb.");
            return;
        }
        formdata.append("Token", JsonWebToken.token);
        formdata.append("Folder", "PosExamFiles");
        formdata.append("url", Domain + '/api/Master/UploadFiles');
        $.ajax({
            url: defaultpage + '/Master/UploadLogo',
            type: 'POST',
            dataType: 'json',
            data: formdata,
            contentType: false,
            processData: false,
            success: function (d) {
                if (d == "")
                    d = "Data Uploaded Successfully."
                alert(d);
                LoadSummary();
            },
            error: function (er) {
                alert('Error!');
            }
        });
    }
    $scope.AddMoreRow = function () {
        let str = "<tr><td><input type='file' class='PosExamfiledata'/></td>";
        str += "<td><input type='text' class='FileSummary' placeholder='File Name' maxlength='40'/></td></tr>";
        $("#tableList tbody").append(str);
    }
    $scope.GetPageList = function () {
        GetPageURLs();
    }
    $scope.savePagewithscript = function () {
        let pageList = [];
        $("#pageTable tbody tr").each(function (ind, row) {
            var td = $(this).find($("td"));
            if ($(td[2]).find($("input[type='checkbox']")).is(":checked")) {
                pageList.push($(td[2]).find($("input[type='checkbox']")).val())
            }
        });
        var body = {
            Token: JsonWebToken.token,
            Url: pageList,
            Script: $scope.Script
        };
        var model = {
            URL: Domain + "/api/Master/SetPageScript",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            alert(Response.data);
        }, function () {
        })
    }
    $scope.Delscript = function () {
        let pageList = [];
        $("#pageTable tbody tr").each(function (ind, row) {
            var td = $(this).find($("td"));
            if ($(td[2]).find($("input[type='checkbox']")).is(":checked")) {
                pageList.push($(td[2]).find($("input[type='checkbox']")).val())
            }
        });
        var body = {
            Token: JsonWebToken.token,
            Url: pageList,
            Script: $scope.Script
        };
        var model = {
            URL: Domain + "/api/Master/DelPageScript",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            alert(Response.data);
        }, function () {
        })
    }
    $scope.ConfigSupprt = function () {
        var body = {
            Token: JsonWebToken.token,
            Link: $scope.Link
        };
        var model = {
            URL: Domain + "/api/Master/CheckConfigSupport",
            PostString: JSON.stringify(body)
        }
        BindtypeData(CallApiPostMethod, model, "GetConfigModel")
    }
    $scope.SaveConfigSupport = function () {
        let body = {
            Token: JsonWebToken.token,
            IsActive: $scope.ActiveSupport,
            Link: $scope.SupportLink
        };
        let model = {
            URL: Domain + "/api/Master/ConfigSupport",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            alert(Response.data);
        }, function () {
        })
    }
    $scope.ConfigFeedBack = function () {
        LoadOptions()
    }
    $scope.FeedOption = function () {
        let body = {
            Token: JsonWebToken.token,
            Option: $scope.FeedOpt
        };
        let model = {
            URL: Domain + "/api/Master/ConfigureFeedbackOption",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            alert(Response.data);
            LoadOptions();
        }, function () {
        })
    }
    $scope.RemoveOption = function (item) {
        let body = {
            Token: JsonWebToken.token,
            FeedID: item.id
        };
        let model = {
            URL: Domain + "/api/Master/RemoveFeedbackOption",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            alert(Response.data);
            LoadOptions();
        }, function () {
        })
    }
    $scope.uploadWelcomeimage = function () {
        let name = window.location.hostname;//window.location.origin.replace(".com", "").replace(".in", "");
        var GSTFile = $("#welcomefile").get(0);
        var FileGST = GSTFile.files;
        var fileData = new FormData();
        fileData.append(name, FileGST[0]);
        fileData.append("Folder", "WelcomePOS");
        fileData.append("Token", JsonWebToken.token);
        fileData.append("url", Domain + '/api/Master/UploadFiles');
        $.ajax({
            url: defaultpage + '/master/UploadLogo',
            type: 'POST',
            dataType: 'json',
            data: fileData,
            contentType: false,
            processData: false,
            success: function (d) {
                $scope.uploadedwelcomefile = d;
            },
            error: function (er) {
                alert('Error!');
            }
        });
    }
    $scope.addmorepayout = function () {
        $scope.PayOutList.push({ User: "", IRDA: "", Insurer: "", Product: "", RangeFrom: "", RangeTo: "", Payout: "" });
    }
    $scope.Savepayout = function () {
        $("#payouttable tbody tr").each(function (index, value) {
            //document.getElementsByName("User")[index].value;
            $scope.PayOutList[index].User = parseInt($("select[name='User']").eq(index).val());
            $scope.PayOutList[index].IRDA = $("select[name='IRDA']").eq(index).val();
            $scope.PayOutList[index].Insurer = parseInt($("select[name='Insurer']").eq(index).val());
            $scope.PayOutList[index].Product = $("select[name='Product']").eq(index).val();
            $scope.PayOutList[index].RangeFrom = $("input[name='RangeFrom']").eq(index).val();
            $scope.PayOutList[index].RangeTo = $("input[name='RangeTo']").eq(index).val();
            $scope.PayOutList[index].Payout = parseFloat($("input[name='Payout']").eq(index).val());
            $scope.PayOutList[index].ProductOption = $("select[name='ProductOption']").eq(index).val();
        });
        let body = {
            Token: JsonWebToken.token,
            payoutList: $scope.PayOutList
        }
        let model = {
            URL: Domain + "/api/Master/SavePayoutData",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            alert(Response.data);
        }, function (es) {
        })
    }
    $scope.GetpayoutRecord = function () {
        GetPayoutData()
    }
    $scope.SaveDigitalSig = function () {
        SaveDigitalSig();
    }
    function LoadSummary() {
        let body = {
            Token: JsonWebToken.token
        };
        let model = {
            URL: Domain + "/api/User/GetPosExamSummary",
            PostString: JSON.stringify(body)
        };
        $http.post(CallApiPostMethod, model).then(function (Response) {
            try {
                $scope.PosDocSummaryDocList = JSON.parse(Response.data);
                try { $scope.apply(); } catch (ex) { }
            }
            catch (ex) { }
        }, function () {
        })
    }
    function LoadOptions() {
        let body = {
            Token: JsonWebToken.token
        };
        let model = {
            URL: Domain + "/api/Master/GetFadBackOptions",
            PostString: JSON.stringify(body)
        }
        BindtypeData(CallApiPostMethod, model, "FeadbackList")
    }
    function MailNotificationBody(MailOptionID, Subject, MailBody, roleID) {
        let body = {
            Token: JsonWebToken.token,
            MailOptionID: parseInt(MailOptionID),
            Subject: Subject,
            MailBody: MailBody,
            RoleID: roleID
        };
        let model = {
            URL: Domain + "/api/Master/SaveMailNotificationBody",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            alert(Response.data);
        }, function () {
        })
    }
    function releceNum(value) {
        var mats = [];
        mats = value.match(/\d+/g);
        if (mats != null && mats.length > 0) {
            for (var i = 0; i < mats.length; i++) {
                value = value.replace(mats[i], "");
            }
        }
        return value;
    }
    function BindRenewalNotification() {
        $scope.Renewaldaylist = renewalDatalist("Email");
        $scope.RenewaldaylistSMS = renewalDatalist("SMS");
        let body = {
            Token: JsonWebToken.token
        };
        let model = {
            URL: Domain + "/api/Master/GetRenewNotificationConfig",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            if (Response.data != "" || Response.data != null) {
                $(JSON.parse(Response.data).filter(row => row.actionWith == "Email")).each(function (index, val) {
                    var modeldata = $scope.Renewaldaylist.filter(row => row.dayval == val.duration)[0];
                    var index = $($scope.Renewaldaylist).index(modeldata)
                    $scope.Renewaldaylist[index].IsChecked = true;
                    $scope.Renewaldaylist[index].Body = val.renewBody;
                });
                $(JSON.parse(Response.data).filter(row => row.actionWith == "SMS")).each(function (index, val) {
                    var modeldata = $scope.RenewaldaylistSMS.filter(row => row.dayval == val.duration)[0];
                    var index = $($scope.RenewaldaylistSMS).index(modeldata)
                    $scope.RenewaldaylistSMS[index].IsChecked = true;
                    $scope.RenewaldaylistSMS[index].Body = val.renewBody;
                });
            }
        }, function (Response) {
            console.log(Response)
        })
    }
    function renewalDatalist(prop) {
        let modellist = [
            {
                dayval: 90,
                day: "90 Day",
                Prop: prop,
                IsChecked: false,
                Body: null
            },
            {
                dayval: 60,
                day: "60 Day",
                Prop: prop,
                IsChecked: false,
                Body: null
            },
            {
                dayval: 45,
                day: "45 Day",
                Prop: prop,
                IsChecked: false,
                Body: null
            }, {
                dayval: 30,
                day: "30 Day",
                Prop: prop,
                IsChecked: false,
                Body: null
            },
            {
                dayval: 25,
                day: "25 Day",
                Prop: prop,
                IsChecked: false,
                Body: null
            }, {
                dayval: 20,
                day: "20 Day",
                Prop: prop,
                IsChecked: false,
                Body: null
            },
            {
                dayval: 15,
                day: "15 Day",
                Prop: prop,
                IsChecked: false,
                Body: null
            },
            {
                dayval: 10,
                day: "10 Day",
                Prop: prop,
                IsChecked: false,
                Body: null
            },
            {
                dayval: 8,
                day: "8 Day",
                Prop: prop,
                IsChecked: false,
                Body: null
            },
            {
                dayval: 6,
                day: "6 Day",
                Prop: prop,
                IsChecked: false,
                Body: null
            },
            {
                dayval: 4,
                day: "4 Day",
                Prop: prop,
                IsChecked: false,
                Body: null
            },
            {
                dayval: 3,
                day: "3 Day",
                Prop: prop,
                IsChecked: false,
                Body: null
            },
            {
                dayval: 2,
                day: "2 Day",
                Prop: prop,
                IsChecked: false,
                Body: null
            },
            {
                dayval: 1,
                day: "1 Day",
                Prop: prop,
                IsChecked: false,
                Body: null
            }
        ]
        return modellist;
    }
    function GetPayoutData() {
        let body = {
            Token: JsonWebToken.token
        };
        let model = {
            URL: Domain + "/api/Master/GetPayoutData",
            PostString: JSON.stringify(body)
        }
        BindtypeData(CallApiPostMethod, model, 'CreatedPayoutList')
    }
    //$scope.ChangeRegion = function (SelectRegion) {
    //    $(".checkitem").prop("checked", false);
    //    $("#branchRegionList tbody tr").each(function (indx, elem) {
    //        var td = $(this).find($("td"));
    //        if (parseInt($(td[2]).val()) == SelectRegion.id) {
    //            $(td[0]).find($("input[type='checkbox']")).prop("checked", true);
    //        }
    //    });
    //}
    function GetRegionList() {
        let body = {
            Token: JsonWebToken.token
        };
        var model = {
            URL: Domain + "/api/Setup/GetRegionList",
            PostString: JSON.stringify(body)
        }
        BindtypeData(CallApiPostMethod, model, "RegionList")
    }
    function BindBranchList() {
        var body = {
            Token: JsonWebToken.token,
            RegionID: $scope.RegionModel.id
        };
        var model = {
            URL: Domain + "/api/Master/BranchList",
            PostString: JSON.stringify(body)
        }
        BindtypeData(CallApiPostMethod, model, "RegionBranchList")
    }
    function GetBranchList() {
        let body = {
            Token: JsonWebToken.token
        }
        let model = {
            URL: Domain + "/api/Setup/GetBranchList",
            PostString: JSON.stringify(body)
        }
        BindtypeData(CallApiPostMethod, model, "BranchList")
    }
    function GetRoleList() {
        let body = {
            Token: JsonWebToken.token
        };
        let model = {
            URL: Domain + "/api/setup/RoleList",
            PostString: JSON.stringify(body)
        }
        BindtypeData(CallApiPostMethod, model, "RoleList")
    }
    function GetPageURLs() {
        var body = {
            Token: JsonWebToken.token
        };
        var model = {
            URL: Domain + "/api/Master/GetPageURLs",
            PostString: JSON.stringify(body)
        }
        BindtypeData(CallApiPostMethod, model, "PageUrls")
    }
    function BindtypeData(url, body, scope) {
        $http.post(url, body).then(function (Response) {
            if (Response.data != "") {
                $scope[scope] = JSON.parse(Response.data);
                if (scope == "PageUrls") {
                    $scope.Script = $scope[scope][0].script;
                }
                if (scope == "GetConfigModel") {
                    if (Response.data != "") {
                        $scope.ActiveSupport = $scope.GetConfigModel.isActive
                        $scope.SupportLink = $scope.GetConfigModel.link
                    }
                }
                if (scope == "TrainingHoursDetail") {
                    $scope.OptionModel = $scope.lstHour.filter(row => row.val == $scope.TrainingHoursDetail.hourDuration)[0];
                }
                if (scope == "RoleTypeList") {
                    let model = {
                        roleid: 0,
                        rolename: "Default For All"
                    }
                    $scope.RoleTypeList.splice(0, 0, model);
                }
            }
        }, function () {
        })
    }
    function InactivePosList() {
        let body = {
            Token: JsonWebToken.token
        };
        var model = {
            URL: Domain + "/api/Master/InactivePosList",
            PostString: JSON.stringify(body)
        }
        BindtypeData(CallApiPostMethod, model, "InactivePosList");
    }
    function GetPosQuestions() {
        var body = {
            Token: JsonWebToken.token
        };
        var model = {
            URL: Domain + "/api/Master/SavedPosQstnList",
            PostString: JSON.stringify(body)
        }
        BindtypeData(CallApiPostMethod, model, "SavedPosQstnList")
    }
    function GetTrainingHours() {
        var body = {
            Token: JsonWebToken.token
        };
        var model = {
            URL: Domain + "/api/Master/GetTrainingHours",
            PostString: JSON.stringify(body)
        }
        BindtypeData(CallApiPostMethod, model, "TrainingHoursDetail")
    }
    function ReleceScope() {
        $scope.posQstn = null;
        $scope.Answer = null;
        $scope.option1 = null;
        $scope.option2 = null;
        $scope.option3 = null;
        $scope.option4 = null;
    }
    function MailServerOption(body, url) {
        ReleseMailserverObject()
        let model = {
            URL: url,
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            let mailData = JSON.parse(Response.data);
            $scope.HostName = mailData.hostName
            $scope.Port = mailData.port;
            $scope.UseDefaultCredential = mailData.useDefaultCredential;
            $scope.FromEmail = mailData.fromEmail;
            $scope.Password = mailData.password;
            $scope.UserName = mailData.userName;
            $scope.EnableSsl = mailData.enableSsl;
        }, function (es) {
        })
        BindtypeData(CallApiPostMethod, model, "mailData")
    }
    function ReleseMailserverObject() {
        $scope.HostName = null;
        $scope.Port = null;
        $scope.UseDefaultCredential = false;
        $scope.FromEmail = null;
        $scope.Password = null;
        $scope.UserName = null;
        $scope.EnableSsl = false;
    }
    function ConfigNotification(body, url) {
        $scope.Notificationbody = null;
        $scope.NotificationSubject = null;
        let model = {
            URL: url,
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            if (Response.data != "") {
                $scope.NotificationSubject = JSON.parse(Response.data).mailSubject;
                $scope.Notificationbody = JSON.parse(Response.data).mailBody;
            }
        }, function () {
        })
    }
    function CheckMotorOrNot(selectedOption, index) {
        if (selectedOption == "Car" || selectedOption == "Twowheeler") {
            $(".IsProductOption").eq(index).show();
        }
        else {
            $(".IsProductOption").eq(index).hide();
        }
    }
    function SaveDigitalSig() {
        let body = {
            Token: JsonWebToken.token,
            DigitalSignBody: $scope.DigitalSigbody
        };
        let model = {
            URL: Domain + "/api/Master/SaveDigitalSign",
            PostString: JSON.stringify(body)
        }
        $http.post(CallApiPostMethod, model).then(function (Response) {
            alert(Response.data);
        }, function () {
        })
    }
});

app.controller("navcontroller", function ($scope, $http) {
    $("#userName").text(JsonWebToken.userName)
    $("#WelcomeText").text(GetWelcome())
    console.log(window.localStorage.getItem("navs"))
    $scope.Navs = JSON.parse(window.localStorage.getItem("navs"))
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