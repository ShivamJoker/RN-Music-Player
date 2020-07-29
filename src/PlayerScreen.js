import React, { useRef, useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  Text,
  Image,
  FlatList,
  Dimensions,
  Animated,
  StyleSheet,
} from "react-native";

import TrackPlayer, {
  Capability,
  useTrackPlayerEvents,
  usePlaybackState,
  TrackPlayerEvents,
  STATE_PLAYING,
} from "react-native-track-player";

import songs from "./data";
import Controller from "./Controller";
import SliderComp from "./SliderComp";

const { width, height } = Dimensions.get("window");

const events = [
  TrackPlayerEvents.PLAYBACK_STATE,
  TrackPlayerEvents.PLAYBACK_ERROR
];

export default function PlayerScreen() {
  const scrollX = useRef(new Animated.Value(0)).current;

  const slider = useRef(null);
  const mPlayer = useRef(null);
  const [songIndex, setSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const [playerState, setState] = useState(null);
  const playbackState = usePlaybackState();

  // for tranlating the album art
  const position = useRef(Animated.divide(scrollX, width)).current;


  useEffect(() => {
    // position.addListener(({ value }) => {
    //   console.log(value);
    // });

    scrollX.addListener(({ value }) => {
      const val = Math.round(value / width);

      setSongIndex(val);
    });

    TrackPlayer.setupPlayer().then(async () => {
      // The player is ready to be used
      console.log("Player ready");
      // add the array of songs in the playlist

      await TrackPlayer.add(songs);
      TrackPlayer.play();

      await TrackPlayer.updateOptions({
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
        ],
      });
    });

    return () => {
      scrollX.removeAllListeners();
      // TrackPlayer.destroy();

      exitPlayer();
    };
  }, []);

  useEffect(() => {
    console.log("playback state ", playbackState);
  }, [playbackState]);

  // change the song when index changes
  useEffect(() => {
    if (playbackState !== "idle") {
      TrackPlayer.skip(songs[songIndex].id)
        .then((e) => {
          console.log("changed track");
        })
        .catch((e) => console.log(e));
    }
  }, [songIndex]);

  useTrackPlayerEvents(events, (event) => {
    if (event.type === TrackPlayerEvents.PLAYBACK_ERROR) {
      console.warn("An error occurred while playing the current track.");
    }
    if (event.type === TrackPlayerEvents.PLAYBACK_STATE) {
      setState(playbackState);
    }
  });

  const exitPlayer = async () => {
    try {
      await TrackPlayer.stop();
    } catch (error) {
      console.error("exitPlayer", error);
    }
  };

  const goNext = () => {
    slider.current.scrollToOffset({
      offset: (songIndex + 1) * width,
    });
  };
  const goPrv = () => {
    slider.current.scrollToOffset({
      offset: (songIndex - 1) * width,
    });
  };

  const playPause = () => {
    // setIsPlaying();
  };

  const renderItem = ({ index, item }) => {
    return (
      <Animated.View
        style={{
          alignItems: "center",
          width: width,
          transform: [
            {
              translateX: Animated.multiply(
                Animated.add(position, -index),
                -100
              ),
            },
          ],
        }}
      >
        <Animated.Image
          source={item.artwork}
          style={{ width: 320, height: 320, borderRadius: 5 }}
        />
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={{ height: 320 }}>
        <Animated.FlatList
          ref={slider}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          data={songs}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
        />
      </SafeAreaView>
      <View>
        <Text style={styles.title}>{songs[songIndex].title}</Text>
        <Text style={styles.artist}>{songs[songIndex].artist}</Text>
      </View>

      {/* <SliderComp
        mPlayer={mPlayer}
        isPlaying={isPlaying}
        songIndex={songIndex}
      />

      <Controller
        isPlaying={isPlaying}
        onPlayPause={playPause}
        onNext={goNext}
        onPrv={goPrv}
      /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    textAlign: "center",
    fontWeight: "600",
    textTransform: "capitalize",
    color: "#ffffff",
  },
  artist: {
    fontSize: 18,
    textAlign: "center",
    color: "#ffffff",
    textTransform: "capitalize",
  },
  container: {
    justifyContent: "space-evenly",
    alignItems: "center",
    height: height,
    maxHeight: 600,
  },
});
