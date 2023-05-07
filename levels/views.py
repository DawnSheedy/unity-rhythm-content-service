from django.shortcuts import render
from rest_framework import generics

from levels.models import Level
from levels.serializers import LevelSerializer
from rest_framework import permissions

# Create your views here.


class LevelList(generics.ListCreateAPIView):
    queryset = Level.objects.all()
    serializer_class = LevelSerializer
    permission_classes = [permissions.IsAuthenticated]
