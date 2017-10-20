const router = require("express").Router();
const { Campuses } = require("../../db/models");

module.exports = router;

// get all campuses
router.get("/", function(req, res, next) {
  Campuses.findAll()
    .then(campuses => res.json(campuses))
    .catch(next);
});

// get a specific campus
router.get("/:id", function(req, res, next) {
  const campusId = req.params.id;

  Campuses.findAll({ where: { id: campusId } })
    .then(campus => res.json(campus))
    .catch(next);
});

//post a campus
router.post("/", function(req, res, next) {
  Campuses.create(req.body)
    .then(campus => {
      res.json(campus);
      res.status(201);
    })
    .catch(next);
});
//modify campus data
router.put("/:campusId", function(req, res, next) {
  const campusId = req.params.campusId;
  Campuses.findById(campusId)
    .then(campus => {
      campus.update(req.body);
      res.status(200);
      res.json(campus);
    })
    .catch(next);
});

// delete a campus
router.delete("/:id", function(req, res, next) {
  const campusId = req.params.id;
  Campuses.destroy({ where: { id: campusId } })
    .then(campus => {
      console.log(campus);
      res.status(204);
      res.json(campus);
    })
    .catch(next);
});
