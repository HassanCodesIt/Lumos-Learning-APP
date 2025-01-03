export const speakLetter = (letter: string) => {
  const utterance = new SpeechSynthesisUtterance();

  // Define a mapping of letters to words
  const letterWords: Record<string, string> = {
    A: "Apple",
    B: "Ball",
    C: "Cat",
    D: "Dog",
    E: "Elephant",
    F: "Fish",
    G: "Goat",
    H: "Hat",
    I: "Ice cream",
    J: "Jug",
    K: "Kite",
    L: "Lion",
    M: "Monkey",
    N: "Nest",
    O: "Orange",
    P: "Parrot",
    Q: "Queen",
    R: "Rabbit",
    S: "Sun",
    T: "Tiger",
    U: "Umbrella",
    V: "Violin",
    W: "Whale",
    X: "Xylophone",
    Y: "Yak",
    Z: "Zebra",
  };

  // Get the word for the letter
  const word = letterWords[letter.toUpperCase()] || "Unknown";

  // Set the speech content with rhyme-like cadence
  utterance.text = `${letter.toUpperCase()} for ${word}. Let's say it again!`;

  // Adjust voice properties for clarity and cheerfulness
  utterance.rate = 0.9; // Slightly slower for clarity
  utterance.pitch = 1.4; // Cheerful, higher pitch
  utterance.volume = 1; // Full volume
  utterance.lang = "en-US"; // English language

  // Function to set the voice
  const setFemaleVoice = () => {
    const voices = window.speechSynthesis.getVoices();

    // Attempt to find a female voice
    const femaleVoice = voices.find((voice) =>
      ["female", "samantha", "zira", "google uk english female", "google us english"].some((keyword) =>
        voice.name.toLowerCase().includes(keyword)
      )
    );

    // Fallback to the first available voice if no female voice is found
    utterance.voice = femaleVoice || voices[0];

    // Speak the text
    window.speechSynthesis.speak(utterance);
  };

  // Check if voices are already loaded
  if (window.speechSynthesis.getVoices().length > 0) {
    setFemaleVoice();
  } else {
    // Wait for the voices to be loaded
    window.speechSynthesis.onvoiceschanged = setFemaleVoice;
  }
};