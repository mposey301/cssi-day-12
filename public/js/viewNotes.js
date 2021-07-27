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
        console.log(note);
        card += createCard(note);
    }
    document.querySelector("#app").innerHTML = card;
}

const createCard = (note) => {
    const randomColor = Math.floor(Math.random()*16777215).toString(16);

    return `
        <div class="column is-one-third" style="background-color:#${randomColor};">
            <div class="card" style="background-color:#${randomColor};">
                <header class="card-header">
                    <p class="card-header-title">${note.title}</p>
                </header>
                <div class="card-content">
                    <div class="content">${note.text}</div>
                    <div class="content">Created by ${note.displayName} on ${note.created}</div>
                </div>
            </div>
        </div>
    `;
}