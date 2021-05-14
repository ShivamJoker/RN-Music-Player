import TrackPlayer, {TrackPlayerEvents} from 'react-native-track-player';

module.exports = async function () {
  // This service needs to be registered for the module to work
  // but it will be used later in the "Receiving Events" section
  TrackPlayer.addEventListener(TrackPlayerEvents.REMOTE_PLAY, () =>
    TrackPlayer.play(),
  );
  TrackPlayer.addEventListener(TrackPlayerEvents.REMOTE_PAUSE, () =>
    TrackPlayer.pause(),
  );
  TrackPlayer.addEventListener(TrackPlayerEvents.REMOTE_NEXT, () =>
    TrackPlayer.skipToNext(),
  );
  TrackPlayer.addEventListener(TrackPlayerEvents.REMOTE_STOP, () =>
    TrackPlayer.skipToPrevious(),
  );
  TrackPlayer.addEventListener(TrackPlayerEvents.REMOTE_STOP, () =>
    TrackPlayer.destroy(),
  );
  TrackPlayer.addEventListener(TrackPlayerEvents.REMOTE_SEEK, ({position}) =>
    TrackPlayer.seekTo(position),
  );
};
