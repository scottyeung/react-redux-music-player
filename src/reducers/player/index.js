const default_state = {
    isPlaying : false,
    src: "",
    title: "",
    playedForOnce : false
};

function audio(state = default_state, action) {

    switch(action.type){
        case "PLAY_TRACK" :
            return Object.assign(
                {},
                state,
                {
                    isPlaying : action.payload.isPlaying,
                    src: action.payload.src,
                    playedForOnce : true
                }
            );
        
        case "UPDATE_TRACK" :
        return Object.assign(
            {},
            state,
            {
                title: action.payload.title,
                playedForOnce: true
            }
        );


        case "PAUSE_TRACK" :
            return Object.assign(
                {},
                state,
                {
                    isPlaying : action.payload.isPlaying
                }
            );
        
        case "CLOSE_PLAYER" :
        return Object.assign(
            {},
            state,
            {
                isPlaying : action.payload.isPlaying,
                playedForOnce : false
            }
        );

        default :
            return state
    }
}

export default audio
