<template>
  <!-- DIALOG CHI TIẾT NHÂN VIÊN -->
  <div id="dlgEmployeeDetail" class="dialog">
    <div class="dialog__content">
      <div class="dialog__button--close" @click="btnCloseOnClick"></div>
      <div class="dialog__header title">Thông tin nhân viên</div>
      <div class="dialog__body">
        <div class="row">
          <div class="col">
            <label>Mã nhân viên (<span class="input--required">*</span>)</label>
            <input
              id="txtEmployeeCode"
              v-model="employee.EmployeeCode"
              required=""
              name-property="Mã nhân viên"
              type="text"
              class="input"
            />
          </div>
          <div class="col">
            <label>Họ và tên (<span class="input--required">*</span>)</label>
            <input
              id="txtFullName"
              v-model="employee.FullName"
              name-property="Họ và tên"
              required=""
              type="text"
              class="input"
            />
          </div>
        </div>
        <div class="row">
          <div class="col col-50">
            <label>Giới tính</label>
            <select name="" v-model="employee.Gender" id="cbxGender">
              <option value="0">Nam</option>
              <option value="1">Nữ</option>
              <option value="0">Khác</option>
            </select>
          </div>
          <div class="col col-50">
            <label>Ngày sinh</label>
            <input id="dtDateOfBirth" v-model="employee.DateOfBirth" type="date" class="input" />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label>Email (<span class="input--required">*</span>)</label>
            <input
              id="txtEmail"
              v-model="employee.Email"
              name-property="Email"
              required=""
              type="text"
              class="input"
            />
          </div>
          <div class="col">
            <label
              >Số điện thoại (<span class="input--required">*</span>)</label
            >
            <input
              id="txtPhoneNumber"
              name-property="Số điện thoại"
              required=""
              v-model="employee.PhoneNumber"
              type="text"
              class="input"
            />
          </div>
        </div>
        <div class="row">
          <div class="col col-50">
            <label>Vị trí</label>
            <select name="" id="cbxPosition">
              <option value="0">Giám đốc</option>
              <option value="1">Nhân viên</option>
              <option value="0">Trưởng phòng</option>
            </select>
          </div>
          <div class="col col-50">
            <label>Phòng ban</label>
            <select name="" id="cbxDepartment">
              <option value="0">Phòng tuyển dụng</option>
              <option value="1">Phòng Nhân sự</option>
              <option value="0">Phòng hành chính</option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label for="">Địa chỉ</label>
            <textarea id="txtAddress" cols="30" rows="3"></textarea>
          </div>
        </div>
      </div>
      <div class="dialog__footer">
        <button
          id="btnSave"
          @click="btnSaveOnClick"
          class="button button__icon icon icon--save"
          style="order: 1"
        >
          Cất
        </button>
        <button class="button button--cancel" style="order: 2">Hủy</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "EmployeeDetail",
  props: {
    closeDialog: Function,
    employeeSelected: Function,
    formMode: {
      type: Number,
      default: 1,
    },
  },
  created() {
    this.employee = this.employeeSelected;
  },
  data() {
    return {
      employee: {},
    };
  },
  methods: {
    btnCloseOnClick() {
      this.closeDialog();
      // this.$emit("hideDialog");
    },
    btnSaveOnClick() {
      var me = this;
      var method = "POST";
      var url = "https://cukcuk.manhnv.net/api/v1/employees";
      // validate dữ liệu:

      // Cất dữ liệu:

      if (me.formMode == 2) {
        method = "PUT";
        url = url + `/${me.employee.EmployeeId}`;
      }
      fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(me.employee),
      })
        .then((res) => res.json())
        .then((res) => {
          var status = res.status;
          if (status == 400) alert("Dữ liệu đầu vào không hợp lệ");
          else if (status == 500) alert("Lỗi phía server!");
          else {
            alert("Thành công!");
            me.$emit("hideDialog");
          }
        })
        .catch((res) => {
          console.log(res);
          alert("Lỗi");
        });
    },
  },
};
</script>