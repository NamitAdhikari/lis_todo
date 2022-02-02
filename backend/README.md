# TODO Backend

### To run the project backend
First, install Python (>3.6), and clone the repository, then install virtualenv using pip
````
pip install virtualenv
````
Then, setup virtual environments, and install the requirements using pip
````
virtualenv env
source env/bin/activate
pip install -r requirements.txt
````
Now, migrate the migrations/changes to the local database using
````
python manage.py migrate
````
Create an superuser needed to access the admin dashboard as well as API documentation
````
python manage.py createsuperuser
````
Now, enter the username and password. After that, you have successfully created admin account.
##### 
Before running the server, create a `.env` file that contains the Django secret key to run the project, you can find the example in the file `.env.example`.
#####
Then, run the server in order to make REST APIs accessible by the frontend using
````
python manage.py runserver
````
Now, you can access the API Documentation via ``http://127.0.0.1:8000/api/docs/`` or ``http://localhost:8000/api/docs/`` after logging in via `http://127.0.0.1:8000/admin/` using the admin account you created.
