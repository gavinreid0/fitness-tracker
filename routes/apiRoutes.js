const db = require("../models");

const router = require("express").Router();

router.get("/api/workouts", (req, res) => {
  db.workout
    .find({})
    .then((workdata) => {
      dbworkout.forEach((workout) => {
        var total = 0;
        workout.exercise.forEach((e) => {
          total += e.duration;
        });
        workout.totalDuration = total;
      });
      res.json(dbworkout);
    })
    .catch((err) => {
      res.json(err);
    });
});
// POST
router.post("/api/workouts", ({ body }, res) => {
  db.workout
    .create(body)
    .then((DataWorkout) => {
      res.json(DataWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});


router.put("/api/workouts/:id", (req, res) => {
  
  db.workout
    .findOneAndUpdate(
      { _id: req.params.id },
      {
        $inc: { totalDuration: req.body.duration },
        $push: { exercises: req.body },
      },
      { new: true }
    )
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/api/workouts/range", (req, res) => {
  db.workout
    .find({})
    .then((dbworkout) => {
      console.log("Workouts");
      console.log(dbworkout);
      res.json(dbworkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
