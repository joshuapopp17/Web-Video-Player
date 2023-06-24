// keeps track of which video we are on
var current_index = 0

// list of available videos to chose from
const available = [
    {
        id: 1,
        played: false,
        video_url:"7v8bekkknjo",
        title: "GMK67 Build & Sound Test - Best Budget Keyboard 2023"
    },
    {
        id: 2,
        played: false,
        video_url:"7R165Thrlf4",
        title: "NEVER TOO SMALL: Designer Couples Simple Luxe Apartment"
    },
    {
        id: 3,
        played: false,
        video_url:"Z6aX9ODa3J4",
        title: "JDM Cars - A Complete Beginner's Guide"
    },
    {
        id: 4,
        played: false,
        video_url:"343EWZS9O88",
        title: "How To Get Out of Tutorial Hell (Step by Step Guide)"
    },
    {
        id: 5,
        played: false,
        video_url: "ubOhA56G_tk",
        title: "The Complete Guide to Getting a Tech Job"
    },
    {
        id: 6,
        played: false,
        video_url:"zMf_xeGPn6s",
        title: "React from Another Dimension by Dan Abramov at #RemixConf 2023 "
    },
    {
        id: 7,
        played: false,
        video_url:"U-10ihHveAM",
        title: "How Frank Ocean's Coachella 2023"
    },
    {
        id: 8,
        played: false,
        video_url:"H2I6V0NlaHg",
        title: "Fred again.. - Studio Live (London, April 2021)"
    },
    {
        id: 9,
        played: false,
        video_url:"yb-kYt1lpnI",
        title: "What its like to work in the worlds greatest office"
    },
    {
        id: 10,
        played: false,
        video_url: "7tuRJIkDcXg",
        title: "How A24 took over Hollywood"
    }
]   

// array to store user playlist
var playlist = []

// loads new video when image is clicked
const newVideo = (elem) => {
    player.loadVideoById(elem.id)
}

// plays video
const startVideo = async () => {
    if (playlist.length > 0) {
        await markVideoPlayed(current_index)
    }
    player.playVideo()
}

var availableContainer = document.getElementById("available-container")
var playlistContainer = document.getElementById("playlist-container")

// renders list of videos
const renderAvailable = () => {
    available.forEach((video, index) => {
        let table = document.createElement('div');
        table.innerHTML = `
            <div style="display: flex; flex-direction: column; width: 300px; margin-bottom: 20px; gap: 10px">
                <img onclick="newVideo(this)" id="${video.video_url}" width="300px" src="https://img.youtube.com/vi/${video.video_url}/mqdefault.jpg">
                <span style="font-size: 1em; font-weight: semi-bold">${video.title}</span>
                <button onclick="addToPlaylist(${index})" style="font-size: 1em; font-weight: semi-bold; background-color: dodgerblue">Add to playlist</button>
            </div>
        `;
        availableContainer.appendChild(table);
    })
}

// renders list of videos
const renderPlaylist = () => {
    playlistContainer.innerHTML = ""
    playlist.forEach((video, index) => {
        let table = document.createElement('div');
        table.innerHTML = `
            <div style=" display: flex; flex-direction: column; width: 300px; margin-bottom: 20px; gap: 10px">
                <img onclick="newVideo(this)" id="${video.video_url}" width="300px" style="cursor: pointer;" src="https://img.youtube.com/vi/${video.video_url}/mqdefault.jpg">
                <span style="font-size: 1em; font-weight: semi-bold">${video.title}</span>
                <span style="font-size: 1em; font-weight: semi-bold">Added: ${video.added}</span>
                <span style="font-size: 1em; font-weight: semi-bold">Played: ${video.played ? "true": "false"}</span>
                <div style=" display: flex; flex-direction: row; width: 300px; justify-content: space-evenly; gap: 10px">
                    <button onclick="moveUp(${index})" style="background-color: dodgerblue">move up</button>
                    <button onclick="moveDown(${index})" style="background-color: dodgerblue">move down</button>
                    <button onclick="markVideoPlayed(${index})" style="background-color: lightgrey">mark as played</button>
                </div>
                <button onclick="removeFromPlaylist(${index})" style="background-color: tomato">Remove from playlist</button>
            </div>
        `;
        playlistContainer.appendChild(table);
    })
    if (playlist.length == 1) {
        console.log("LOAD FIRST")
        player.loadVideoById(playlist[0].video_url)
    }
}

// first render to screen
renderAvailable()
renderPlaylist()

// From HW_3 
function _dataString(data) {
    let jsonData = JSON.stringify(data); 
    return _encode({
        json: jsonData
    });
}

// From HW_3 
function _encode(data) {
    if (!data) return "";
    return Object.keys(data).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(data[k])).join('&');
}

// From HW_3 
async function getJsonResult(url, method, data) {
    options = {};
    options.method = method;
    options.headers = { "content-Type": "application/x-www-form-urlencoded" };

    let request
    if (method != 'GET') {
        if (data != null) {
            options.body = _dataString(data); 
            request = await fetch(url, options);
        } else {
            request = await fetch(url, options); 
        }
        let response = request.json(); 
        return response; 
    } else {
        let request = await fetch(url, options);
        let response = request.json(); 
        return response; 
    }
}

// adds new video to playlist using POST
const addToPlaylist = async (index) => {
    console.log("post video to playlist")
    const fetchData = {...available[index], added: new Date()}
    const results = await getJsonResult('api/playlist', 'POST', fetchData)
    if (results) {
        getPlaylist()
    }
}

// Deletes video from playlist using DELETE
const removeFromPlaylist = async (index) => {
    console.log("delete video from playlist")
    console.log(index)
    if (confirm("are you sure you want to delete this?")) {
        const results = await getJsonResult(`api/playlist/?index=${index}`, 'DELETE', null)
        if (results) {
            await getPlaylist()
        }
    }
}

// Marks video as played using PUT
const markVideoPlayed = async (index) => {
    const fetchData = {...playlist[index], index: index}
    console.log("put video as played")
    const results = await getJsonResult(`api/playlist`, 'PUT', fetchData)
    if (results) {
        getPlaylist()
    }
}

// Gets the current user playlist using GET
const getPlaylist = async () => {
    console.log("get playlist")
    // fetch playlist
    let results = await getJsonResult('api/playlist', 'GET', null)
    try {
        playlist = results.items
        renderPlaylist()
    } catch {
        if (results.title != undefined) {
            const temp = [results]
            playlist = temp
            renderPlaylist()
        } else {
            playlist = []
        }
    }
};

// gets next video from current index in playlist
const getNextVideo = () => {
    console.log("next")
    if (playlist.length > 0) {
        if (current_index + 1 < playlist.length) {
            current_index += 1
            player.loadVideoById(playlist[current_index].video_url)
        }
    }
}

// gets previous video from current index in playlist
const getPrevVideo = () => {
    console.log("prev")
    if (playlist.length > 0) {
        if (current_index - 1 >= 0) {
            current_index -= 1
            player.loadVideoById(playlist[current_index].video_url)
        }
    }
}

// rearranges the playlist in the DB using PUT
const rearrangePlaylist = async () => {
    console.log("rearrange")
    const fetchData = {playlist: playlist}
    const results = await getJsonResult(`api/arrange`, 'PUT', fetchData)
    if (results) {
        getPlaylist()
    }
}

// moves the clicked video one index up in the playlist
const moveUp = async (index) => {
    console.log("up")
    if (index > 0) {
        var temp = playlist
        var videoSaved = playlist[index - 1]
        temp[index - 1] = playlist[index]
        temp[index] = videoSaved
        playlist = temp
        console.log(playlist)
        await rearrangePlaylist()
        renderPlaylist()
    }
}

// moves the clicked video one index down in the playlist
const moveDown = async (index) => {
    console.log("down")
    if (index < playlist.length - 1) {
        var temp = playlist
        var videoSaved = playlist[index + 1]
        temp[index + 1] = playlist[index]
        temp[index] = videoSaved
        playlist = temp
        console.log(playlist)
        await rearrangePlaylist()
        renderPlaylist()
    }
}

// get the initial playlist on load
getPlaylist()