const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const validateProfileInput = require("../../validation/profile");
const validateExperienceInput = require("../../validation/experience");
const validateEducationInput = require("../../validation/education");

// @Route GET api/profile/test
// @Desc Test profile route
// @Access Public
router.get("/test", (req, res) => res.json({ msg: "Profile Works" }));

// @Route GET api/profile
// @Desc GET current users profile
// @Access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = " There are no profiles for this user";
          return res.status(400).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).jsone(err));
  }
);

// @Route GET api/profile/a;
// @Desc GET all profile
// @Access Public
router.get("/all", (req, res) => {
  const errors = {};
  Profile.find()
    .populate("user", ["name", "avatar"])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = " There are no profiles for this user";
        return res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch(err => res.status(404).json({ profile: "There is no profiles" }));
});

// @Route GET api/profile/handle/:handle
// @Desc GET profile by handle
// @Access Public
router.get("/handle/:handle", (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There are no profiles for this user";
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @Route GET api/profile/user/:user_id
// @Desc GET profile by user id
// @Access Public
router.get("/user/:user_id", (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There are no profiles for this user";
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({ profile: "There is no profile for this user" })
    );
});

// @Route POST api/profile
// @Desc Create users profile
// @Access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400
      return res.status(400).json(errors);
    }

    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    // if (req.body.company) profileFields.company = req.body.company;
    // if (req.body.website) profileFields.website = req.body.website;
    // if (req.body.location) profileFields.location = req.body.location;
    // if (req.body.bio) profileFields.bio = req.body.bio;
    // if (req.body.status) profileFields.status = req.body.status;
    // if (req.body.githubUser) profileFields.githubUser = req.body.githubUser;

    // Skills - Split into Array
    // if (typeof req.body.skills !== undefined) {
    //   profileFields.skills = req.body.skills.split(",");
    // }

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        //   Create
        // Check if handle exist
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "Handle Already Exist";
            res.status(400).json(errors);
          }

          //   Save Profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

// // @Route POST api/profile/experience
// // @Desc Add experience to profile
// // @Access Private
// router.post(
//   "/experience",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     const { errors, isValid } = validateExperienceInput(req.body);
//     // Check Validation
//     if (!isValid) {
//       // Return any errors with 400
//       return res.status(400).json(errors);
//     }

//     Profile.findOne({ user: req.user.id }).then(profile => {
//       const newExp = {
//         title: req.body.title,
//         company: req.body.company,
//         location: req.body.location,
//         from: req.body.from,
//         to: req.body.to,
//         current: req.body.current,
//         description: req.body.description
//       };

//       // Add to experience Array
//       profile.experience.unshift(newExp);
//       profile.save().then(profile => res.json(profile));
//     });
//   }
// );

// // @Route POST api/profile/education
// // @Desc Add education to profile
// // @Access Private
// router.post(
//   "/education",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     const { errors, isValid } = validateEducationInput(req.body);
//     // Check Validation
//     if (!isValid) {
//       // Return any errors with 400
//       return res.status(400).json(errors);
//     }

//     Profile.findOne({ user: req.user.id }).then(profile => {
//       const newEdu = {
//         school: req.body.school,
//         degree: req.body.degree,
//         fieldOfStudy: req.body.fieldOfStudy,
//         from: req.body.from,
//         to: req.body.to,
//         current: req.body.current,
//         description: req.body.description
//       };

//       // Add to education Array
//       profile.education.unshift(newEdu);
//       profile.save().then(profile => res.json(profile));
//     });
//   }
// );

// // @Route DELETE api/profile/experience/:exp_id
// // @Desc Delete experience to profile
// // @Access Private
// router.delete(
//   "/experience/:exp_id",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     Profile.findOne({ user: req.user.id })
//       .then(profile => {
//         // GET remove index
//         const removeIndex = profile.experience
//           .map(item => item.id)
//           .indexOf(req.params.exp_id);

//         //Splice out of array
//         profile.experience.splice(removeIndex, 1);

//         profile.save().then(profile => res.json(profile));
//       })
//       .catch(err => res.status(404).json(err));
//   }
// );

// // @Route DELETE api/profile/education/:edu_id
// // @Desc Delete education to profile
// // @Access Private
// router.delete(
//   "/education/:edu_id",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     Profile.findOne({ user: req.user.id })
//       .then(profile => {
//         // GET remove index
//         const removeIndex = profile.education
//           .map(item => item.id)
//           .indexOf(req.params.edu_id);

//         //Splice out of array
//         profile.education.splice(removeIndex, 1);

//         profile.save().then(profile => res.json(profile));
//       })
//       .catch(err => res.status(404).json(err));
//   }
// );

// @Route DELETE api/profile
// @Desc Delete user and profile
// @Access Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

module.exports = router;
