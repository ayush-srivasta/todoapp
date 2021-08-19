
from django.http import response
from django.http.response import Http404, HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from rest_framework import serializers
from .serializer import SerializerTodo
from .models import Todo
from django.urls import reverse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
# Create your views here.
@api_view(['GET'])
def Home(request):
    api_urls={
        'List':'/list',
        'Detail':'detail/<int:pk>',
        'Create':'/create',
        'Update':'/update/<int:pk>',
        'Delete':'/delete/<int:pk>',
    }
    return Response(api_urls)

@api_view(['GET'])    
def List(request):
    data=Todo.objects.all().order_by('-id')
    serializer=SerializerTodo(data,many=True)
    print(serializer.data)
    return Response(serializer.data)

@api_view(['GET'])   
def Detail(request,pk):
    try:
        obj=Todo.objects.get(pk=pk)
    except Todo.DoesNotExist:
        return Response(Http404)
    if request.method == 'GET':
       serializer=SerializerTodo(obj)
       return Response(serializer.data)

@api_view(['POST'])
def Create(request):
    serializer=SerializerTodo(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.error_messages,status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST','GET'])
def Update(request,pk):
    if request.method=='GET':
        serializers=SerializerTodo(Todo.objects.get(pk=pk))
        return Response(serializers.data)
    serializer=SerializerTodo(Todo.objects.get(pk=pk),data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.error_messages,status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def Delete(request,pk):
    obj=Todo.objects.get(pk=pk)
    obj.delete()
    return HttpResponseRedirect('http://127.0.0.1:8000/list/')
