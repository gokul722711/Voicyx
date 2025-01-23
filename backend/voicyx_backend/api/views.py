from django.shortcuts import render  # Only needed if you plan to render templates
import requests
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt  # Add this if you're handling external POST requests and need to bypass CSRF protection
def process_user_input(request):
    if request.method == 'POST':
        try:
            # Get user input from the request body
            data = json.loads(request.body)
            user_input = data.get('user_input')

            if user_input:
                # Prepare the payload for the LLaMA API
                payload = {
                    "model": "meta/llama-3.1-405b-instruct",
                    "messages": [{"role": "user", "content": user_input}],
                    "temperature": 0.2,
                    "top_p": 0.7,
                    "max_tokens": 1024,
                    "stream": False
                }

                # Call the NVIDIA LLaMA model API
                response = requests.post(
                    'https://integrate.api.nvidia.com/v1/chat/completions',
                    headers={'Authorization': f'Bearer "Your_api_key"'},
                    json=payload
                )

                # Parse the response from LLaMA API
                if response.status_code == 200:
                    result = response.json()
                    model_response = result['choices'][0]['message']['content']
                else:
                    model_response = "Sorry, I couldn't understand that."

                # Return the model response as JSON
                return JsonResponse({'response': model_response})

            else:
                return JsonResponse({'error': 'No input received'}, status=400)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)
