/**
 * Router for all http requests to the /api route.
 */

import express from "express";
import { getTakenseats } from "../controllers/getTakenseats.js";
import {
  getScreeningInfo,
  screeningById,
} from "../controllers/getScreeningInfo.js";
import { checkScreeningId } from "../middleware/checkScreeningId.js";
import { checkMovieDetails } from "../middleware/checkMovieDetails.js";
import { adminGetMovies, getMovies } from "../controllers/movieController.js";
import { checkBookingDetails } from "../middleware/checkBooking.js";
import { addBooking, getBookings } from "../controllers/book.js";
import {
  getMovieDetailsController,
  getScreeningsByDate,
} from "../controllers/moviedetailsController.js";
import { validateBookingSearch } from "../middleware/searchBooking.js";
import { findBooking } from "../controllers/findBooking.js";
import { checkMovieFilterQueries } from "../middleware/checkMoviesFilter.js";
import { checkToken } from "../middleware/checkToken.js";
import { deleteBooking } from "../controllers/deleteBooking.js";
import { theatreLayout } from "../controllers/theatreLayout.js";
import { checkScreeningFilter } from "../middleware/checkScreeningsFilter.js";

import { loginhandler } from "../controllers/loginUser.js";
import { registerHandler } from "../controllers/registerUser.js";
import { checkSeatsTaken } from "../middleware/checkTakenSeats.js";
import { getUserInfo } from "../controllers/getUser.js";
import { checkSeatExists } from "../middleware/checkSeatExists.js";
import { searchMovieController } from "../controllers/searchMovieController.js";
import { checkSearchQuery } from "../middleware/checkSearchQuery.js";
import { getTicketTypes } from "../controllers/getTicketTypes.js";
import { validateData } from "../middleware/checkSentData.js";
import { subscribe } from "../controllers/polling.js";
import { checkSeatsForDeletion } from "../middleware/checkSeatsForDeletion.js";
import { addScreeningCheck } from "../middleware/addScreeningCheck.js";
import { isAdmin } from "../middleware/isAdmin.js";
import { addScreeningRoute } from "../controllers/addScreening.js";
import { getTheatresController } from "../controllers/theatre.js";
import { addMovie } from "../controllers/addMovie.js";
import { validateAddMovie } from "../middleware/checkAddMovie.js";
import {
  getLanguages,
  getLanguagesByMovieId,
} from "../controllers/Language.js";
import { findLanguage } from "../controllers/findLanguage.js";
import { addLanguage } from "../controllers/addLanguage.js";

import { checkIfSuperAdmin } from "../middleware/checkIfSuperAdmin.js";
import { findUser } from "../controllers/findUser.js";
import { findName } from "../controllers/findName.js";
import { removeScreeningCheck } from "../middleware/removeScreeningCheck.js";
import { removeScreeningRoute } from "../controllers/removeScreening.js";

import { updateUserRole } from "../controllers/updateUserRole.js";
import { addName } from "../controllers/addNameController.js";
import { checkName } from "../middleware/addNameCheck.js";
import { searchGenreCheck } from "../middleware/genreSearchCheck.js";
import { searchGenre } from "../controllers/genreSearchController.js";
import { addGenreCheck } from "../middleware/addGenreCheck.js";
import { addGenreController } from "../controllers/addGenreController.js";
import { toggleHiddenController } from "../controllers/toggleHiddenController.js";

const router = express.Router();

// Route to check which seats are taken on a specific screening
router.get("/takenseats/:screeningid", checkScreeningId, getTakenseats);

// Route to get all screening for a specific movie
router.get("/moviescreenings/:movieid", getScreeningInfo);

// Route to get a list of all movies
router.get("/movies", checkMovieFilterQueries, getMovies);

// Route for searching for a movie
router.get("/movies/search", checkSearchQuery, searchMovieController);

// Route to get the details about a movie
router.get(
  "/moviedetails/:movieid",
  checkMovieDetails,
  getMovieDetailsController
);

// Route to get screenings for a movie on a specific day
router.get(
  "/screenings/:movieid/:date",
  checkScreeningFilter,
  getScreeningsByDate
);

// Route to get all languages
router.get("/languages", getLanguages);

// Route to get all tickettypes
router.get("/tickettypes", getTicketTypes);

// Route to get theatre layout
router.get("/theatrerows/:theatreid", theatreLayout);

// Route to subscribe to changes in booked seats for a particular screening
router.get("/subscribeScreenings/:screeningid", subscribe);

// Get info of a screening by id
router.get("/screening/:screeningid", checkScreeningId, screeningById);

// Login route
router.post("/login", validateData, loginhandler);

// Register route
router.post("/register", validateData, registerHandler);

// All routes below uses the middleware checkToken
router.use(checkToken);

// Route to get info about current user
router.get("/currentUser", getUserInfo);

// Route to post a booking
router.post(
  "/booking/:screeningid",
  checkScreeningId,
  checkSeatsTaken,
  checkSeatExists,
  checkBookingDetails,
  addBooking
);

// Route to delete a booking
router.delete("/booking", checkSeatsForDeletion, deleteBooking);

// Route to delete a screening
router.delete(
  "/removescreening/:screeningId",
  isAdmin,
  removeScreeningCheck,
  removeScreeningRoute
);

// Route to get current logged in users bookings
router.get("/currentUser/bookings", getBookings);

// Route to add a screening for a movie
router.post("/addscreening", isAdmin, addScreeningCheck, addScreeningRoute);

// Route to get languages for a particular movie
router.get("/language/:movieid", isAdmin, getLanguagesByMovieId);

// Route to add names for actors and directors
router.post("/addname", isAdmin, checkName, addName);

// Route for searching a movie genre
router.get("/searchgenre", isAdmin, searchGenreCheck, searchGenre);

// Route for adding a movie genre
router.post("/addgenre", isAdmin, addGenreCheck, addGenreController);

// Route to add a language.
router.post("/addLanguages", isAdmin, addLanguage);

// Route to get all theatres
router.get("/theatres", isAdmin, getTheatresController);

// Route to search for a booking by query
router.get("/bookinginfo", isAdmin, validateBookingSearch, findBooking);

// Route to get users by search query
router.get("/users", checkIfSuperAdmin, findUser);

// Route to search for actors / directors
router.get("/namesearch", isAdmin, findName);

// Route to search for languages
router.get("/searchlanguages", isAdmin, findLanguage);

// Route for updating a users role
router.put("/users", checkIfSuperAdmin, updateUserRole);

// Route for adding a movie
router.post("/addmovie", isAdmin, validateAddMovie, addMovie);

// Route for ishidden movie
router.put("/toggleHidden/:movieid", isAdmin, toggleHiddenController);

// Route for Admin to get all movies, id, title, isHidden only
router.get("/allmovies", isAdmin, adminGetMovies);

export default router;
