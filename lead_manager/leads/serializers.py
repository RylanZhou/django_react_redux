from rest_framework import serializers
from leads.models import Lead


# Lead Serializer

class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lead
        # Use every field in Lead
        fields = '__all__'
