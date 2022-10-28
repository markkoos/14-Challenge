const path = require(`path`);
const express = require(`express`);
const exphbs = require(`express-handlebars`);
const routes = require('./controllers');
const session = require(`express-session`);
const helpers = require(`./utils/helpers`);

// import sequelize connection
const sequelize = require(`./config/connection`);
const SequelizeStore = require(`connect-session-sequelize`)(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// set up sessions
const sess = {
    secret: `Super secret secret`,
    cookie: {
        // expires after 1 day
        maxAge: 24 * 60 * 60 * 1000 
    },
    resave: false,
    saveUninitialized: false,
    store: new SequelizeStore({
        db: sequelize,
    }),
}

app.use(session(sess));

// create template engine
const hbs = exphbs.create({});

app.engine(`handlebars`, hbs.engine);
app.set(`view engine`, `handlebars`);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, `public`)));
app.use(routes);

app.get(`/`, (req, res) => {
    res.render(`home`);
});

app.get(`*`, (req, res) => {
    res.render(`home`);
})

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}!`)
    })
})