$(document).ready(function() {
    // Gán sự kiện cho các elements:
    initEvent();
})

var laguageCode = "VI";

// window.onload = function() {
//     initEvent();
// }

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

        $('tr').dblclick(function() {
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