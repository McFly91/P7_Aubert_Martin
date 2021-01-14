const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const userCtrl = require("../controllers/user");
const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
    windowMs: 2 * 60 * 1000, // 2 minutes
    max: 5,
    message: "Nombre de tentative de connexion atteinte, veuillez réessayer dans 2 minutes "
  });

router.post("/signup", userCtrl.signup);

router.post("/login", apiLimiter, userCtrl.login);

router.put("/modify_infos", auth, userCtrl.modifyUserInfos);

router.put("/modify_password", auth, userCtrl.modifyUserPassword);

router.delete("/delete", auth, userCtrl.deleteUser);

router.get("/profil", auth, userCtrl.getOneUser);

module.exports = router;