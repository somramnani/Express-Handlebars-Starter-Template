const path = require("path");
const router = require("express").Router();

//HTML Routes
router.get("/", (req, res) => {
  res.render("main", { layout: "index", title: "Home" });
});
module.exports = router;
