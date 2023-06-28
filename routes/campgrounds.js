const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, isAuthor, validateCampground } = require("../middleware");
const Campground = require("../models/campground");
const campgrounds = require("../controllers/campgrounds");

router.get("/", catchAsync(campgrounds.index));

router.get("/new", isLoggedIn, campgrounds.renderNewForm);

router.post(
  "/",
  validateCampground,
  isLoggedIn,
  catchAsync(campgrounds.createCampground)
);

router.get("/:id", catchAsync(campgrounds.showCampground));

router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  catchAsync(campgrounds.renderEditForm)
);

router.put(
  "/:id",
  validateCampground,
  isLoggedIn,
  isAuthor,
  catchAsync(campgrounds.updateCampground)
);

router.delete(
  "/:id",
  isLoggedIn,
  isAuthor,
  catchAsync(campgrounds.destroyCampground)
);

module.exports = router;
