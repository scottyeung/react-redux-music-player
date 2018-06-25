import React, { Component } from 'react'
import {connect} from "react-redux"
import { Button } from "react-bootstrap"
import { play_track, update_track } from "../../actions/audio"
import styles from "./Audio.scss"

const AUDIOSOURCE = "/digitals/" 

class ProductAudio extends Component {

  constructor(props) {
    super(props)
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.player.src !== nextProps.player.src) {
         return true;
     }else{
         return false; // no re-rendering is required
     }
 }

  onItemClick = (src, title) => {
    this.props.update_track(title)
    if(src != this.props.player.src || !(this.props.player.isPlaying)){
        this.props.play_track(src)
    }
  }

  render() {

    const audio = this.props.product.digitals
    const preview = audio.map((link) => 
        <div key={link.id}>
            <Button
            className={styles.link}
            bsStyle="danger"
            onClick={this.onItemClick.bind(this, AUDIOSOURCE + link.attachment_file_name, link.track_name )}
            title="Send">
                {link.track_name}
            </Button> 
        </div> 
    );

    return (    
        <div>
            {preview}      
        </div>
    )
  }

}

function mapDispatchToProps(dispatch) {
    return({
        play_track: (source) => {dispatch(play_track(source))},
        update_track: (title) => {dispatch(update_track(title))}
    })
}

function mapStateToProps(store){
    return {
        player : store.audio
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductAudio);
