FROM ubuntu:latest
# make sure apt is up to date
RUN    apt-get -y update

# install nodejs and npm
RUN    apt-get -y install nodejs
RUN    apt-get -y install npm

#install opencv
sudo apt-get install libopencv-dev python-opencv

# Bundle app source
COPY . /src
RUN cd /src; npm install
npm install opencv

EXPOSE 4000
CMD ["nodejs", "/src/server.js"]
