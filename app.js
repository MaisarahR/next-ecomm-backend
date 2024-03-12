import express from "express";
// import prisma from "./src/utils/prisma.js"
// import { Prisma } from "@prisma/client"
// import bcrypt from "bcryptjs"
import cors from "cors";
// import { signAccessToken } from "./src/utils/jwt.js"
// import { filter } from '../utils/common.js'
import userRouter from "./src/controllers/users.controllers.js";
import authRouter from "./src/controllers/auth.controllers.js";
import morgan from "morgan"; // add this, basic logging
import imageRouter from "../next-ecomm-backend/src/controllers/post.controllers.js";
import paymentRouter from "../next-ecomm-backend/src/controllers/payment.controllers.js";

import auth from "./src/middlewares/auth.js"; // added temp

const app = express();
// const port = process.env.PORT || 8080 // was told to remove this line in testing (actually) lms, as we have moved it to server.js

app.use(morgan("combined")); // add this, basic logging

app.use(express.json()); //line given by mentor

//Simple Usage (Enable All CORS Requests)
app.use(cors());

app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/image", imageRouter);
app.use("/payment", paymentRouter);

app.get("/protected", auth, (req, res) => {
  res.json({ hello: "world" });
}); // added temp

//HIDE
// app.listen(80, function () {
//   console.log('CORS-enabled web server listening on port 80')
// })

// //user sign-up  (moved to users.controllers.js)
// //you dont want data to send back password as its insecure. so you leave it out.
// function filterUser(user) {
//   const { id, name, email } = user;
//   return { id, name, email };
// }

//User SIGN-UP (moved to users.controllers.js)
//setting constraints on fields that are not database constraints like in Prisma Schema. ie. email is unique.
// function validateUser(input) {
//   const validationErrors = {}

//   if (!('name' in input) || input['name'].length == 0) {
//     validationErrors['name'] = 'cannot be blank' //cannot be left empty
//   }

//   if (!('email' in input) || input['email'].length == 0) {
//     validationErrors['email'] = 'cannot be blank' //cannot be left empty
//   }

//   if (!('password' in input) || input['password'].length == 0) {
//     validationErrors['password'] = 'cannot be blank' //cannot be left empty
//   }

//   if ('password' in input && input['password'].length < 8) {
//     validationErrors['password'] = 'should be at least 8 characters' //limit to only 8 characters.
//   }

//   if ('email' in input && !input['email'].match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
//     validationErrors['email'] = 'is invalid'
//   } //Known as regex. This regular expression is used to validate email addresses. It matches strings that follow the pattern of username@domain.com, where username can contain letters, numbers, underscores, hyphens, and dots, and domain can contain letters, numbers, hyphens, and dots. The last part (([a-zA-Z]{2,5})) matches the top-level domain (such as .com or .org) with a length of 2 to 5 characters.

//   return validationErrors
// } //

//User SIGN-IN (moved to auth.controllers.js)
// function validateLogin(input) {
//   const validationErrors = {}

//   if (!('email' in input) || input['email'].length == 0) {
//     validationErrors['email'] = 'cannot be blank'
//   }

//   if (!('password' in input) || input['password'].length == 0) {
//     validationErrors['password'] = 'cannot be blank'
//   }

//   if ('email' in input && !input['email'].match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
//     validationErrors['email'] = 'is invalid'
//   }

//   return validationErrors
// }

//User SIGN-UP (moved to users.controllers.js)
// app.post('/users', async (req, res) => {
//   const data = req.body

//   const validationErrors = validateUser(data)

//   if (Object.keys(validationErrors).length != 0) return res.status(400).send({
//     error: validationErrors
//   })

//   data.password = bcrypt.hashSync(data.password, 8);   //storing password using "bcryptjs"

//   prisma.user.create({
//     data
//   }).then(user => {
//     return res.json(filterUser(user, 'id', 'name', 'email')) //indicate you only want these 3 and not include password.

//   }).catch(err => {
//     if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
//       const formattedError = {}
//       formattedError[`${err.meta.target[0]}`] = 'already taken'

//       return res.status(500).send({
//         error: formattedError
//       });  // friendly error handling
//     }
//     throw err  // if this happens, our backend application will crash and not respond to the client. because we don't recognize this error yet, we don't know how to handle it in a friendly manner. we intentionally throw an error so that the error monitoring service we'll use in production will notice this error and notify us and we can then add error handling to take care of previously unforeseen errors.
//   })
// })//

//User SIGN-IN (moved to auth.controllers.js)
// app.post('/signin', async (req, res) => {
//   const data = req.body

//   const validationErrors = validateLogin(data)

//   if (Object.keys(validationErrors).length != 0) return res.status(400).send({
//     error: validationErrors
//   })

//   const user = await prisma.user.findUnique({
//     where: {
//       email: data.email
//     }
//   })

//   if (!user) return res.status(401).send({
//     error: 'Email address or password not valid'
//   })

//   const checkPassword = bcrypt.compareSync(data.password, user.password)
//   if (!checkPassword) return res.status(401).send({
//     error: 'Email address or password not valid'
//   })

//   const userFiltered = filterUser(user, 'id', 'name', 'email')
//   const accessToken = await signAccessToken(userFiltered)
//   const userID = user.id
//   return res.json({ accessToken, userID })
// })

// was told to remove this line in testing (actually) lms, as we have moved it to server.js
// app.listen(port, () => {
//   console.log(`App started; listening on port ${port}`)
// })
//indicate that the code is running via terminal below


export default app; //(moved to users.controllers.js)
