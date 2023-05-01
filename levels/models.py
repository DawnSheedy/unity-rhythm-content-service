from django.db import models

# Create your models here.


class Level(models.Model):
    """
    Model representing an individual song
    """

    # meta
    uuid = models.UUIDField(verbose_name='UUID', primary_key=True)
    title = models.CharField(verbose_name='Title', max_length=100)
    artist = models.CharField(verbose_name='Artist', max_length=100)
    tempo = models.FloatField(verbose_name='Tempo (BPM)')
    length = models.IntegerField(verbose_name='Length (Ticks)')

    # resources
    banner_url = models.URLField(verbose_name='Banner Image URL', null=True)
    preview_url = models.URLField(
        verbose_name='Preview Snippet URL')
    song_url = models.URLField(verbose_name='Song Playback URL')


class Chart(models.Model):
    """
    Model representing a song difficulty option
    """

    class ChartDifficultyOptions(models.TextChoices):
        BSC = 'BSC', 'Basic'
        ADV = 'ADV', 'Advanced'
        EXT = 'EXT', 'Extreme'

    parent_level = models.ForeignKey(Level, on_delete=models.CASCADE, related_name='charts')
    difficulty = models.CharField(
        choices=ChartDifficultyOptions.choices, default=ChartDifficultyOptions.BSC, max_length=3)


class ChartEvent(models.Model):
    """
    Model representing an event in a song chart
    """

    class ChartEventTypes(models.TextChoices):
        NOTE = 'NOTE', 'Note'
        HOLD = 'HOLD', 'Hold'
        BEAT = 'BEAT', 'Beat'
        MSUR = 'MSUR', 'Measure'
        STOP = 'STOP', 'End'

    parent_chart = models.ForeignKey(Chart, on_delete=models.CASCADE, related_name='events')
    tick = models.IntegerField()
    type = models.CharField(choices=ChartEventTypes.choices,
                            default=ChartEventTypes.BEAT, max_length=4)
    detail = models.IntegerField()
