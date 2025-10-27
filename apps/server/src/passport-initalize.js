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
        return done(null, false, { message: 'Password Incorrect.' });
      }
    } catch (error) {
      done(error)
    }
  }

  passport.use(new LocalStrategy({usernameField: 'email' }, authenticateUser));

  passport.serializeUser((user, done) => {
    return done(null, user.id)
  });

  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id));
  });

}

export { initializePassport }
