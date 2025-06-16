from django.db import models
from django.contrib.auth.models import User


class UserProfile(models.Model):
        user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
        imagem = models.ImageField(upload_to='user/profiles/%y/%m/%d', null=True, blank=True)
        sobre = models.CharField(max_length=150, null=True, blank=True)
        facebook = models.CharField(max_length=1000, null=True, blank=True)
        instagram = models.CharField(max_length=1000, null=True, blank=True)
        linkedin = models.CharField(max_length=1000, null=True, blank=True)
        amigos = models.ManyToManyField("self", symmetrical=True, blank=True)
        
#modelo básico de posts, atualizar depois
class Post(models.Model):
        user = models.ForeignKey(User, on_delete=models.CASCADE, name="post")
        imagem = models.ImageField(upload_to='user/posts/images/%y/%m/%d', null=True, blank=True)
        text = models.CharField(max_length=150, null=True, blank=True)
