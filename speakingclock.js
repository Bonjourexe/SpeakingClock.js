/**
 * Defines time units in milliseconds
 */
const UNITS = Object.freeze({
    "SECOND": 1000,
    "MINUTE": 1000 * 60,
    "HOUR": 1000 * 60 * 60,
    "DAY": 1000 * 60 * 60 * 24
});

/**
 * A class that announces the time at regular intervals using the SpeechSynthesis API
 * @constructor
 * @param {Object} options Optional configuration for the speaking clock.
 * @param {SpeechSynthesisVoice} options.voice The voice to use for speech synthesis.
 * @param {number} options.volume The volume to use for speech synthesis. Must be between 0 and 1.
 * @param {number} options.pitch The pitch to use for speech synthesis. Must be between 0 and 2.
 * @param {number} options.rate The rate to use for speech synthesis. Must be between 0.1 and 10.
 * @param {string} options.lang The language to use for speech synthesis. Must be a valid BCP 47 language tag. If not provided, defaults to the language of the user's browser.
 * @param {number} options.interval The time interval between announcements, in milliseconds. Defaults to 1 minute.
 */
function SpeakingClock(options) {
    options = Object.assign({
        voice: null,
        volume: 1,
        pitch: 1,
        rate: 1,
        lang: navigator.language,
        interval: UNITS.MINUTE
    }, options);

    let utterance = new SpeechSynthesisUtterance();
    utterance.voice = options.voice;
    utterance.volume = options.volume;
    utterance.pitch = options.pitch;
    utterance.rate = options.rate;
    utterance.lang = options.lang;

    /**
     * Gets the current time and utters in the instance's language
     */
    this.tellTime = () => {
        utterance.text = new Date().toLocaleString(options.lang);
        console.log(utterance);
        window.speechSynthesis.speak(utterance);
    }

    let interval = setInterval(this.tellTime, options.interval);

    /**
     * Sets the voice's volume to zero
     */
    this.mute = () => {
        utterance.volume = 0;
    }

    /**
     * Sets the voice's volume back to the instance's volume setting
     */
    this.unmute = () => {
        utterance.volume = options.volume;
    }
}
