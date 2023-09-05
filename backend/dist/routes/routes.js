"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Router } = require("express");
const Controllers_1 = require("../controllers/Controllers");
const router = Router();
let controllers = new Controllers_1.Controllers();
router.post("/signup", controllers.signup.bind(controllers));
router.post("/login", controllers.login.bind(controllers));
router.post("/forgot-password", controllers.forgotPassword.bind(controllers));
router.post("/recovery-password", controllers.recoveryPassword.bind(controllers));
router.post("/reset-password", controllers.resetPassword.bind(controllers));
router.get("/get-programming-languages", controllers.getProgrammingLanguages.bind(controllers));
router.get("/get-usages", controllers.getUsages.bind(controllers));
router.post("/get-description", controllers.getDescription.bind(controllers));
router.post("/get-related-languages", controllers.getRelatedLanguages.bind(controllers));
router.post("/get-statistics", controllers.getStatistics.bind(controllers));
module.exports = router;
