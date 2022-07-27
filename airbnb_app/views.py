from importlib.resources import contents
from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, Http404
from rest_framework import viewsets
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView
from .serializers import BookingSerializer, CitySerializer,PaymentSerializer, PropertySerializer, PropertyImagesSerializer
from .models import *
# from amenities.models import *
from rest_framework.decorators import api_view
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics

# Create your views here.
def main(request):
    return HttpResponse("<h1>Airbnb Django app</h1>")

# @api_view(['POST'])
class PaymentsView(viewsets.ModelViewSet):
    # permission_classes = [IsAdminUser]
    serializer_class = PaymentSerializer
    queryset = Payment.objects.all()

class BookingsView(viewsets.ModelViewSet):
    # permission_classes = [IsAdminUser]
    serializer_class = BookingSerializer
    queryset = Booking.objects.all()

    def delete(self, request, id, format=None):
        booking = self.get_object(id)
        booking.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    

class BookingDetail(APIView):
    def get_object(self, id):
        try:
            return Booking.objects.get(id=id)
        except Booking.DoesNotExist:
            raise Http404

    def get(self, request, id, format=None):
        booking = self.get_object(id)
        serializer = BookingSerializer(booking)
        return Response(serializer.data)


    def delete(self, request, id, format=None):
        booking = self.get_object(id)
        booking.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class BookingCreateAPIView(CreateAPIView):
    permission_classes= [IsAuthenticated]
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer

    def perform_create(self, serializer):
        # user = self.request.user
        property = get_object_or_404(Property, pk= self.kwargs['pk'])
        serializer.save(user=self.request.user,property=property)

    # def get_queryset(self):
    #     user = self.request.user
    #     account = User.objects.get(id=user.id)
    #     queryset = Booking.objects.filter(user=account)
    #     return queryset


# class BookingList(viewsets.ModelViewSet):
#     model = Booking
#     serializer_class = BookingSerializer
    

    # def get_queryset(self):
    #     """
    #     This view should return a list of all the purchases for
    #     the user as determined by the username portion of the URL.
    #     """
    #     user = self.kwargs['user']
    #     return Booking.objects.filter(user=user)

    # def get_queryset(self):
        # user = self.request.user
        # account = User.objects.get(id=user.id)
        # queryset = Booking.objects.filter(user=account)
        # return queryset

class BookingList(generics.ListCreateAPIView):
    serializer_class = BookingSerializer

    # def get_queryset(self):
    #     user = self.request.user
    #     account = User.objects.get(id=user.id)
    #     queryset = Booking.objects.filter(user=account)
    #     return queryset

    def get_queryset(self):
        """
        This view should return a list of all the purchases for
        the user as determined by the username portion of the URL.
        """
        user = self.kwargs['user']
        return Booking.objects.filter(user=user)

    # def get_queryset(self):
    #     queryset = self.queryset
    #     query_set = queryset.filter(user=self.request.user)
    #     return query_set

# class BookingCreateApiView(CreateAPIView):
#     permission_classes = (IsAuthenticated, )
#     serializer_class = BookingSerializer
#     queryset = Booking.objects.all()

#     def create(self, request, *args, **kwargs):
#         response = {}
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         self.perform_create(serializer)
#         headers = self.get_success_headers(serializer.data)
#         response['data'] = serializer.data
#         response['response'] = "Room is successfully booked"
#         return Response(response, status=status.HTTP_201_CREATED, headers=headers)

#     def post(self, request, *args, **kwargs):
#         property = get_object_or_404(Property, pk=request.data['property'])
#         property.save()
#         return self.create(request, *args, **kwargs)

class CitiesView(viewsets.ModelViewSet):
    serializer_class = CitySerializer
    queryset = City.objects.all()

class PropertiesView(viewsets.ModelViewSet):
    serializer_class = PropertySerializer
    queryset = Property.objects.all()

class PropertyImagesView(viewsets.ModelViewSet):
    serializer_class = PropertyImagesSerializer
    queryset = PropertyImages.objects.all()

class CitiesAPIView(APIView):

    renderer_classes = [JSONRenderer]

    def get(self, request, format=None):
        cities = City.objects.all()
        serializer = CitySerializer(cities, many=True)
        return Response(serializer.data)

