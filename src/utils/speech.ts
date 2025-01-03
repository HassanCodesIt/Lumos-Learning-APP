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

  // Step-by-step interaction text with natural pauses
  utterance.text = `This is ${letter.toUpperCase()}. `;
  utterance.text += `Can you say ${letter.toUpperCase()}? `;
  utterance.text += `Now, let's learn a word that starts with ${letter.toUpperCase()}. `;
  utterance.text += `It is ${word}. `;
  utterance.text += `Can you say ${word}? `;
  utterance.text += `Great job! Let's say ${word} again, together.`;

  // Adjust voice properties for clarity, slowness, and naturalness
  utterance.rate = 0.45; // Slow rate for clarity and to allow students time to say it
  utterance.pitch = 1.1; // A friendly, natural pitch (not too high or low)
  utterance.volume = 1; // Full volume for clear speech
  utterance.lang = "en-US"; // English language

  // Function to set the voice
  const setFemaleVoice = () => {
    const voices = window.speechSynthesis.getVoices();

    // Attempt to find a female voice with a natural tone
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
