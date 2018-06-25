export function play_track(src){
    return {
        type:"PLAY_TRACK",
        payload:{
            isPlaying : true,
            src : src
        }
    }
}

export function pause_track(){
    return {
        type:"PAUSE_TRACK",
        payload:{
            isPlaying : false
        }
    }
}

export function update_track(title){
    return {
        type:"UPDATE_TRACK",
        payload:{
            title: title
        }
    }
}

export function close_player(){
    return {
        type:"CLOSE_PLAYER",
        payload:{
            playedForOnce : false,
            isPlaying : false
        }
    }
}