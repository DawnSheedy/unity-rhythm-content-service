from levels.models import Level, Chart, ChartEvent
from rest_framework import serializers


class ChartEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChartEvent


class ChartSerializer(serializers.ModelSerializer):
    events = ChartEventSerializer()

    class Meta:
        model = Chart


class LevelSerializer(serializers.ModelSerializer):
    charts = ChartSerializer()

    class Meta:
        model = Level
