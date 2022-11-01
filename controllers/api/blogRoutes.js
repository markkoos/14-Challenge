const router = require(`express`).Router();
const { Blog } = require(`../../models`);
const withAuth = require(`../../utils/auth`);

// posts data to blog model assigned by session user id
router.post(`/`, async (req, res) => {
    try {
        const blogData = await Blog.create({...req.body, 
        user_id: req.session.user_id});

        res.status(200).json(blogData);
    } catch (err) {
        res.status(500).json(err);
    }
})

// deletes blog data
router.delete(`/`, withAuth, async (req, res) => {
    try {
        const blogData = await Blog.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        res.status(200).json(blogData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;

