
const APIControl = (function() {
    //creamos dos variables una id y otra secreta 
    const clientId = '36a0ba31c0f840f5912cf8e62074ea6e';
    const clientSecret = '48e9b111ed9a4360b929ba9592de4c99';

    //metodos privados
    const TOKEN = async () => {

        const resultado = await fetch('https://accounts.spotify.com/api/token',{
            method: 'POST',
            headers:{
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Authorization' : ' Basic ' + btoa(clientId + ':' + clientSecret)  
            },
            body: 'grand_type=client_credentials'
        });

        const data = await resultado.json();
        return data.access_token;
    }

    //conseguir generos
    const GENEROS = async (token) => {
        const resultado = await fetch(`https://api.spotify.com/v1/browse/categories?locale=sv_AR`, {
            method: 'GET',
            headers: { 'Authorization' : ' Bearer' + token }
        });
        const data = await resultado.json();
        return data.categories.items;
    }

    //conseguir playlist por generos
    const PLAYLISTGENEROS = async( token, genreId) => {
    const limite = 10;

    const resultado = await fetch(`https://api.spotify.com/v1/browse/categories/${genreId}/playlist?limit=${limite}` , {
            method: 'GET',
            headers: { 'Authorization' : ' Bearer' + token }
        });

        const data = await resultado.json();
        return data.playlists.items;
    }

    //conseguir tracks de playlist
    const TRACKS = async ( token, tracksEndPoint ) => {
        const limite = 10;

        const resultado = await fetch(`${tracksEndPoint}?limit=${limite}` , {
            method: 'GET',
            headers: { 'Authorization' : ' Bearer' + token }
        });

        const data = await resultado.json();
        return data.items;
    }

    const TRACK = async ( token, trackEndPoint) => {
        const resultado = await fetch(`${trackEndPoint}` , {
            method: 'GET',
            headers: { 'Authorization' : ' Bearer' + token }
        });

        const data = await resultado.json();
        return data;
    }

    return {
        getToken() {
            return TOKEN();
        },
        getGenero(token){
            return GENEROS(token);
        },
        getPlaylist(token, genreId){
            return PLAYLISTGENEROS(token,genreId);
        },
        getTracks(token, tracksEndPoint){
            return TRACKS(token,tracksEndPoint);
        },
        getTrack(token,trackEndPoint){
            return TRACK(token,trackEndPoint);
        }
    }
})();

//ModuloUser
const UserController = (function() {

    //objeto para agarrar los html selectors
    DOMElements = {
        selectGenre : '#select_genre',
        selectPlaylist : '#select_playlist',
        btnSubmit : '#btn_submit',
        divCancionDetalle : '#song-detail',
        hfToken : '#hidden_token',
        divCancionLista : '#song-list'
    }

    //Public Methods
    return {

        // metodo para los get de los inputs
        inputField(){
            return {
                genre: document.querySelector(DOMElements.selectGenre),
                playlist: document.querySelector(DOMElements.selectPlaylist),
                songs: document.querySelector(DOMElements.divCancionLista),
                submit: document.querySelector(DOMElements.btnSubmit),
                songDetail: document.querySelector(DOMElements.divCancionDetalle)
            }
        },

        //metodo para crear una list option
        createGenre(text,value) {
            const html = `<option value="${value}">${text}</option>`;
            document.querySelector(DOMElements.selectGenre).insertAdjacentHTML('beforeend',html);

        },

        createPlaylist (text,value){
            const html = `<option value=${value}`>${text}</option>`;
            document.querySelector(DOMElements.selectPlaylist).insertAdjacentHTML('beforeend',html);
        },
        
        //metodo para crear una track list group item
        createTrack(id,name){
        const html =` <a href="#" class="list-group-item list-group-item-action list-group-item-light" id="${id}">${name} </a>`;
        document.querySelector(DOMElements.divCancionLista).insertAdjacentHTML('beforeend',html);
        },

        //meotod para detalle de cancion
        createSongDetail(img, title, artist){
            const detailDiv = document.querySelector(DOMElements.divCancionDetalle);
            // cada ves que se clickee una nueva cancion, necesitamos limpiar el detalle
            detailDiv.innerHTML = '';

            const html = `
                <div class="row col-sm-12 px-0">
                    <div>
                    <img
                    src="${img}"
                    alt=""
                    />
                    </div>
                </div>
                <div class="row col-sm-12 px-0">
                    <label for="Genre" class="form-label col-sm-12">${title} </label>
                </div>
                <div class="row col-sm-12 px-0">
                    <label for="artist" class="form-label col-sm-12"> By ${artist}:</label>
                </div>
            `;

            detailDiv.insertAdjacentHTML('beforeend',html);
        },

        //RESETS
        resetTrackDetail(){
            this.inputField().songDetail.innerHTML = '';
        },
        resetTracks(){
            this.inputField().songs.innerHTML = '';
            this.resetTrackDetail();
        },
        resetPlaylist(){
            this.inputField().playlist.innerHTML = '';
            this.resetTracks();
        }


    }
})();

//modulo APP

const APPcontrol = (function(ModuloUser,APIControl) {
    
    //obtener inputs
    const DOMInputs = ModuloUser.inputField();

    //obtener generos en la pagina
    const loadGenres = async () => {

        //token
        const token = await APIControl.getToken();
        //generos
        const genres = await APIControl.GENEROS(token);
        //generos select element
        genres.forEach(element => ModuloUser.createGenre(element.name, element.id));
    }

    //event listener genre
    DOMInputs.genre.addEventListener(async () => {
        

    });

    //event listener playlist
    DOMInputs.genre.addEventListener('change',async () => {
        //cuando el usario cambia, reset los fields
        ModuloUser.resetPlaylist();
        //get token asi no golpeamos a la API por el token
        const token = ModuloUser.getStoredToken().token;
        //get genre select field
        const  genreSelect = ModuloUser.inputField().genre;
        //get selectd genre
        const genreId = genreSelect.options[genreSelect.selectedIndex].value;
        //get playlist data from spotify based on genre
        const playlist = await APIControl.PLAYLISTGENEROS(token,genreId);
        //cargar playlist
        console.log(playlist)
    });
    //event listener submit button
    DOMInputs.submit.addEventListener('click',async (e) => {
        //prevent page reset
        e.preventDefault();
    });
    //event listener para cancion select
     DOMInputs.songs.addEventListener('click',async (e) => {
        //prevent page reset
        e.preventDefault();
    });

})();

