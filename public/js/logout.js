const logout = async () => {
    await fetch(`/api/users/logout`, {
        method: `POST`,
        headers: {'Content-Type': 'application/json'}
    });

    await location.assign(`localhost:3001`);
}

const logoutBtn = document.querySelector(`.nav-logout`);
logoutBtn.addEventListener(`submit`, logout);

