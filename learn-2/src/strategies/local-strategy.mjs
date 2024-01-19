import passport from "passport";
import { Strategy } from "passport-local";
import usersApi from "../../api/usersApi.mjs";

passport.serializeUser((user, done) => {
    console.log("inside", user);
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    console.log("outside", id);
    try {
        const findUser = await usersApi.find((user) => user.id === id);
        if (!findUser) throw new Error("User not found");
        done(null, findUser);
    } catch (e) {
        done(e, null);
    }
});


passport.use(
    new Strategy(async (username, password, done) => {
        try {
            const findUser = await usersApi.find((user) => user.username === username);
            if (!findUser || findUser.password !== password) {
                throw new Error("User not found or password incorrect");
            }
            done(null, findUser);
        } catch (e) {
            done(e, null);
        }
    })
);

