# How to run the EnviMap application

## Geoserver set-up
The application fetches the data from GeoServer, so in order to run properly you need to either provide an already
existing instance of GeoServer or set up a local instance. To set up your local instance, follow these instructions:
1. Download GeoServer from https://geoserver.org/download/.
2. During the installation, set your local instance to run on http://localhost:9000/ and select your username and 
password.

After downloading GeoServer, going to http://localhost:9000/ and logging in, you will see that there are already circa
12 layers that you can work with. However, to be able to use this instance, you will need to set it up even further:
1. Delete all already existing layer groups.
2. Create your own layer groups under no specific workspace and divide the already provided layers into them however
you see a fit. Be careful, layers that do not belong to any layer group will not be accessible in the application.
3. Crete a new workspace and name it _customAreas_. In this workspace there will be all custom areas created through the
application.
4. Create a new workspace and name it _areas_. In this workspace there will be all areas created directly through 
GeoServer.
5. Create some example areas in GeoServer:
   1. Crete a folder on you PC in the _C://_ folder and name it _geoserverData_. In this folder you will store source
   files for areas. To get some source data, you can visit https://hub.arcgis.com/ or 
   https://gadm.org/download_country.html#google_vignette and download the Shapefiles.
   2. Create a store under the _areas_ workspace (type - Directory of spatial files) in GeoServer and point a path to the
   created directory.
   3. Create layers under the _areas_ workspace. Select a corresponding source from the created store and make sure that 
   Declared SRS in set to EPSG:4326 projection.
   4. Create a new layer groups under the _areas_ workspace, name it _areas_ and add all top-level areas into this 
   group.
   5. To achieve a hierarchical structure, create a new layer group under the _areas_ workspace for each layer that 
   should have sub areas. Set the mode of the group to Earth Observation Tree, set root layer to be the layer 
   representing a parent area and add all sub areas into this group. This group should then be added to the previously 
   mentioned _areas_ group.

## Backend set-up
To set up the backend part of the application, you have 2 options - you can use the _docker-compose_ file or set it up 
manually. Please note that if you opt for using docker, you need to set up GeoServer first and add it to the 
_docker-compose_ file yourself. The project can be downloaded at https://github.com/AdkaJonasova/envilab-app-be.git 
(master branch). Before starting the set-up, please update the _configuration.ini_ file to fit your needs.

### Without docker
Before starting the set-up, please make sure that you have Python 3.10 installed, then proceed with these instructions:
1. Install all necessary libraries by calling _pip install <library_name>_. List of necessary libraries can be found in 
the _requirements.txt_ file.
2. Create a PostgreSQL database and initialize it with the script from the file _init.sql_.
3. Run _python -m src.main_

### With docker
Before starting the set-up please make sure that you installed and have your Docker running, then process with these 
instructions:
1. Change host in postgresql section in the _configuration.ini_ file to _database_
2. Run _docker build -t envilab_backend ._
3. Run _docker-compose up -d_

## Frontend set-up
Similarly to the backend part, to set up the frontend part of the application, you have 2 options - you can use the 
docker or set it up manually. The project can be downloaded The project can be downloaded at 
https://github.com/AdkaJonasova/envilab-app.git (master branch).

### Without docker
1. Run _npm install_.
2. Run _npm start_.

### With docker
Before starting the set-up please make sure that you installed and have your Docker running, then process with these 
instructions:
1. Run _docker build -t envilab_frontend ._
2. Run _docker run -p 3000:3000 --name=envilab_fe_con envilab_frontend_ 

## Application
After completing these instructions the application will be running at http://localhost:3000/.

To view the Swagger, you can go to http://localhost:8000/api-documentation.
