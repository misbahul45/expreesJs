import passport from "passport";
import Strategy from "passport-discord";
import DiscordUser from "../schema/dicord-user.mjs";

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const findUser = await DiscordUser.findById(id);
        if (!findUser) {
            throw new Error("invalid credentials");
        }
        done(null, findUser);
    } catch (e) {
        done(e, null);
    }
});

export default passport.use(
    new Strategy({
        clientID: '1201870394248663050',
        clientSecret: 'tRYJ5kYHzjsLrZVX1Ua0dOqOlHrIER54',
        callbackURL: 'http://localhost:3000/api/auth/discord/redirect',
        scope: ["identify"]
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            let findUser = await DiscordUser.findOne({ discordId: profile.id });
                console.log(findUser)
            if (!findUser) {
                const newUser = new DiscordUser({
                    username: profile.username,
                    discordId: profile.id
                });
                findUser = await newUser.save();
            }

            return done(null, findUser);
        } catch (err) {
            console.error(err);
            return done(err, null);
        }
    })
);
