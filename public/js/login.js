// login handler
const loginInfo = async (event) => {
    event.preventDefault();

    // targets input results from page
    const username = document.querySelector(`#username-login`).value.trim();
    const password = document.querySelector(`#password-login`).value.trim();

    if (username && password) {
        const res = await fetch(`/api/user/login`, {
            method: `POST`,
            body: JSON.stringify({username, password}),
            headers: {'Content-Type': 'application/json'},
        });

        if (res.ok) {
            document.location.replace(`/dashboard`);
        } else {
            window.alert(`You didn't enter any text lol`);
        }
    } 
}


// register handler
const registerInfo = async (event) => {
    event.preventDefault();

    // targets input results from page
    const username = document.querySelector(`#username-signup`).value.trim();
    const password = document.querySelector(`#password-signup`).value.trim();

    if (username && password) {
        await fetch(`/api/user`, {
            method: `POST`,
            body: JSON.stringify({username, password}),
            headers: {'Content-Type': 'application/json'},
        });

        await document.location.replace(`/dashboard`);

    } else {
        window.alert(`You didn't enter any text lol`);
    }
}

// event listeners
const loginForm = document.querySelector(`.login-form`);
const registerForm = document.querySelector(`.signup-form`);

loginForm.addEventListener(`submit`, loginInfo);
registerForm.addEventListener(`submit`, registerInfo);