from django.http import response
from django.http.response import HttpResponseRedirect
from django.shortcuts import render

from hospital.forms import LocationForm
from hospital.models import Location
from .apis import get_details, get_hospital

# Create your views here.

def index(request):
    form = LocationForm(request.POST or None)
    response = {'form': form}
    if (form.is_valid and request.method == 'POST'):
        form.save()
        return HttpResponseRedirect('/hospital/results')
    return render(request, 'location_forms.html', response)

def results(request):
    alamat = Location.objects.order_by('-id')[0]
    hosp_list = get_hospital(alamat.location)
    res = get_details(hosp_list)
    data = zip(res[0], res[1])
    response = {'data':data}
    # return HttpResponse(business_list, content_type="application/json")
    return render(request, 'hospital_results.html', response)

def search_history(request):
    alamat = Location.objects.all().values()
    response = {'shistories':alamat}
    # return HttpResponse(business_list, content_type="application/json")
    return render(request, 'search_history.html', response)