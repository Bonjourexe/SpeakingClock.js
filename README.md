# SpeakingClock.js
A JavaScript library to add a configurable speaking clock to a webpage.

## Installation
Simply add the script to your page using a `script` tag:
```html
<script src="speakingclock.js"></script>
```

## Usage
To create a speaking clock, create a new instance of the `SpeakingClock` class and pass any optional configuration options as an object:
```JS
const myClock = new SpeakingClock({
    voice: myVoice, // Optional SpeechSynthesisVoice object
    volume: 0.8, // Optional volume setting between 0 and 1 (default: 1)
    pitch: 1.2, // Optional pitch setting between 0 and 2 (default: 1)
    rate: 1.5, // Optional rate setting between 0.1 and 10 (default: 1)
    lang: 'en-US', // Optional BCP 47 language tag (default: browser language)
    interval: 30000, // Optional interval in milliseconds (default: 60000)
    tellDate: true // Optional boolean indicating whether to announce both the date and time or only the time (default: false)
});
```
then start the instance:
```JS
myClock.start();
```
If you want to stop it:
```JS
myClock.stop();
```

>### Tip :
>Time measurements can be represented using the `UNITS` object, which defines time units in milliseconds. The available units are:
>- `UNITS.SECOND` (1000 milliseconds)
>- `UNITS.MINUTE` (60000 milliseconds)
>- `UNITS.HOUR` (3600000 milliseconds)
>- `UNITS.DAY` (86400000 milliseconds)
>
>For example, to create an instance with an interval of 30 seconds, you would use:
>```JS
>const myClock = new SpeakingClock({
>  interval: UNITS.SECOND * 30,
>});
>```

You can make an instance tell the time at any moment by calling its method `tellTime()`, or mute and unmute it using its methods `mute()` and `unmute()`.