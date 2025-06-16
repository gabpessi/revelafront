from django.contrib.auth.models import User
from rest_framework import serializers
from .models import UserProfile, Post
  
class UserSerializer(serializers.ModelSerializer):
    #campo adicional profile para retornar informações complementares do usuario
    profile = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = ["id", "username", "email", "first_name", "last_name", "profile"]

    #campo adicional profile
    def get_profile(self, user):
        try:
            return UserProfileSerializer(user.profile).data
        except:
            return None
        
    #método update personalizado pra cobrir userprofile tambem
    def update(self, instance, validated_data):
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.email = validated_data.get('email', instance.email)
        instance.save()

        
        profile_data = validated_data.get('profile', {})
        profile = instance.profile

        if profile_data:
            profile.sobre = profile_data.get('sobre', profile.sobre)
            profile.facebook = profile_data.get('facebook', profile.facebook)
            profile.instagram = profile_data.get('instagram', profile.instagram)
            profile.linkedin = profile_data.get('linkedin', profile.linkedin)
            profile.save()

        return instance
    
class UserProfileSerializer(serializers.ModelSerializer):
    #campo adicional de amigos do usuario
    amigos = serializers.SerializerMethodField()
    
    class Meta:
        model = UserProfile
        fields = ['imagem', 'sobre', 'facebook', 'instagram', 'linkedin', 'amigos']
    
    #retorna os amigos
    def get_amigos(Self, obj):
        return [
            {
                "id": amigo.user.id,
                "username": amigo.user.username,
                "imagem": amigo.imagem.url if amigo.imagem else None
            }
            for amigo in obj.amigos.all()
        ]
        
    
        
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(writte_only=True, required=True)
    password2 = serializers.CharField(writte_only=True, required=True)
    
    def validade(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError('Senhas devem ser iguais')
    
        if User.objects.filter(username=data['username']).exists():
            raise serializers.ValidationError("Este nome de usuário já está em uso.")

        if User.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError("Este email já está em uso.")
    
        if len(data['username']) < 2:
            raise serializers.ValidationError("Nome de usuário deve ter pelo menos 2 caracteres")

        if "@" not in  data['email'] or '.com' not in data['email']:
            raise serializers.ValidationError("Email inválido")
    
    def create(self, data):
        data.pop('password2')
        user = User.objects.create_user(username=data['username'], email=data['email'], password=data['password'])
        
        profile = UserProfile.objects.create(user=user)
        profile.save()
        return user
    
    
class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'imagem', 'text']