require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const userdb = require('./models/User');
const jwt = require("jsonwebtoken");
const session = require("express-session");
const passport = require("passport");
const OAuthStrategy = require("passport-google-oauth2").Strategy;

const app = express();
app.use(express.json());

const clientid = process.env.CLIENTID;
const clientsecreat = process.env.CLIENTSECRET;

app.use(
    cors({
        origin: process.env.CLIENT_URL || "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);


connectDB();

//setup for session
app.use(session({
    secret:"YOUR_GENERATED_SECRET",
    resave:false,
    saveUninitialized: true
}));

//setup for passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new OAuthStrategy({
        clientID: clientid,
        clientSecret: clientsecreat,
        callbackURL: "/api/v1/auth/google/callback",
        scope: ["profile", "email"]
    },
    async(accessToken, refreshToken, profile, done) => {
        
        try{
            let user = await userdb.findOne({googleId: profile.id});

            if(!user){
                user = new userdb({
                    googleId: profile.id,
                     fullName: profile.displayName,
                     email: profile.emails[0].value,
                     profileImageUrl: profile.photos[0].value
                });
                await user.save();
            }
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: "1d",
            });
        
            return done(null, user);
        }catch(error){
            return done(error, null);
        }
    }
)
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);


app.use("/uploads", express.static(path.join(__dirname,"uploads")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
