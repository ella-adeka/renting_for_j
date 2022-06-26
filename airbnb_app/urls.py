"""john_airbnb URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.urls import path
from .views import *


urlpatterns = [
    path('', main),
    path('home', main),
    path('cities', CitiesAPIView.as_view()),
    # path('booking/<user>', BookingList.as_view()),
    path('booking/detail/<int:id>', BookingDetail.as_view()),
    path('booking/<int:user>', BookingList.as_view()),
    path('book/', BookingCreateAPIView.as_view()),
]
