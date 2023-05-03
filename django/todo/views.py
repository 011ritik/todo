from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Todo
from .serializers import TodoSerializer

# Create your views here.


@api_view(['GET'])
def endpoints(request):
    endpoints = {
        "endpoints": "http://localhost:8000/endpoints",
        "index": "http://localhost:8000",
        "create": "http://localhost:8000/create",
        "update": "http://localhost:8000/update/<int:pk>",
        "delete": "http://localhost:8000/delete/<int:pk>",
        }
    return Response(endpoints)


@api_view(['GET'])
def index(request):
    content = Todo.objects.all()
    serailzer = TodoSerializer(content, many=True)

    return Response({
        'status': 200,
        'task': serailzer.data,
        'message': 'This is serailized data.'
    })


@api_view(['POST'])
def create(request):
    data = request.data
    serailizer = TodoSerializer(data=data)

    if not serailizer.is_valid():
        error = serailizer.errors
        return Response({
            'status': 403,
            'error': error,
        })

    serailizer.save()
    return Response({
        'status': 200,
        'task': serailizer.data,
        'message': 'Task added!'
    })


@api_view(['DELETE'])
def delete(request, id):
    try:
        task = Todo.objects.get(id=id)
        task.delete()
        return Response({'status': 200, 'message': 'Task deleted!'})

    except Exception as e:
        print(e)
        return Response({'status': 403, 'message': 'Invalid ID'})


@api_view(['PATCH'])
def update(request, id):
    try:
        task = Todo.objects.get(id=id)
        serializer = TodoSerializer(task, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response({'status': 200, 'updated_data': serializer.data, 'message': 'updated'})

    except Exception as e:
        print(e)
        return Response({'status': 403, 'message': 'Invalid ID'})
