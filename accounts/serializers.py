from dataclasses import field
from requests import request
from accounts.models import User, UserProfile, GENDER_CHOICES
# from accounts.models import User, UserProfile, GENDER_CHOICES
from django.db import transaction
from rest_framework import serializers
from dj_rest_auth.serializers import UserDetailsSerializer
from dj_rest_auth.registration.serializers import RegisterSerializer
from rest_framework_simplejwt.settings import api_settings
from rest_framework import  status
from rest_framework.response import Response
from django.contrib.auth import authenticate

User._meta.get_field('email')._unique = True


class UserProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserProfile
        # fields =  '__all__' 
        fields = [
            'avatar',
            'gender',
            'date_of_birth',
            'phone_number',
            'emergency_contact',
            'address'
        ]

    # def get(self, request, format=None):

    #     my_choices = []
    #     choice_dict = dict(GENDER_CHOICES)
    #     for key, value in choice_dict.items():

    #         itered_dict = {"key": key, "value": value}
    #         my_choices.append(itered_dict)
    #     return Response(my_choices, status=status.HTTP_200_OK)

    def update(self, instance, validated_data):
        # We try to get profile data
        user_profile_data = validated_data.pop('user_profile', None)
        # If we have one
        if user_profile_data is not None:
            # We set address, assuming that you always set address
            # if you provide user_profile
            instance.user_profile.address = user_profile_data['address']
            instance.user_profile.avatar = user_profile_data['avatar']
            instance.user_profile.date_of_birth = user_profile_data['date_of_birth']
            instance.user_profile.gender = user_profile_data['gender']
            instance.user_profile.emergency_contact = user_profile_data['emergency_contact']
            instance.user_profile.phone_number = user_profile_data['phone_number']
            # And save user_profile
            instance.user_profile.save()
        # Rest will be handled by DRF
        return super().update(instance, validated_data) 


class UserSerializer(serializers.ModelSerializer):

    user_profile = UserProfileSerializer(source='userprofile')

    class Meta:
        model = User
        fields = [
            'id',
            'email',
            'first_name',
            'last_name',
            'is_active',
            'is_staff',
            'created_at',
            'updated_at',
            'user_profile',
        ]
        read_only_field = [
            'is_active',
            'created_at',
            'updated_at'
        ]

    

class RegisterSerializer(serializers.ModelSerializer):
    username = None
    email = serializers.EmailField(required=True, write_only=True, max_length=128)
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)

    class Meta:
        model = User
        fields = ['id', 'email','first_name', 'last_name', 'password', 'is_active', 'created_at', 'updated_at']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            # validated_data['email'],
            # validated_data['first_name'],
            # validated_data['last_name'],
            # validated_data['password']
            email=self.validated_data['email'],
            first_name=self.validated_data['first_name'],
            last_name=self.validated_data['last_name'],
            password=self.validated_data['password']
        )
        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")


class UserRegisterSerializer(RegisterSerializer):
    username = None
    email = serializers.EmailField(required=True, write_only=True, max_length=128)
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    # avatar = serializers.ImageField(required=False, max_length=None,  allow_empty_file=True, use_url=True)

    class Meta:
        model = User
        fields = ['id', 'email','first_name', 'last_name', 'password', 'is_active', 'created_at', 'updated_at']


    @transaction.atomic
    def save(self, request):
        user = super().save(request)
        
        user.first_name = self.data.get('first_name')
        user.last_name = self.data.get('last_name')
        user.save()
        return user


class UserDetailsSerializer(UserDetailsSerializer):
    user_profile = UserProfileSerializer(source='userprofile')

    class Meta:
        model = User
        fields = UserDetailsSerializer.Meta.fields + ('user_profile',)
        # ]
        read_only_fields = ('id', 'is_active', 'created_at', 'updated_at' 'email', 'first_name', 'last_name')




class UserSerializerWithToken(serializers.ModelSerializer):

    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = User
        fields = ('token', 'email', 'password')