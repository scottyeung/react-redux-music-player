import React, { Component } from 'react'
import {connect} from "react-redux"
import ReactHowler from 'react-howler'
import { PlaybackControls, ProgressBar } from 'react-player-controls'
import { play_track, pause_track, close_player } from '../../actions/audio'
import Logo from './Icon'
import './Player.scss'

class Player extends Component {

    state = {
        duration: 0,
        totalTime: 0,
        currentTime: 0,
        bufferedTime: 0,
        isSeekable: true,
        lastSeekStart: 0,
        lastSeekEnd: 0
    }

    componentDidMount() {
        setInterval(this.handleOnSeek, 50)
    }

    componentWillReceiveProps(nextProps) {
       if (this.props.audioplayer.src !== nextProps.audioplayer.src) {
            return true;
       } else {
            return false; // no re-rendering is required
        }
    }

    onItemClick = () => {
        if(!(this.props.audioplayer.isPlaying)){
            this.handleOnLoad();
            this.props.play_track(this.props.audioplayer.src);
        }
        else
            this.props.pause_track();
    }

    handleOnLoad () {
        this.setState({
          totalTime: this.player.duration(),
        })
    }

    handleOnSeek = () => {
        if(this.props.audioplayer.src && this.state.totalTime!=0)
            this.setState({currentTime: this.player.seek()})
    }

    handleClose = () => {
        this.props.close_player();
    }

    isEnd = () => {
        this.props.pause_track();
    }

    render() {
        return (
         <footer style={{display:(this.props.audioplayer.playedForOnce)?'flex': 'none'}} className="fixedBottom" >
               <ReactHowler src={[this.props.audioplayer.src]} 
                            playing = { this.props.audioplayer.isPlaying }
                            ref={(ref) => (this.player = ref)}
                            onLoad={()=>this.handleOnLoad()}
                            onEnd={()=>this.isEnd()}
               />
                <PlaybackControls
                isPlayable={true} 
                isPlaying={this.props.audioplayer.isPlaying}
                onPlaybackChange={() => this.onItemClick()}

                />
                <ProgressBar
                totalTime={this.state.totalTime}
                currentTime={this.state.currentTime}
                bufferedTime={this.state.bufferedTime}
                isSeekable={this.state.isSeekable}
                onSeek={time => this.setState(() => ({ currentTime: this.player.seek(time) }))}
                onSeekStart={time => this.setState(() => ({ lastSeekStart: time }))}
                onSeekEnd={time => this.setState(() => ({ lastSeekEnd: time }))}
                onIntent={time => this.setState(() => ({ lastIntent: time }))}
                />
                <div className="TrackTitle">
                {this.props.audioplayer.title}
                </div>
                <Logo onClick={()=>this.handleClose()} />
           </footer >
        );
    }
}


function mapDispatchToProps(dispatch) {
    return({
        play_track: (src) => {dispatch(play_track(src))},
        pause_track: () => {dispatch(pause_track())},
        close_player: () => {dispatch(close_player())}
    })
}

function mapStateToProps(store){
    return {
        audioplayer : store.audio
    }
}


export default connect( mapStateToProps,mapDispatchToProps)(Player);