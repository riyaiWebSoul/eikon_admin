import BackAbout from "./BackAbout";
import BackView from "./BackView";
import BackAppointmentSuccess from "./BackAppoinmentSuccess";
import BackServiceMapingEcommerce from "./BackServiceMapingEcommerce";
import BackServiceMedical from "./BackServiceMedical";
import BackFooter from "./BackFooter";
import BackPatientReviews from "./BackPatientReviews";
import BackHomePage from "./BackHomePage";
import ImageUpload from "./ImageUpload";
import BackContact from "./BackContact";
import HealingTouch from "./HealingTouch";
import Portfolio from "./Portfolio";
import Profile from "./Profile";

export const components = [
  {
    name: "Profile",
    component: Profile,
  },
  {
    name: "About us",
    component: BackAbout,
  },

  {
    name: "Appointments",
    component: BackAppointmentSuccess,
  },
  {
    name: "Contact",
    component: BackContact,
  },
  {
    name: "Enquiry List",
    component: BackView,
  },
  {
    name: "Footer page",
    component: BackFooter,
  },
  {
    name: "Healing Touch",
    component: HealingTouch,
  },
  {
    name: "Home Banner",
    component: BackHomePage,
  },
  {
    name: "Image Upload",
    component: ImageUpload,
  },
  {
    name: "Maping Service",
    component: BackServiceMapingEcommerce,
  },
  {
    name: "Medical Service",
    component: BackServiceMedical,
  },

  {
    name: "Patient Review",
    component: BackPatientReviews,
  },
  {
    name: "Portfolio",
    component: Portfolio,
  },

];
