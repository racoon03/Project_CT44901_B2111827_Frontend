import { createWebHistory, createRouter } from "vue-router";
import PhieuMuon from "@/views/PhieuMuon.vue"; // Thành phần hiển thị danh sách phiếu mượn
import Nxb from "@/views/Nxb.vue"; // Thành phần hiển thị danh sách NXB
import Sach from "@/views/Sach.vue"; // Thành phần hiển thị danh sách sách
import FormNxb from "@/views/FormNxb.vue";
import FormSach from "@/views/FormSach.vue";
import DocGia from "@/views/DocGia.vue";
import LoginDg from "@/views/LoginDg.vue";
import FormEditDg from "@/views/FormEditDg.vue";
import FormMuonDg from "@/views/FormMuonDg.vue";
import FormEditPmuon from "@/views/FormEditPmuon.vue";
import TraSach from "@/views/TraSach.vue";
import DangKyDg from "@/views/DangKyDg.vue";

const routes = [
  {
    path: "/",
    name: "phieumuon",
    component: PhieuMuon,
  },
  {
    path: "/nxb",
    name: "nxb",
    component: Nxb,
  },
  {
    path: "/sach",
    name: "sach",
    component: Sach,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("@/views/NotFound.vue"),
  },
  {
    path: "/nxb/create",
    name: "create-nxb",
    component: FormNxb,
  },
  {
    path: "/nxb/edit/:id",
    name: "edit-nxb",
    component: FormNxb,
    props: true,
  },
  {
    path: "/sach/create",
    name: "create-sach",
    component: FormSach,
  },
  {
    path: "/sach/edit/:id",
    name: "edit-sach",
    component: FormSach,
    props: true,
  },
  {
    path: "/docgia",
    name: "docgia",
    component: DocGia,
  },
  {
    path: "/login",
    name: "login",
    component: LoginDg, // Trang đăng nhập
  },
  {
    path: "/docgia",
    name: "docgia",
    component: DocGia, // Trang quản lý độc giả
  },
  {
    path: "/docgia/edit/:id",
    name: "edit-docgia",
    component: FormEditDg, // Trang chỉnh sửa thông tin độc giả
    props: true, // Truyền props từ URL
  },
  {
    path: "/docgia/muon/:id",
    name: "muon-docgia",
    component: FormMuonDg, // Trang chỉnh sửa thông tin độc giả
    props: true, // Truyền props từ URL
  },
  {
    path: "/phieumuon/edit/:id",
    name: "EditPhieuMuon",
    component: FormEditPmuon,
    props: true,
  },
  {
    path: "/trasach",
    name: "trasach",
    component: TraSach,
  },
  {
    path: "/phieumuon/dangkydg",
    name: "dangkydg",
    component: DangKyDg,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
