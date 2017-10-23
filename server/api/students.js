const router = require("express").Router();
const { Students } = require("../../db/models");

module.exports = router;

//get all students
router.get("/", function(req, res, next) {
  Students.findAll()
    .then(students => res.json(students))
    .catch(next);
});

//get individual student
router.get("/:id", function(req, res, next) {
  const studentId = req.params.id;

  Students.findAll({ where: { id: studentId } })
    .then(student => res.json(student))
    .catch(next);
});

//post a new student to database
router.post("/", function(req, res, next) {
  Students.create(req.body)
    .then(student => {
      res.status(201);
      res.json(student);
    })
    .catch(next);
});

//modify student data
router.put("/:studentId", function(req, res, next) {
  const studentId = req.params.studentId;
  Students.findById(studentId)
    .then(student => {
      student.update(req.body);
      res.status(200);
      res.json(student);
    })
    .catch(next);
});

// delete a student
router.delete("/:id", function(req, res, next) {
  const studentId = req.params.id;

  Students.destroy({ where: { id: studentId } })
    .then(() => res.status(204).end())
    .catch(next);
});
