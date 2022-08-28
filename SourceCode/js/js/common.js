var common = {

    /**
     * Hiển thị dialog cảnh báo
     * @param {Array} msgErrors Mảng các thông báo muốn hiển thị
     * Athor: NVMANH (26/08/2022)
     */
    showErrorDialog(msgErrors) {
        try {
            // Khai báo html của dialog:
            let dialogHTML = $(`<div class="dialog dialog--warning">
                                    <div class="dialog__content">
                                        <div id="btnClose3" class="dialog__button--close"></div>
                                        <div class="dialog__header title">Thông báo</div>
                                        <div class="dialog__body">
                                           
                                        </div>
                                        <div class="dialog__footer">
                                            <button id="btnOk" class="button">Đồng ý</button>
                                        </div>
                                    </div>
                                </div>`);

            // Build nội dung dialog:
            var dialogBody = $(dialogHTML).find(".dialog__body");
            // 2 - append các nội dung cảnh báo mới:
            if (msgErrors) {
                for (const msg of msgErrors) {
                    let textHTML = `<div>- ${msg}</div>`;
                    dialogBody.append(textHTML);
                }
            }

            // Hiển thị dialog:
            $('body').append(dialogHTML);

        } catch (error) {
            console.log(error);
        }
    }
}

/**
 * Gán sự kiện validate tự động cho các input bắt buộc nhập
 * author: NVMANH (26/08/2022)
 */
$("input[nvmanh]").blur(function() {
    try {
        // lấy value:
        var value = $(this).val();
        if (!value) {
            $(this).addClass("input--error");
        } else {
            $(this).removeClass("input--error");
        }
    } catch (error) {
        console.log(error);
    }

})