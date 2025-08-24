import { index, route } from "@react-router/dev/routes";

export default [
  // Auth routes
  index("routes/auth/register/Register.jsx"),
  route("/auth/login", "routes/auth/login/Login.jsx"),

  // Layout wrapper
  route("/", "routes/Layout.jsx", [
    route("/home", "routes/home.jsx"),
    route("/links", "routes/links/Link.jsx"),
    route("/preview", "routes/Preview/Preview.jsx"),
  ]),
];
