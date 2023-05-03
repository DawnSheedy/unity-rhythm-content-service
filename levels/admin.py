from django.contrib import admin

from levels.models import Chart, ChartEvent, Level

admin.site.register(Level)
admin.site.register(Chart)
admin.site.register(ChartEvent)
