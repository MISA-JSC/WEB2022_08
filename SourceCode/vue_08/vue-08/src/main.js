import { createApp } from 'vue'
import App from './App.vue'
import MCombobox from 'ms-combobox'
import EmployeeList from './views/employee/EmployeeList.vue'
import CustomerList from './views/customer/CustomerList.vue'
import ReportList from './views/report/ReportList.vue'

import { createRouter, createWebHistory } from 'vue-router'

//B2: Định nghĩa các router:
const routers = [
        { path: "/nhan-vien", component: EmployeeList },
        { path: "/khach-hang", component: CustomerList },
        { path: "/bao-cao", component: ReportList }
    ]
    // B3: Khởi tạo router:
const router = createRouter({
    history: createWebHistory(),
    routes: routers
})

//ROUTES
//STORE
const app = createApp(App);
app.component("MCombobox", MCombobox);
// B3: sử dụng router:
app.use(router);
app.mount('#app')