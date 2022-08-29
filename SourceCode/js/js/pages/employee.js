$(document).ready(function() {
    // Gán sự kiện cho các elements:
    initEvent();
    loadData();
})

var laguageCode = "VI";

// window.onload = function() {
//     initEvent();
// }

function loadData() {
    try {
        // Gọi api thực hiện lấy dữ liệu:
        fetch("https://cukcuk.manhnv.net/api/v1/Employees", { method: "GET" })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                // Xử lý dữ liệu:
                var count = 1;
                // Clear dữ liệu cũ: 
                $("table#tbEmployeeList tbody").empty();
                // Lấy thông tin các cột dữ liệu của bảng:
                var ths = $("table#tbEmployeeList thead th");
                for (const emp of res) {
                    var trHTML = $(`<tr></tr>`);
                    for (const th of ths) {
                        // Lấy ra thông tin propName:
                        const propName = $(th).attr("prop-name");
                        // Lấy ra value:
                        let value = emp[propName];
                        const formatDate = th.hasAttribute("format-date");
                        const formatMoney = th.hasAttribute("format-money");
                        if (formatDate)
                            value = common.formatDate(value);

                        if (formatMoney)
                            value = common.formatMoneyVND(value);

                        var td = `<td>${value||""}</td>`
                        trHTML.append(td);
                    }
                    trHTML.data("id", emp.EmployeeId);
                    trHTML.data("entity", emp);
                    $("table#tbEmployeeList tbody").append(trHTML);
                    // Lấy các thông tin cần thiết từ object:
                    // console.log(emp);
                    // const employeeCode = emp.EmployeeCode;
                    // const fullName = emp.FullName;
                    // let dateOfBirth = emp["DateOfBirth"];
                    // dateOfBirth = common.formatDate(dateOfBirth);
                    // const genderName = emp["GenderName"];
                    // const phoneNumber = emp["PhoneNumber"];
                    // const email = emp["Email"];
                    // const positionCode = emp["PositionCode"];
                    // const positionName = emp["PositionName"];
                    // const departmentName = emp["DepartmentName"];
                    // let salary = Math.floor(Math.random() * 9) * 1000000; // Demo: lấy số ngẫu nhiên.
                    // salary = common.formatMoneyVND(salary);
                    // const workStatus = emp["WorkStatus"];
                    // var trHTML = `<tr>
                    //                 <td>${count}</td>
                    //                 <td>${employeeCode||""}</td>
                    //                 <td>${fullName||""}</td>
                    //                 <td class="text-align--center">${genderName||""}</td>
                    //                 <td>${phoneNumber||""}</td>
                    //                 <td>${dateOfBirth||""}</td>
                    //                 <td>${email||""}</td>
                    //                 <td>${positionCode||""}</td>
                    //                 <td>${positionName||""}</td>
                    //                 <td>${departmentName||""}</td>
                    //                 <td class="text-align--right">${salary||""}</td>
                    //                 <td>${workStatus||""}</td>
                    //             </tr>`;
                    //$("table#tbEmployeeList tbody").append(trHTML);
                    count++;
                }
                // 1. Định dạng dữ liệu ngày sinh
                // 2. Định dạng tiền:
                // ....
                // Build 
            })
            .catch(res => {

            })

    } catch (error) {
        console.log(error);
    }
}


/*******************************
 * Tạo các Event cho các elements
 * Author: NVMANH (26/08/2022)
 */
function initEvent() {
    try {
        // Hiển thị Dilog thêm nhân viên khi nhấn button Thêm mới:
        // document.getElementById("btnAdd").addEventListener("click", function() {
        //     document.getElementById("dlgEmployeeDetail").style.display = "block";
        // })

        $("#btnAdd").click(function() {
            $("#dlgEmployeeDetail").show();
            // Focus vào ô nhập liệu đầu tiên:
            $("#txtEmployeeCode").focus();

        })

        // Ẩn form chi tiết khi nhấn button close:
        // document.getElementById("btnClose2").addEventListener("click", function() {
        //     document.getElementById("dlgEmployeeDetail").style.display = "none";
        // })

        $(".dialog .dialog__button--close").click(function() {
            // this.parentElement.parentElement.style.display = "none";
            $(this).parents(".dialog").hide();
            // $("#dlgEmployeeDetail").hide();
        })

        $('html').on('click', '.dialog .dialog__button--close', function() {
            // this.parentElement.parentElement.style.display = "none";
            $(this).parents(".dialog").hide();
            // $("#dlgEmployeeDetail").hide();
        })


        // Cất dữ liệu khi nhấn button Save trên dialog chi tiết:
        $("#btnSave").click(saveData);

        // Ẩn form khi nhấn button Hủy:
        // var buttons = document.getElementsByClassName("button--cancel"); //--> trả về 1 mảng các phần tử.

        // for (const btn of buttons) {
        //     btn.addEventListener("click", function() {
        //         document.getElementById("dlgEmployeeDetail").style.display = "none";
        //     })
        // }

        //Jquery:
        var buttons = $(".button--cancel");
        buttons.click(function() {
            $("#dlgEmployeeDetail").hide();
        })

        $(document).on('dblclick', '#tbEmployeeList tr', function() {
            debugger
            // Lấy id của bản ghi:
            const id = $(this).data('id');
            fetch(`https://cukcuk.manhnv.net/api/v1/Employees/${id}`)
                .then(res => res.json())
                .then(res => {
                    // binding data:
                    let inputs = $("#dlgEmployeeDetail input,#dlgEmployeeDetail select,#dlgEmployeeDetail textarea");
                    for (const input of inputs) {
                        const propName = $(input).attr("prop-name");
                        let value = res[propName];
                        $(input).val(value);
                    }
                })
            $("#dlgEmployeeDetail").show();
        })

        // Lập trình các phím tắt cho Form:
        $("#dlgEmployeeDetail").keydown(function(e) {
            // Bắt hành động khi người dùng nhấn enter:
            console.log(e.keyCode);
            const keyCode = e.keyCode;
            // if ((keyCode < 48 || (keyCode > 57 && keyCode < 97) || (keyCode > 105 && keyCode != 231)) && keyCode != 8) {
            //     e.preventDefault();

            // }
            if (keyCode == MISAEnum.KeyCode.ENTER) {
                $("#btnSave").trigger("click");
            } else if (keyCode == MISAEnum.KeyCode.ESC) {
                $("#dlgEmployeeDetail").hide();
            }
        });

    } catch (error) {
        console.log(error);
    }
}

/**
 * Thực hiện cất dữ liệu
 * Author: NVMANH (26/08/2022)
 */
function saveData() {
    try {

        // validate dữ liệu:
        // 1. Các thông tin bắt buộc nhập:
        const employeeCode = $("#txtEmployeeCode").val();
        const fullName = $("#txtFullName").val();
        const email = $("#txtEmail").val();
        const phoneNumber = $("#txtPhoneNumber").val();

        let msgErrors = [];

        if (!employeeCode) {
            msgErrors.push(MISAResource.ErrorValidate.EmployeeCodeNotEmpty[laguageCode]);
        }
        if (!fullName) {
            msgErrors.push(MISAResource.ErrorValidate.FullNameNotEmpty[laguageCode])
        }
        if (!email) {
            msgErrors.push(MISAResource.ErrorValidate.EmailNotEmpty[laguageCode])
        }
        if (!phoneNumber) {
            msgErrors.push(MISAResource.ErrorValidate.PhoneNumberNotEmpty[laguageCode])
        }
        // 2. Các thông tin cần yêu cầu đúng định dạng (Email)

        // 3. Các thông tin liên quan đến ngày tháng: ngày sinh không được lớn hơn ngày hiện tại:

        // 4. Khác: VD: tiền thì không được phép nhập số nhỏ hơn không?

        // Nếu validate có dữ liệu không hợp lệ, thì hiển thị cảnh báo:
        if (msgErrors.length > 0) {
            common.showErrorDialog(msgErrors);
            // showErrorDialog(msgErrors);
        }
        // Gọi api thực hiện cất dữ liệu:
        // 1. build object:
        let inputs = $("#dlgEmployeeDetail input,#dlgEmployeeDetail select,#dlgEmployeeDetail textarea");
        var employee = {};
        for (const input of inputs) {
            const propName = $(input).attr("prop-name");
            let value = $(input).val();
            $(input).val(value);
            if (value)
                employee[propName] = value;
        }
        console.log(employee);
        $.ajax({
            type: "POST",
            url: "https://cukcuk.manhnv.net/api/v1/Employees",
            data: JSON.stringify(employee),
            dataType: "json",
            contentType: "application/json",
            success: function(response) {
                // Hiển thị toast:
            },
            error: function() {

            }

        });

    } catch (error) {
        console.log(error);
    }
}

/**
 * Build dialog hiển thị cảnh báo lỗi
 * Author: NVMANH (26/08/2022)
 *  */
function showErrorDialog(msgErrors) {
    try {
        // Cập nhật nội dung câu cảnh báo lỗi:
        var dialogBody = $("#dlgDialog3 .dialog__body");
        // 1 - xóa nội dung thông báo cũ:
        dialogBody.empty();

        // 2 - append các nội dung cảnh báo mới:
        for (const msg of msgErrors) {
            let textHTML = `<div>- ${msg}</div>`;
            dialogBody.append(textHTML);
        }

        $("#dlgDialog3").show();
    } catch (error) {
        console.log(error);
    }

}