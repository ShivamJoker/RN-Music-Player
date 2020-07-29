import React, {useEffect, useState, useRef} from 'react';
import {View, TouchableOpacity, StyleSheet, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TrackPlayer, {
  usePlaybackState,
  useTrackPlayerEvents,
  Event,
} from 'react-native-track-player';
export default function Controller({onNext, onPrv, isPlaying}) {
  const playbackState = usePlaybackState();
  const isPlaying = useRef('paused'); //paused play loading

  useEffect(() => {
    console.log('Player State', playbackState);
    
  }, [playbackState]);

  const returnPlayBtn = () => {
    if (playbackState === 'playing' || playbackState === 3) {
      return <Icon color="#fff" name="pause" size={45} />;
    } else {
      return <ActivityIndicator/>
    }
  };

  const onPlayPause = () => {
    if (isPlaying.current === "playing") {
      TrackPlayer.pause()
    } else {
      
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPrv}>
        <Icon color="#fff" name="skip-previous" size={45} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onPlayPause}>
        {returnPlayBtn()}
      </TouchableOpacity>
      <TouchableOpacity onPress={onNext}>
        <Icon color="#fff" name="skip-next" size={45} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 250,
  },
});
