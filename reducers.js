// ── Action Types ──────────────────────────────────────────────
export const FILTER_PROJECTS = "FILTER_PROJECTS";
export const ADD_MESSAGE = "ADD_MESSAGE";

// ── Initial State ─────────────────────────────────────────────
const initialState = {
  projects: [
    {
      id: 1,
      title: "Sign Language Translator",
      description:
        "A deep learning system that recognizes hand gestures in real-time and translates them into text. Built to bridge communication gaps for people with hearing impairments using CNN and computer vision.",
      tech: ["Python", "TensorFlow", "MediaPipe", "OpenCV", "CNN", "Flask"],
      badge: "Featured",
      icon: "🤟",
      detail:
        "Used MediaPipe for hand tracking, implemented CNN for gesture classification, and created a Flask interface to translate sign language into text in real-time. Achieved ~92% accuracy on the test dataset.",
    },
    {
      id: 2,
      title: "Mini Portfolio Website",
      description:
        "A React-based portfolio with Redux state management, dark/light theme toggle, and multiple pages including a contact form with validation.",
      tech: ["React", "Redux", "React Router", "CSS"],
      badge: "Web",
      icon: "💻",
      detail:
        "Built with React Router for navigation, Redux for global state, custom useLocalStorage hook for theme persistence, and controlled form components with full validation.",
    },
    {
      id: 3,
      title: "ML Gesture Classifier",
      description:
        "A convolutional neural network trained to classify 26 ASL hand gestures with high accuracy using a custom dataset built with OpenCV.",
      tech: ["Python", "TensorFlow", "OpenCV", "Jupyter", "NumPy"],
      badge: "ML",
      icon: "🧠",
      detail:
        "Collected and labelled 3,000+ images across 26 ASL gesture classes. Used data augmentation to improve generalization. Exported model as TFLite for mobile deployment.",
    },
  ],
  filter: "",
  messages: [],
};

// ── Root Reducer ──────────────────────────────────────────────
function rootReducer(state = initialState, action) {
  switch (action.type) {
    case FILTER_PROJECTS:
      return { ...state, filter: action.payload };

    case ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };

    default:
      return state;
  }
}

export default rootReducer;
