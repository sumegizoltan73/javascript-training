console.log('Start');

function loginUser(email, password) {   
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Now we have the data');
            resolve({ userEmail: email });
        }, 5000);
    });
}

function getUserVideos(email) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(['video1','video2','video3']);
        }, 2000);
    });
}

console.log('Finish');

/////////////////////
// Promise.all

const yt = new Promise(resolve => {
    setTimeout(() => {
        console.log('gotting stuff from yt');
        resolve({videos: [1,2,3,4,5]});
    }, 2000);
});

const fb = new Promise(resolve => {
    setTimeout(() => {
        console.log('stuff from fb');
        resolve({user: 'Name'});
    }, 2000);
});

Promise.all([yt, fb]).then(result => console.log(result));

/////////////////////////

// SYNC
async function displayUser() {
    const loggedUser = await loginUser('ed', 'sdf');
    const videos = await getUserVideos(loginUser.userEmail);
    console.log('get data syncronously');
    console.log(videos);
}

displayUser();