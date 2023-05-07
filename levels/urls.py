from django.urls import path

from levels.views import LevelList

urlpatterns = [
    path('', LevelList.as_view(), name='level_list_create'),
]
