# from email import message
# from tabnanny import verbose
from django.db import models
import uuid
# from django.forms import SlugField
from accounts.models import *

# TESTING with coverage

# Create your models here.
# class booking: check-in, check-out, no of beds, no. of guests
# keywords for filtering apts
# Filters
# To Property, add map location
# Add Local Time ie UK Time

# GUESTS
# Maximum of 2 guests not including infants, no pets allowed(except service pets)
    # Adults (Age 13+) = no
    # Children (Age 2-12) = number of guests
    # Infants (Under 2) = number of guests
    # Pets

# bed bedroom bath

# Create choices here
PROPERTY_TYPE_CHOICES = [
    ('S', 'Studio'),
    ('F', 'Flat'),
    ('H', 'House')
]


# Create models here.
# --------------------- PROPERTY RELATED -------------------------

class Amenity(models.Model):
    amenity = models.CharField(max_length=250)

    class Meta:
        verbose_name_plural = 'Amenities'

    def __str__(self):
        return self.amenity

class HouseRules(models.Model):
    house_rule = models.CharField(max_length=1000)

    class Meta:
        verbose_name_plural = 'House Rules'

    def __str__(self):
        return self.house_rule


class City(models.Model):
    city = models.CharField(max_length=50)
    slug = models.SlugField(max_length=250,unique=True, null=True)

    class Meta:
        verbose_name_plural = 'Cities'
        ordering = ['id']

    def __str__(self):
        return self.city

class Contact(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default="", null=True)
    subject = models.CharField(max_length=255)
    message = models.TextField()

    class Meta:
        verbose_name_plural = "Contact"
        ordering = ['user']
    
    def __str__(self):
        return self.user.email


class Highlights(models.Model):
    # apt-hightlights/ Highlights: 1 Bed, 2Bed, 2Guest, 2bath/ Bedrooms: 2, Double Beds:1, Single Beds:2,capcity: 5, size(m2):20
    highlight = models.CharField(max_length=100, null=True, blank=True)

    class Meta:
        verbose_name_plural = 'Highlights'

    def __str__(self):
        return self.highlight
    


class PropertyManager(models.Manager):
    def get_queryset(self):
        return super(PropertyManager, self).get_queryset().filter(is_available = True)


class PropertyCategory(models.Model):
    title = models.CharField(max_length=10)

    class Meta:
        verbose_name_plural = 'Property Categories'
    
    def __str__(self):
        return self.title


# price : £100.00 per day
class Property(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, unique=True, editable=False) 
    city = models.ForeignKey(City, on_delete=models.CASCADE)
    type = models.ForeignKey(PropertyCategory, on_delete=models.CASCADE, related_name='properties')
    image = models.FileField(blank=True, upload_to="images/properties")
    title = models.CharField(max_length=1000)
    slug = models.SlugField(max_length=250,unique=True, null=True)
    description = models.TextField(blank=True, null=True)
    location = models.TextField()
    highlights = models.ManyToManyField(Highlights, blank=True)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    discount = models.DecimalField(max_digits=6, decimal_places=2)
    service_charge = models.DecimalField(max_digits=6, decimal_places=2)
    min_days = models.IntegerField(default=1)
    max_guests = models.IntegerField(default=1)
    date_added = models.DateTimeField(auto_now=False,auto_now_add=True)
    is_available = models.BooleanField(default=True)

    bed = models.IntegerField(default=1)
    bedroom = models.IntegerField(default=1)
    bath = models.IntegerField(default=1)
    amenity = models.ManyToManyField(Amenity, blank=True)
    house_rule = models.ManyToManyField(HouseRules, blank=True)

    class Meta:
        # ordering = ('id',)
        verbose_name_plural = 'Properties'
    
    def __str__(self):
        return self.title


class InsidePropertyImages(models.Model):
    property = models.ForeignKey(Property,default=None, on_delete=models.CASCADE)
    inside_images = models.FileField(upload_to="images/properties")

    class Meta:
        verbose_name_plural = 'Inside Property Images'

    def __str__(self):
        return self.property.title

class PropertyImages(models.Model):
    property = models.ForeignKey(Property,default=None, on_delete=models.CASCADE)
    images = models.FileField(upload_to="images/properties")

    class Meta:
        verbose_name_plural = 'Property Images'

    def __str__(self):
        return self.property.title
    
# ---------------- END OF PROPERTY RELATED ------------------------





# ------------------------ BOOKING --------------------------------
class Booking(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, default="", null=True)
    property = models.ForeignKey(Property, on_delete=models.CASCADE, default="", null=True)
    check_in = models.DateField()
    check_out = models.DateField()
    guests = models.IntegerField(default=1)
    # arrival_time = models.TimeField(auto_now_add=True)
    booking_date = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    reserved = models.BooleanField(default=False)
    is_checked_in = models.BooleanField(default=False)
    is_checked_out = models.BooleanField(default=False)
    is_cancelled = models.BooleanField(default=False)
    

    class Meta:
        verbose_name_plural = 'Bookings'

    def __str__(self):
        return "{} - {}".format(self.user.email,self.property.title)

    def get_property_image(self):
        return self.property.image.url

    def get_property_title(self):
        return self.property.title

    def get_property_price(self):
        return self.property.price

    def date_diff(self):
        days =  (self.check_out - self.check_in).days
        return days

    def get_total(self):
        total = self.property.price * self.date_diff()
        return total
# ----------------------- END OF BOOKING --------------------------

# -----------------------  PAYMENT --------------------------
class Payment(models.Model):
    # Choices: Succesful and unsuccessful
    user = models.ForeignKey(User, on_delete=models.CASCADE, default="", null=True)
    booking = models.ForeignKey(Booking, on_delete=models.CASCADE, default="", null=True)
    total_amount = models.FloatField()
    date_paid = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "Payment for {} by {}".format(self.booking.property.title,self.user.email)

# ----------------------- END OF PAYMRNY --------------------------



# -------------------------- REVIEWS -----------------------------
class Reviews(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default="", null=True)
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    created_at = models.DateField(auto_now_add=True)
    title = models.CharField(max_length=150, default='')
    review = models.TextField()

    class Meta:
        verbose_name_plural = 'Reviews'

    def __str__(self):
        return self.user.email
# ----------------------- END OF REVIEWS -----------------------
