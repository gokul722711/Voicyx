from django.urls import path
from . import views

urlpatterns = [
    path('process-input/', views.process_user_input, name='process_input'),  # Use the correct function name
]
