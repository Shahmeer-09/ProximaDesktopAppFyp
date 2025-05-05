import sys
import whisper
import gc
import torch
import sys
sys.setdefaultencoding('utf-8')  # Add this line if it's available in your Python version

def transcribe_audio(file_path):
    # Free up memory
    gc.collect()
    torch.cuda.empty_cache() if torch.cuda.is_available() else None
    
    try:
        # Use tiny model to reduce memory requirements
        model = whisper.load_model("tiny")
        
        # Transcribe the audio file with lower memory settings
        result = model.transcribe(file_path, fp16=False)
        
        # Free up memory
        del model
        gc.collect()
        
        # Print the transcription text so it can be captured by stdout
        print(result["text"])
        return result["text"]
    except Exception as e:
        print(f"Error during transcription: {str(e)}", file=sys.stderr)
        return ""

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python transcribe.py <audio_file_path>", file=sys.stderr)
        sys.exit(1)
    
    file_path = sys.argv[1]
    transcribe_audio(file_path)