from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import UsuarioLogadoView, RegisterView, UserPostsView, FeedPostsView, PostDetailView

urlpatterns = [
    # path('api/usuario', UsuarioLogadoView.as_view(), name='api_usuario')
    path("api/auth/register", RegisterView.as_view(), name="api_register_user"),
    path("api/user/<int:id>", UsuarioLogadoView.as_view(), name="api_user_data"),
    path("api/users/post", UserPostsView.as_view(), name="api_user_post"),
    path('api/posts', FeedPostsView.as_view(), name='feed-posts'),
    path('api/posts/<int:id>/', PostDetailView.as_view(), name='post-detail'),
]
