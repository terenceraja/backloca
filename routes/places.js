var express = require("express");
var router = express.Router();
const Marker = require("../models/markers");
const { checkBody } = require("../modules/checkBody");

router.post("/", (req, res) => {
  if (!checkBody(req.body, ["nickname", "name", "latitude", "longitude"])) {
    res.json({ result: "empty field" });
  } else {
    const newPlace = new Marker({
      nickname: req.body.nickname,
      name: req.body.name,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
    });

    newPlace.save().then((newDoc) => {
      res.json({ result: true });
    });
  }
});

router.get("/:nickname", (req, res) => {
  Marker.find({ nickname: req.params.nickname }).then((data) => {
    res.json({ result: true, places: data });
  });
});

router.delete("/", (req, res) => {
  if (!checkBody(req.body, ["nickname", "name"])) {
    res.json({ result: "empty field" });
  } else {
    Marker.deleteOne({
      nickname: req.body.nickname,
      name: req.body.name,
    }).then((data) => {
      if (data.deletedCount > 0) {
        res.json({ result: true });
      } else {
        res.json({ result: false });
      }
    });
  }
});

module.exports = router;
