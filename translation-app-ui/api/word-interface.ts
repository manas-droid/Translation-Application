type AudioLink = {
    url: string;
    lang: string;
  };
  
  type Translation = {
    featured: boolean;
    text: string;
    pos: string;
    audio_links: AudioLink[];
    examples?: { src: string; dst: string }[]; // Optional as not all translations have examples
    usage_frequency?: string | null; // Optional as some translations may not have usage frequency
  };
  
  export default interface Word {
    featured: boolean;
    text: string;
    pos: string;
    forms: string[];
    audio_links: AudioLink[];
    translations: Translation[];
  };
  