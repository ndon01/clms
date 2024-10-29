import os
import re
import sys
from youtube_transcript_api import YouTubeTranscriptApi
from youtube_transcript_api.formatters import TextFormatter
import google.generativeai as genai

# Function to extract the video ID from the YouTube URL
def extract_video_id(youtube_url):
    regex = r"(?:https?://)?(?:www\.)?(?:youtube\.com/(?:[^/]+/|(?:v|e(?:mbed)?)|.*[?&]v=)|youtu\.be/)([a-zA-Z0-9_-]{11})"
    match = re.match(regex, youtube_url)
    return match.group(1) if match else None

# Function to fetch YouTube transcript
def get_youtube_transcript(video_id):
    try:
        # Fetch and format the transcript
        transcript = YouTubeTranscriptApi.get_transcript(video_id)
        formatter = TextFormatter()
        formatted_text = formatter.format_transcript(transcript)
        return formatted_text
    except Exception as e:
        return f"Error: {e}"

# Function to send transcript for question generation
def generate_questions_from_transcript(video_id, chat_session):
    # Get the transcript
    transcript = get_youtube_transcript(video_id)

    if "Error" in transcript:
        print(transcript)
        return

    # Prepare the prompt with the transcript
    default_question = f"""Please create a question set based on this video transcript:
    {transcript}
    Questions and answers should be in this format as a json object.

    export type Answer = {{
      text: string;
      isCorrect: boolean;
      order: number;
    }}

    export type AnswerProjection = Partial<Answer>;

    export type Question = {{
      title: string;
      question: string;
      questionType: 'single-choice' | 'multiple-choice';
      answers: AnswerProjection[];
      keepAnswersOrdered: boolean;
      order: number;
    }}

    export type QuestionProjection = Partial<Question>;

    put all the question projections you make in this questions array
    {{
      questions: []
    }}
    """

    # Send the prompt to chat session
    response = chat_session.send_message(default_question)
    clean_response = response.text.strip().replace("```json", "").replace("```", "").strip()
    return clean_response

def main():
    # Get API key and YouTube URL from command line arguments
    if len(sys.argv) != 3:
        print("Usage: python youtube_question_generator.py <YouTube URL> <Gemini API Key>")
        sys.exit(1)

    youtube_url = sys.argv[1]
    gemini_api_key = sys.argv[2]

    # Extract video ID from the provided YouTube URL
    video_id = extract_video_id(youtube_url)
    if not video_id:
        print("Error: Invalid YouTube URL.")
        sys.exit(1)

    # Configure the Gemini model
    genai.configure(api_key=gemini_api_key)
    generation_config = {
        "temperature": 1,
        "top_p": 0.95,
        "max_output_tokens": 8192,
        "response_mime_type": "text/plain",
    }

    model = genai.GenerativeModel(
        model_name='models/gemini-1.5-flash-8b-latest',
        generation_config=generation_config,
    )

    chat_session = model.start_chat()

    # Generate questions from the YouTube video transcript
    response = generate_questions_from_transcript(video_id, chat_session)

    # Print the generated questions
    print(response)

if __name__ == "__main__":
    main()
