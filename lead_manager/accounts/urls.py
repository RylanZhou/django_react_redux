from django.urls import path, include
from .apis import RegisterAPI, LoginAPI, UserAPI
from knox import views as knox_views

urlpatterns = [
    # We have to get rid of 'knox.urls' because it clashes with our customized auth/login url.
    # path('api/auth', include('knox.urls')),
    path('api/auth/register/', RegisterAPI.as_view()),
    path('api/auth/login/', LoginAPI.as_view()),
    path('api/auth/user/', UserAPI.as_view()),
    path('api/auth/logout/', knox_views.LogoutView.as_view(), name='knox_logout')
]
