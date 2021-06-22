# Welcome to Spotify Playlist 👋
![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](#)

> Final Project for ComIT course / Proyecto Final para Curso ComIT

* Usamos la api de spotify para ver playlist, elegimos una, y podemos escuchar la preview de 30 segundos de spotify del tema que elijamos
* We use spotify api to search playlist and choose one track to listen the preview of 30 sec.

## Sample Demo

 Visit Link [Web Demo](https://playspotify.netlify.app "Play Spotify")


* Aqui seleccionamos el genero musical con el Select / Here we select the Genre
```sh
            <p>Select Music Genre:</p>
```
* Aqui seleccionamos la playlist también con otro Select
```sh
            <p>Select Playlist:</p>
```

* Aqui saldra la playlist cargada con la lista de canción dadas por el limite ( se puso como limite 12 canciones) golpeando en un etiqueta a / In this <a href> the playlist will be load with the limit of songs (12 songs)
```sh
            <a
              href="#"
              class="
                list-group-item list-group-item-action list-group-item-light
                song
                mb-3
              "
              >Song 1</a
            >
```
* Cuando seleccionamos una canción saldra el Covert Art, el titulo y su respectivo interprete. / When we select a song, will be load the CoverArt, Title and Interpreter.
```sh
            <p>Example Cover</p>
            <img
              src="coverArt"
              alt=""
            />
            <label for="Genre" class="form-label col-sm-12">Song Title</label>
            <label for="artist" class="form-label col-sm-12"> By</label>
```

## Framework/Helpers/Documentattion
* BootStrap 5.0 - https://getbootstrap.com/
* Spotify Api - https://developer.spotify.com/documentation/web-api/


## Usage
```sh
use Live Server to test / usar Live Server para probar
```


## Author

👤 **zelayab**

* Github: [@zelayab](https://github.com/zelayab)

## Show your support

Give a ⭐️ if this project helped you!


***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_