const newBlog = async (event) => {
    event.preventDefault();

    // targets input results for new blog
    const title = document.querySelector(`#blog-title`).value.trim();
    const contents = document.querySelector(`#blog-text`).value.trim();

    if (title && contents) {
        // POST request to the Blog model
        await fetch(`/api/blog`, {
            method: `POST`,
            body: JSON.stringify({title, contents}),
            headers: {'Content-Type': `application/json`},
        });

            await document.location.replace(`/dashboard`);
    
    } else {
        window.alert(`Error error error error fix it`);
    }
}

// event listeners
const blogForm = document.querySelector(`.blog-form`);
blogForm.addEventListener(`submit`, newBlog);