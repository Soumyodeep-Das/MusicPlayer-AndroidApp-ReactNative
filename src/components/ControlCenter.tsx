import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import TrackPlayer, { State, usePlaybackState } from 'react-native-track-player'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { playbackService } from '../../musicPlayerServices'

const ControlCenter = () => {

    const playBackState = usePlaybackState()
    
    const getPlaybackStateValue = (): State => {
      if (typeof playBackState === 'object' && 'state' in playBackState) {
          return playBackState.state!;
      }
      return playBackState;
  };

  const playbackStateValue = getPlaybackStateValue();
    //NextBtn
    const skipToNext = async () => {
        await TrackPlayer.skipToNext()
    }

    //PrevBtn
    const skipToPrevious = async () => {
        await TrackPlayer.skipToPrevious()
    }
    
    //PlayPauseBtn
    const togglePlayback = async (playback: State) => {
        const currentTrack = await TrackPlayer.getActiveTrack()

        if(currentTrack !== null){
            if(playback === State.Paused || playback === State.Ready){
                await TrackPlayer.play()
            } else {
                TrackPlayer.pause()
            }
        }
    }
  return (
    <View style={styles.container}>
        <Pressable
        onPress={skipToPrevious}>
            <Icon style={styles.icon} name="skip-previous" size={40}></Icon>
        </Pressable>
        <Pressable
        onPress={() => togglePlayback(playbackStateValue)}>
            <Icon style={styles.icon} name={playbackStateValue === State.Playing ? "pause" : "play-arrow"} size={75}></Icon>
        </Pressable>
        <Pressable
        onPress={skipToPrevious}>
            <Icon style={styles.icon} name="skip-next" size={40}></Icon>
        </Pressable>
        
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      marginBottom: 56,
  
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    icon: {
      color: '#FFFFFF',
    },
    playButton: {
      marginHorizontal: 24,
    },
  });
  
export default ControlCenter