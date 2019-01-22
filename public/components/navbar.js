function LogOut() {
    let path = document.location.pathname;
    //let url = (path == '/views/') ? './Logout' : '../Logout';
    let configs = {
        method: 'GET',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        credentials: 'same-origin'
    }
   
    fetch(url, configs)
        .then(response => response.json())
        .then(data => {        
            console.log("Logged out")             
        }).catch(error => {        	
            console.log(error.message);
        })
}

class NavBar extends HTMLElement {
    constructor() {
        super();
        ['inref', 'upref', 'href', 'pref', 'bref'].forEach(type => {
            if (!this.hasAttribute(type)) {
                this.setAttribute(type, '#');
            }
        })
        this.urls = {
            brand: this.getAttribute('href'),
            login: this.getAttribute('inref'),
            signup: this.getAttribute('upref'),
            profile: this.getAttribute('pref'),
            bet: this.getAttribute("bref"),
        }
    } 
    connectedCallback() {
        this.innerHTML = `
        <nav style="background-color:#262626;"
        class="navbar navbar-expand-md navbar-dark justify-content-between">
            <a class="navbar-brand" style="font-size: 20px !important">Triple Jonron</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#cContent" aria-controls="cContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>            
            <div class="collapse navbar-collapse" id="cContent">  
            </div>
            </nav>
        `
        this.brand.setAttribute('href', this.urls.brand);
        this.userState();
    } 
    userState() {
        let userData = this.userData;
        //let userData ={
        //    username: "GeometriaEnEl8vo",
        //}
        
        if (userData) {
            this.isIn(userData.username);
        } else {
            this.isOut();
        }
    }
    isIn(name) {
        this.stateContainer.innerHTML = `
            <span class="navbar-nav mr-auto"></span>
            <ul class="navbar-nav mr-auto>
                <li class="nav-item">
                    <a class="navbar-text mt-1" style="color: white; font-size: 18px">Bienvenido, </a>
                    <b class="navbar-text mr-5 ml-2 mt-1" style="color: white; font-size: 18px" >${name}</b>
                </li>
                <li class="nav-item" style="border-right-style: solid; border-right-color: #E1AF39; border-right-width: 1px; border-right-height: 1px;">
                    <a class=" nav-link" href="${this.urls.bet}" style="color: #E1AF39; font-size: 20px">Apostar</a>
                </li>
                <li class="nav-item" style="border-right-style: solid; border-right-color: #E1AF39; border-right-width: 1px; border-right-height: 1px;">
                    <a id="id1" class="nav-link" href="${this.urls.profile}" style="color: #E1AF39; font-size: 20px">Perfil</a>
                </li>
                <li class="nav-item" style="border-right-style: solid; border-right-color: #E1AF39; border-right-width: 1px; border-right-height: 1px;">
                    <a id="id1" class="nav-link" href="#" style="color: #E1AF39; font-size: 20px" onClick="LogOut()">Cerrar Sesion</a>
                </li>
            </ul>
        `
    }
    isOut() {
        this.stateContainer.innerHTML = `
        <span class="navbar-nav mr-auto"></span>
        <ul class="navbar-nav mr-auto>
            <li class="nav-item">
                <a class="navbar-text mt-1" style="color: white; font-size: 18px">Bienvenido, </a>
                <b class="navbar-text mr-5 ml-2 mt-1" style="color: white; font-size: 18px">invitado</b>
            </li>
            <li class="nav-item" style="border-right-style: solid; border-right-color: #E1AF39; border-right-width: 1px; border-right-height: 1px;">
                <a class=" nav-link" href="${this.urls.login}" style="color: #E1AF39; font-size: 20px">Iniciar Sesion</a>
            </li>
            <li class="nav-item" style="border-right-style: solid; border-right-color: #E1AF39; border-right-width: 1px; border-right-height: 1px;">
                <a id="id1" class="nav-link" href="${this.urls.signup}" style="color: #E1AF39; font-size: 20px">Registrarse</a>
            </li>
        </ul>
        `
    }
    get stateContainer() {
        return document.getElementById('cContent');
    }
    get brand() {
        return this.querySelectorAll('a')[0];
    }
    get userData() {
        return JSON.parse(localStorage.getItem('session'));
    }
}
customElements.define('nav-bar', NavBar);