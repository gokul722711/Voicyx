import os
import requests
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def process_user_input(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            user_input = data.get('user_input')

            if user_input:
                payload = {
                    "model": "meta/llama-3.1-405b-instruct",
                    "messages": [{"role": "user", "content": user_input}],
                    "temperature": 0.2,
                    "top_p": 0.7,
                    "max_tokens": 1024,
                    "stream": False
                }

                response = requests.post(
                    "https://integrate.api.nvidia.com/v1/chat/completions",
                    headers={
                        "Authorization": f"Bearer {os.getenv('NVIDIA_API_KEY')}",
                        "Content-Type": "application/json"
                    },
                    json=payload
                )

                if response.status_code == 200:
                    result = response.json()
                    model_response = result["choices"][0]["message"]["content"]
                else:
                    model_response = "Sorry, I couldn't understand that."

                return JsonResponse({"response": model_response})

            return JsonResponse({"error": "No input received"}, status=400)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=405)

