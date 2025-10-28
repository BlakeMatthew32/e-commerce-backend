import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from 'bcrypt';

const initializePassport = (passport, getUserByEmail, getUserById) => {
  const authenticateUser = async (email, password, done) => {
    const user = await getUserByEmail(email);
    if (!user) {
      return done(null, false, { message: 'No user with that email'})
    };

    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Incorrect Password.' });
      }
    } catch (error) {
      done(error)
    }
  }

  passport.use(new LocalStrategy({usernameField: 'email' }, authenticateUser));

  passport.serializeUser((user, done) => {
    return done(null, user.id)
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await getUserById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

}

export { initializePassport }
