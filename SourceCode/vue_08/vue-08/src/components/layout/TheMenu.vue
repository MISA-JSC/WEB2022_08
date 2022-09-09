<template>
    <div class="menu">
                <router-link to="/nhan-vien" class="menu__item">
                    <div class="menu__icon icon icon-16 icon__dashboard"></div>
                    <div class="menu__text">Danh sách nhân viên</div>
                </router-link>
                <router-link to="/khach-hang" class="menu__item">
                    <div class="menu__icon icon icon-16 icon__employee"></div>
                    <div class="menu__text">Danh sách khách hàng</div>
                </router-link>
                <router-link to="/bao-cao" class="menu__item">
                    <div class="menu__icon icon icon-16 icon__report"></div>
                    <div class="menu__text">Báo cáo</div>
                </router-link>
            </div>
</template>
<style scoped>
@import url(../../css/layout/menu.css);
</style>