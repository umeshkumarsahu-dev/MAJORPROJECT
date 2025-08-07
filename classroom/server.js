const express = require('express');
const app = express();
const posts = require('./routes/post');
const users = require('./routes/user');
// const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');
// app.use(cookieParser("secretKey"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// app.get("/getsignedcookies", (req, res) => {
//   res.cookie("greet", "Hello, World!", { signed: true });
//   res.send("send you some signed cookies");
// });

// app.get("/verify", (req, res) => {
//   let { signedCookies } = req;
//   res.send(`Signed Cookies: ${JSON.stringify(signedCookies)}`);
// });

// app.get("/getcookies", (req, res) => {
//   res.cookie("greet", "Hello, World!");
//   res.cookie("madeIn", "India");
//   res.send("send you some cookies");
// });

// app.get("/greet", (req, res) => {
//   let { greet, madeIn, name = 'Guest' } = req.cookies;
//   res.send(`Greet: ${greet}, Made In: ${madeIn}, Name: ${name}`);
// });

// app.get("/", (req, res) => {
//   console.dir(req.cookies);
//   res.send("Welcome to the Classroom Server!");
// });

// app.use("/users", users);
// app.use("/posts", posts);

const sessionOptions = { secret: "mySecretKey", resave: false, saveUninitialized: true };

app.use(session(sessionOptions));
app.use(flash());

app.use((req, res, next) => {
  res.locals.successMsg = req.flash("success");
  res.locals.errorMsg = req.flash("error");
  next();
});

app.get("/register", (req, res) => {
  let { name = 'Guest' } = req.query;
  req.session.name = name;
  // res.send(`Welcome to the Classroom, ${name}!`);
  if(name == 'Guest') {
    req.flash("error", "User not registered!");
  } else {
    req.flash("success", `User registered successfully!`);
  }
  res.redirect("/hello");
});

app.get("/hello", (req, res) => {
  res.render("page.ejs", { name: req.session.name || 'Guest' });
  // res.send(`Hello, ${req.session.name || 'Guest'}!`);
});


// app.get("/reqcount", (req, res) => {
//   req.session.count = (req.session.count || 0) + 1;
//   const x = req.session.count;
//   res.send(`You sent a request ${x} times`);
// });

// app.get("/test", (req, res) => {
//   // req.session.name = "John Doe";
//   res.send("Session data has been set.");
// });

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});