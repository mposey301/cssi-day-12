window.onload = event => {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log(`Signed in as ${user.displayName}`);
            const googleUserId = user.uid;
            getNotes(googleUserId);
        } else {
            window.location = 'index.html';
        }
    });
}

const getNotes = (userId) => {
    const noteRef = firebase.database().ref(`users/${userId}`);
    noteRef.on('value', (snapshot) => {
        const data = snapshot.val();
        renderDataAsHtml(data);
    });
}

const renderDataAsHtml = (data) => {  
    let card = ``;

    for (let noteItem in data) {
        const note = data[noteItem];
        card += createCard(note);
    }
    document.querySelector("#app").innerHTML = card;
}

const createCard = (note) => {
    return `
        <div class="column is-on-quarter">
            <div class="card">
                <header class="card-header">
                    <p class="card-header-title">${note.title}</p>
                </header>
                <div class="card-content">
                    <div class="content">${note.text}</div>
                </div>
            </div>
        </div>
    `;
}