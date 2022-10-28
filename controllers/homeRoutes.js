const router = require(`express`).Router();
const { Blog, User } = require(`../models`);
const withAuth = require(`../utils/auth`);

// gets all projects
router.get(`/`, async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            include: [
                {
                    model: User,
                    attributes: [`username`],
                },
            ],
        });

        // makes data readable
        const blogs = blogData.map((blog) => 
            blog.get({ plain: true })
        );

        res.render(`home`, { blogs, logged_in: req.session.logged_in});

    } catch (err) {
        res.status(500).json(err);
    }
});

// route for SINGLE blog
router.get(`/blog/:id`, async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: [`username`],
                }
            ],
        });

        const blog = blogData.get({ plain: true });
        console.log(blog);

        res.render(`blog`, { blog, logged_in: req.session.logged_in })
    } catch (err) {
        res.status(500).json(err);
    }
})

// login route
router.get(`/login`, async (req, res) => {
    try {
        res.render(`login`);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;