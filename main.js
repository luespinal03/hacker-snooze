// apiCall();
let body = document.querySelector('body');
let askSection = document.querySelector('#ask');
let storiesList = document.querySelector('#story');
let child = document.createElement('div');
let anchorTag = document.createElement('a');
let jobs = document.querySelector('#jobs');
let polls = document.querySelector('#polls');
let id = [];
let otherStories = []
let topStoriesUrl = 'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty'
let askStoriesGenLink = 'https://hacker-news.firebaseio.com/v0/askstories.json?print=pretty'
let jobsUrl = 'https://hacker-news.firebaseio.com/v0/item/192327.json?print=pretty';
let pollUrl = 'https://hacker-news.firebaseio.com/v0/item/126809.json?print=pretty';



// This function gets us the top 100 stories
let top100list = async () => {
    let res = await fetch(topStoriesUrl);
    let data = await res.json();

    for (let i = 0; i < 100; i++) {
        id.push(data[i])
    }
    // calling second function (top100Id) at the end of the first one (top100list). This allows top100Id to begin right after top100List
    top100Id();
}
top100list();
// console.log(id);


//  This function gets us the top 100 lists ID's
let top100Id = async () => {

    for (let idNumber of id) {
        let request = await fetch(`https://hacker-news.firebaseio.com/v0/item/${idNumber}.json?print=pretty`)


        let data = await request.json();

        let parentTitle = document.createElement('div');
        parentTitle.setAttribute('id', 'parentDiv');
        child = document.createElement('div');
        anchorTag = document.createElement('a');
        storiesList.appendChild(parentTitle);
        parentTitle.appendChild(anchorTag);
        storiesList.appendChild(child);

        anchorTag.innerText = data.title;
        anchorTag.href = data.url;
        child.innerText = `${data.descendants} comments ${data.score} points submitted by ${data.by}`
        // console.log(data)
    }
};


/* **************************************
 ***** CODE BELOW IS FOR ASK STORIES *****
 *****************************************/


let askLinks = async () => {
    let res = await fetch(askStoriesGenLink)
    let data = await res.json()
    otherStories = data;
    // console.log(otherStories)
};


let askingLinks = async () => {

    storiesList.innerHTML = ''
    child.innerHtml = ''

    for (let idNumber of otherStories) {
        let request = await fetch(`https://hacker-news.firebaseio.com/v0/item/${idNumber}.json?print=pretty`)

        let data = await request.json();
        // console.log(data)

        let parentTitle = document.createElement('div');
        parentTitle.setAttribute('id', 'askingParentDiv');
        child = document.createElement('div');
        anchorTag = document.createElement('a');
        storiesList.appendChild(parentTitle);
        parentTitle.appendChild(anchorTag);
        storiesList.appendChild(child);

        anchorTag.innerText = data.title;
        anchorTag.href = data.url;
        child.innerText = `${data.descendants} comments ${data.score} points submitted by ${data.by}`
    }
};

// EVENT LISTENER FOR 'ASK STORIES' BUTTON ON TOP OF THE PAGE
askSection.addEventListener('click', async () => {
    await askLinks()
    await askingLinks();
});


// JOBS BUTTON
jobs.addEventListener('click', async () => {
    try {
        let request = await fetch(jobsUrl);

        if (request.status >= 200 && request.status <= 299) {
            let data = await request.json();
            console.log(data);
            storiesList.innerHTML = ''
            child.innerHtml = ''

            let parentTitle = document.createElement('div');
            parentTitle.setAttribute('id', 'ParentDiv');
            child = document.createElement('div');
            anchorTag = document.createElement('a');
            storiesList.appendChild(parentTitle);
            parentTitle.appendChild(anchorTag);
            storiesList.appendChild(child);

            anchorTag.innerText = data.title;
            anchorTag.href = data.url;
            child.innerText = `${data.descendants} comments ${data.score} points submitted by ${data.by}`
        } else {
            throw Error(`${request.status} | ${request.statusText}`); // .statusText specifies the error type
        }
    } catch (error) {
        console.log(error);
    }
});



// Polls button section 
polls.addEventListener('click', async () => {

    try {
        let request = await fetch(pollUrl);

        if (request.status >= 200 && request.status <= 299) {
            let data = await request.json();
            console.log(data);
            storiesList.innerHTML = ''
            child.innerHtml = ''

            let parentTitle = document.createElement('div');
            parentTitle.setAttribute('id', 'ParentDiv');
            child = document.createElement('div');
            anchorTag = document.createElement('a');
            storiesList.appendChild(parentTitle);
            parentTitle.appendChild(anchorTag);
            storiesList.appendChild(child);
            anchorTag.innerText = data.title;
            anchorTag.href = data.url;
            child.innerText = `${data.descendants} comments ${data.score} points submitted by ${data.by}`
        } else {
            throw Error(`${request.status} | ${request.statusText}`); // .statusText specifies the error type
        }
    } catch (error) {
        console.log(error);
    }
});