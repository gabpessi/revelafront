from rest_framework.parsers import MultiPartParser, FormParser

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status

from django.shortcuts import get_object_or_404
from django.db.models import Q

from django.contrib.auth.models import User
from .serializers import UserSerializer, RegisterSerializer, PostSerializer, ConversationSerializer, MessageSerializer
from .models import Post, Conversation, Message


class UsuarioLogadoView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def put(self, request):
        user = request.user
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    
    
class UsersView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        
        if not User.objects.filter(username="admin").exists():
            user = User.objects.create_superuser("admin", "admin@gmail.com", "senha123")
            user.save()


        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data,  status=status.HTTP_200_OK)
class RegisterView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': "Usuário criado"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class UserPostsView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        user = request.user
        posts = Post.objects.filter(user=user)
        serializer = PostSerializer(posts, many=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)


#GET /api/posts - Obter todos os posts do feed
class FeedPostsView(APIView):
    permission_classes = [AllowAny]  #IsAuthenticated privado. ou [AllowAny] se feed público

    def get(self, request):
        posts = Post.objects.all().order_by('-created_at')
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

#GET /api/posts/:id - Obter detalhes de um post específico
class PostDetailView(APIView):
    permission_classes = [AllowAny]  

    def get(self, request, id):
        post = get_object_or_404(Post, id=id)
        serializer = PostSerializer(post)
        return Response(serializer.data, status=status.HTTP_200_OK)

#DELETE /api/posts/:id - Excluir um post específico
    def delete(self, request, id):
        post = get_object_or_404(Post, id=id)
        if post.user != request.user:
            return Response({"detail": "Você não tem permissão para excluir este post."}, status=status.HTTP_403_FORBIDDEN)
        post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

#POST /api/posts - Criar um novo post
class CreatePostView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]  #upload de imagem

    def post(self, request):
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)  #define o autor do post
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
#/api/conversations - obter todas as conversas / criar nova conversa
class ConversationListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        # conversations = Conversation.objects.filter(Q(user1=user) | Q(user2=user))
        conversations = Conversation.objects.filter(Q(user1=user) | Q(user2=user))
        serializer = ConversationSerializer(conversations, many=True)
        return Response(serializer.data)

    def post(self, request):
        target_user_id = request.data.get('user_id')
        if not target_user_id:
            return Response({"error": "campo user_id é obrigatório"}, status=400)

        if int(target_user_id) == request.user.id:
            return Response({"error": "Não pode iniciar conversa consigo mesmo."}, status=400)

        try:
            target_user = User.objects.get(id=target_user_id)
        except User.DoesNotExist:
            return Response({"error": "Usuário não encontrado."}, status=404)

        # Verifica se ja existe conversa entre os dois
        existing = Conversation.objects.filter(
            Q(user1=request.user, user2=target_user) |
            Q(user1=target_user, user2=request.user)
        ).first()

        if existing:
            return Response(ConversationSerializer(existing).data)

        # Cria nova conversa
        conversation = Conversation.objects.create(user1=request.user, user2=target_user)
        return Response(ConversationSerializer(conversation).data, status=201)
    
# api/conversations/pk - pega dados de uma conversa
class ConversationDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id):
        conversation = get_object_or_404(Conversation, id=id)
        serializer = ConversationSerializer(conversation)
        return Response(serializer.data)
    
class MessageListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id):
        print("requsição recebida")
        conversation = get_object_or_404(Conversation, id=id)
        messages = conversation.messages.all().order_by('timestamp')
        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data)

    def post(self, request, id):
        conversation = get_object_or_404(Conversation, id=id)
        serializer = MessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(sender=request.user, conversation=conversation)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)