console.log('Start');

function loginUser(email, password, callback) {   
    setTimeout(() => {
        console.log('Now we have the data');
        callback({ userEmail: email });
    }, 5000);
    
}

function getUserVideos(email, callback) {
    setTimeout(() => {
        callback(['video1','video2','video3']);
    }, 2000);
}

const user = loginUser('devedf@goomail.com', '1234567', user => {
    console.log(user);
    getUserVideos(user.email,  videos => {
        console.log(videos);
    });
});

console.log('Finish');