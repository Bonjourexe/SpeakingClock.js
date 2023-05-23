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
 * @param {boolean} options.tellDate Whether the clock will only tell the time or both the date and time. Defaults to true.
 */
function SpeakingClock(options) {
    options = Object.assign({
        voice: null,
        volume: 1,
        pitch: 1,
        rate: 1,
        lang: navigator.language,
        interval: UNITS.MINUTE,
        tellDate: false
    }, options);

    let utterance = new SpeechSynthesisUtterance();
    utterance.voice = options.voice;
    utterance.volume = options.volume;
    utterance.pitch = options.pitch;
    utterance.rate = options.rate;
    utterance.lang = options.lang;

    /**
     * Gets the current options of the instance
     * @returns {Object} Current options.
     */
    this.getOptions = () => ({ ...options });

    /**
     * Gets the current time and utters in the instance's language
     */
    this.tellTime = () => {
        if (options.tellDate) utterance.text = new Date().toLocaleString(options.lang);
        else utterance.text = new Date().toLocaleTimeString(options.lang);
        console.log(utterance);
        window.speechSynthesis.speak(utterance);
    }

    let instanceInterval;

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

    /**
     * Sets the voice's volume
     */
    this.setVolume = (volume) => {
        utterance.volume = volume;
    }

    /**
     * Sets the instance's interval between announcements
     */
    this.setInterval = (interval) => {
        options.interval = interval;
        this.start();
    }

    /**
     * Removes the instance's interval
     */
    this.stop = () => {
        clearInterval(instanceInterval);
    }

    /**
     * Resets the instance's interval
     */
    this.start = () => {
        this.stop();
        instanceInterval = setInterval(this.tellTime, options.interval);
    }
}